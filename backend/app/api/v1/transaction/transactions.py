from flask import request, make_response, jsonify
from flask.views import MethodView
from sqlalchemy.exc import IntegrityError
from app.models import Transaction, Account
from app.api.v1.transaction.response_helpers import response_created_transaction, response_paginate_transactions
from app.api.general_helpers import token_required, response, check_content_type, get_dict_value_by_key


class Transactions(MethodView):
    methods = ['GET', 'POST']
    decorators = [check_content_type, token_required]

    def get(self):
        """
        @api {GET} /api/v1/accounts Get all accounts of an user
        @apiVersion 0.0.1
        @apiName GetAllAccounts
        @apiGroup Accounts
        @apiDescription Get all accounts of an authenticated user (10 accounts per page)

        @apiHeader {String} Authorization Users auth token

        @apiHeaderExample {json} Header-Example:
        {
            "Authorization": "Bearer {auth_token_here}"
        }

        @apiSuccess (Success) {Object[]} accounts List of accounts
        @apiSuccess (Success) {String} accounts.created Date created
        @apiSuccess (Success) {Number} accounts.cur_bal Current balance
        @apiSuccess (Success) {Number} accounts.ini_bal Initial balance
        @apiSuccess (Success) {Number} accounts.limit Credit account limit (not available for cash account type)
        @apiSuccess (Success) {String} accounts.name Account name
        @apiSuccess (Success) {String} accounts.sav_dur Saving account duration
        @apiSuccess (Success) {String} accounts.sav_itr Saving account interest rate
        @apiSuccess (Success) {String} accounts.status Status
        @apiSuccess (Success) {String} accounts.type Account type
        @apiSuccess (Success) {String} next Next page
        @apiSuccess (Success) {String} previous Previous page
        @apiSuccess (Success) {String} status Status
        @apiSuccess (Success) {String} total Total number of accounts

        @apiSampleRequest /api/v1/accounts

        @apiExample cURL example
        $ curl -H "Authorization": "Bearer {auth_token_here}" http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/accounts

        @apiSuccessExample {json} Success-Response:
            HTTP/1.0 200 OK
            {
                "accounts": [
                    {
                        "created": "2018-11-28T06:11:55",
                        "cur_bal": 100000,
                        "ini_bal": 100000,
                        "limit": 10000,
                        "name": "tepacc1",
                        "sav_dur": null,
                        "sav_itr": null,
                        "type": "credit"
                    },
                    {
                        "created": "2018-11-28T09:45:05",
                        "cur_bal": 100000,
                        "ini_bal": 100000,
                        "limit": null,
                        "name": "tepacc4",
                        "sav_dur": null,
                        "sav_itr": null,
                        "type": "cash"
                    }
                ],
                "next": null,
                "previous": null,
                "status": "success",
                "total": 2
            }
        """
        account_id = request.args.get('id', type=int)
        page = request.args.get('page', 1, type=int)
        account = Account.get_by_id(account_id)
        return response_paginate_transactions(account, page)

    def post(self):
        """
        @api {POST} /api/v1/accounts Create account for an user
        @apiVersion 0.0.1
        @apiName CreateAccount
        @apiGroup Accounts
        @apiDescription Create an account for an authenticated user

        @apiHeader {String} Authorization Users auth token

        @apiHeaderExample {json} Header-Example:
        {
            "Authorization": "Bearer {auth_token_here}"
        }

        @apiParam {String} name Name of the account
        @apiParam {Number} ini_bal Initial balance
        @apiParam {String} type Account type [credit, cash]
        @apiParam {Number} limit Credit account limit (need to specify if the account type is credit, otherwise none required)

        @apiSuccess (Success) {String} created Date created
        @apiSuccess (Success) {Number} cur_bal Current balance
        @apiSuccess (Success) {Number} ini_bal Initial balance
        @apiSuccess (Success) {Number} limit Credit account limit (not available for cash account type)
        @apiSuccess (Success) {String} name Account name
        @apiSuccess (Success) {String} sav_dur Saving account duration
        @apiSuccess (Success) {String} sav_itr Saving account interest rate
        @apiSuccess (Success) {String} status Status
        @apiSuccess (Success) {String} type Account type

        @apiSampleRequest /api/v1/accounts

        @apiExample cURL example
        $ curl -H "Content-Type: application/json" -H "Authorization": "Bearer {auth_token_here}" -X POST
            -d '{"name": "tep_acc1", "ini_bal": 100000, "type": "credit", "limit": 10000}' http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/accounts

        @apiSuccessExample {json} Success-Response:
            HTTP/1.0 200 OK
            {
                "created": "2018-11-28T09:31:35",
                "cur_bal": 100000,
                "ini_bal": 100000,
                "limit": 10000,
                "name": "tep_acc1",
                "sav_dur": null,
                "sav_itr": null,
                "status": "success",
                "type": "credit"
            }
        """
        request_body = request.get_json()
        acc_id, cat_id, trans_type, note, amount = get_dict_value_by_key(request_body, 'acc_id', 'cat_id', 'trans_type', 'note', 'amount')
        try:
            account = Account.get_by_id(acc_id)
            cur_bal = account.get_current_balance()
            new_transaction = Transaction.create(
                account_id=acc_id,
                category_id=cat_id,
                transaction_type=trans_type,
                note=note,
                amount=amount,
                pre_transaction_balance=cur_bal
            )
            new_transaction.save()
            account.update_balance(trans_type, amount)
        except ValueError:
            return response('failed', 'Failed to create transaction, please check your balance', 400)
        else:
            return response_created_transaction(new_transaction, 200)
