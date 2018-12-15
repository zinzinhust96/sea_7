from flask import request, make_response, jsonify, _request_ctx_stack
from flask.views import MethodView
from sqlalchemy.exc import IntegrityError
from app.models import Transaction, Account, Category
from app.api.v1.transaction.response_helpers import response_created_transaction, response_paginate_transactions
from app.api.general_helpers import token_required, response, check_content_type, get_dict_value_by_key


class Transactions(MethodView):
    methods = ['GET', 'POST']
    decorators = [check_content_type, token_required]

    def get(self, acc_id):
        """
        @api {GET} /api/v1/transactions/:id Get all transactions of an account
        @apiVersion 0.0.1
        @apiName GetAllTransactions
        @apiGroup Transactions
        @apiDescription Get all transactions of an account (10 transactions per page)

        @apiHeader {String} Authorization Users auth token
        @apiHeader {String} Content-Type="application/json" Content-Type (should be application/json for every post requests)

        @apiHeaderExample {json} Header-Example:
        {
            "Authorization": "Bearer auth_token_here"
        }

        @apiParam {Number} id Account ID

        @apiSuccess (Success) {Object[]} transactions List of transactions
        @apiSuccess (Success) {String} transactions.created_at Date created
        @apiSuccess (Success) {Number} transactions.amount Amount (in VND)
        @apiSuccess (Success) {String} transactions.category Category
        @apiSuccess (Success) {String} transactions.note Note
        @apiSuccess (Success) {Number} transactions.pre_bal Pre-transaction balance
        @apiSuccess (Success) {Number} transactions.post_bal Post-transaction balance
        @apiSuccess (Success) {String="expense","income"} transactions.type Transaction type
        @apiSuccess (Success) {String} next Next page
        @apiSuccess (Success) {String} previous Previous page
        @apiSuccess (Success) {String} status Status
        @apiSuccess (Success) {Number} total Total number of transactions

        @apiSampleRequest /api/v1/transactions

        @apiExample cURL example
        $ curl -H "Content-Type: application/json" -H "Authorization": "Bearer auth_token_here"
            http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/transactions/13

        @apiSuccessExample {json} Success-Response:
            HTTP/1.0 200 OK
            {
                "next": null,
                "previous": null,
                "status": "success",
                "total": 2,
                "transactions": [
                    {
                        "amount": 60000,
                        "category": "Bill & Utilities",
                        "created_at": "2018-12-12T17:38:47",
                        "note": "note",
                        "pre_bal": 100000,
                        "post_bal": 160000,
                        "type": "expense"
                    },
                    {
                        "amount": 60000000,
                        "category": "Salary",
                        "created_at": "2018-12-12T17:40:38",
                        "note": "note",
                        "pre_bal": 40000,
                        "post_bal": 60040000,
                        "type": "income"
                    }
                ]
            }
        """
        ctx = _request_ctx_stack.top
        current_user = ctx.user
        account = Account.get_by_id(acc_id, current_user.id)
        if account is None:
            return response('failed', 'This account belongs to another user', 401)
        page = request.args.get('page', 1, type=int)
        return response_paginate_transactions(account, page, 200)

    def post(self):
        """
        @api {POST} /api/v1/transactions Create transaction for an account
        @apiVersion 0.0.1
        @apiName CreateTransaction
        @apiGroup Transactions
        @apiDescription Create a transaction for an account

        @apiHeader {String} Authorization Users auth token
        @apiHeader {String} Content-Type="application/json" Content-Type (should be application/json for every post requests)

        @apiHeaderExample {json} Header-Example:
        {
            "Authorization": "Bearer auth_token_here"
        }

        @apiParam {Number} acc_id Account ID
        @apiParam {Number} cat_id Category ID
        @apiParam {String} created_at Create time
        @apiParam {String} note Note
        @apiParam {Number} amount Amount

        @apiParamExample {json} Request-Example:
        {
            "acc_id": 13,
            "cat_id": 20,
            "created_at": "2018-12-14T03:55",
            "note": "note",
            "amount": 60000000
        }

        @apiSuccess (Success) {String} created_at Date created
        @apiSuccess (Success) {Number} pre_bal Pre-transaction balance
        @apiSuccess (Success) {Number} post_bal Post-transaction balance
        @apiSuccess (Success) {String} category Category
        @apiSuccess (Success) {String} note Note
        @apiSuccess (Success) {Number} amount Amount
        @apiSuccess (Success) {String} status Status
        @apiSuccess (Success) {String="expense","income"} type Transaction type

        @apiSampleRequest /api/v1/transactions

        @apiExample cURL example
        $ curl -H "Content-Type: application/json" -H "Authorization": "Bearer auth_token_here" -X POST
            -d '{"acc_id": 13, "cat_id": 20, "note": "note", "amount": 60000000}'
            http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/transactions

        @apiSuccessExample {json} Success-Response:
            HTTP/1.0 200 OK
            {
                "amount": 60000000,
                "category": "Salary",
                "created_at": "2018-12-14T03:55:00",
                "note": "note",
                "pre_bal": 40000,
                "post_bal": 60040000,
                "status": "success",
                "type": "income"
            }
        """
        ctx = _request_ctx_stack.top
        current_user = ctx.user
        request_body = request.get_json()
        acc_id, cat_id, created_at, note, amount = get_dict_value_by_key(request_body, 'acc_id', 'cat_id', 'created_at', 'note', 'amount')
        try:
            account = Account.get_by_id(acc_id, current_user.id)
            if account is None:
                return response('failed', 'This account belongs to another user', 401)
            category = Category.get_by_id(cat_id)
            cur_bal = account.get_current_balance()
            post_bal = account.update_balance(category.type, amount)
        except ValueError:
            return response('failed', 'Failed to create transaction, please check your balance', 400)
        else:
            new_transaction = Transaction.create(
                account_id=acc_id,
                category_id=cat_id,
                created_at=created_at,
                transaction_type=category.type,
                note=note,
                amount=amount,
                pre_transaction_balance=cur_bal,
                post_transaction_balance=post_bal
            )
            new_transaction.save()
            return response_created_transaction(new_transaction, 200)
