from flask import request, _request_ctx_stack
from flask.views import MethodView
from sqlalchemy.exc import IntegrityError
from app.models import SavingAccount, Account, User
from app.api.v1.account.response_helpers import response_created_account, response_paginate_accounts
from app.api.general_helpers import token_required, response, check_content_type, get_dict_value_by_key


class SavingAccounts(MethodView):
    methods = ['GET', 'POST']
    decorators = [check_content_type, token_required]

    def get(self):
        """
        @api {GET} /api/v1/accounts/saving Get all saving accounts of an user
        @apiVersion 0.0.1
        @apiName GetSavingAccounts
        @apiGroup Accounts
        @apiDescription Get all saving accounts of an authenticated user (10 accounts per page)

        @apiHeader {String} Authorization Users auth token
        @apiHeader {String} Content-Type="application/json" Content-Type (should be application/json for every post requests)

        @apiHeaderExample {json} Header-Example:
        {
            "Authorization": "Bearer auth_token_here"
        }

        @apiSuccess (Success) {Object[]} accounts List of accounts
        @apiSuccess (Success) {Number} accounts.id Account ID
        @apiSuccess (Success) {String} accounts.created Date created
        @apiSuccess (Success) {Number} accounts.cur_bal Current balance
        @apiSuccess (Success) {Number} accounts.ini_bal Initial balance
        @apiSuccess (Success) {Number} accounts.duration Saving duration (as days)
        @apiSuccess (Success) {Number} accounts.rate Saving monthly interest rate
        @apiSuccess (Success) {String} accounts.name Saving account name
        @apiSuccess (Success) {Object} accounts.src_acc Source account informations
        @apiSuccess (Success) {Number} accounts.src_acc.id Account ID
        @apiSuccess (Success) {String} accounts.src_acc.created Date created
        @apiSuccess (Success) {Number} accounts.src_acc.cur_bal Current balance
        @apiSuccess (Success) {Number} accounts.src_acc.ini_bal Initial balance
        @apiSuccess (Success) {Number} accounts.src_acc.limit Credit account limit (not available for cash account type)
        @apiSuccess (Success) {String} accounts.src_acc.name Account name
        @apiSuccess (Success) {String} accounts.src_acc.type Account type
        @apiSuccess (Success) {String} next Next page
        @apiSuccess (Success) {String} previous Previous page
        @apiSuccess (Success) {String} status Status
        @apiSuccess (Success) {String} total Total number of accounts

        @apiExample cURL example
        $ curl -H "Authorization": "Bearer auth_token_here" http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/accounts/saving

        @apiSuccessExample {json} Success-Response:
            HTTP/1.0 200 OK
            {
                "accounts": [
                    {
                        "created": "2018-12-20T14:07:46",
                        "cur_bal": 1000000,
                        "duration": 90,
                        "id": 1,
                        "ini_bal": 1000000,
                        "name": "tep_sav1",
                        "rate": 0.1,
                        "src_acc": {
                            "created": "2018-12-13T03:09:48",
                            "cur_bal": 158400000,
                            "id": 1,
                            "ini_bal": 100000000,
                            "limit": null,
                            "name": "tepacc",
                            "type": "cash"
                        }
                    }
                ],
                "next": null,
                "previous": null,
                "status": "success",
                "total": 1
            }
        """
        ctx = _request_ctx_stack.top
        current_user = ctx.user
        user = User.get_by_id(current_user.id)
        page = request.args.get('page', 1, type=int)
        return response_paginate_accounts(user, page, saving=True)

    def post(self):
        """
        @api {POST} /api/v1/accounts/saving Create a saving account for an user
        @apiVersion 0.0.1
        @apiName CreateSavingAccount
        @apiGroup Accounts
        @apiDescription Create a saving account for an authenticated user

        @apiHeader {String} Authorization Users auth token
        @apiHeader {String} Content-Type="application/json" Content-Type (should be application/json for every post requests)

        @apiHeaderExample {json} Header-Example:
        {
            "Authorization": "Bearer auth_token_here"
        }

        @apiParam {String} name Name of the account
        @apiParam {Number} acc_id Source account ID
        @apiParam {Number} ini_bal Initial balance
        @apiParam {Number} duration Saving duration (as months)
        @apiParam {Number} rate Saving monthly interest rate

        @apiParamExample {json} Request-Example:
        {
            "acc_id": 1,
            "name": "tep_sav1",
            "ini_bal": 1000000,
            "duration": 3,
            "rate": 0.1
        }

        @apiSuccess (Success) {Number} id Account ID
        @apiSuccess (Success) {String} created Date created
        @apiSuccess (Success) {Number} cur_bal Current balance
        @apiSuccess (Success) {Number} ini_bal Initial balance
        @apiSuccess (Success) {Number} duration Saving duration (as days)
        @apiSuccess (Success) {Number} rate Saving monthly interest rate
        @apiSuccess (Success) {String} name Saving account name
        @apiSuccess (Success) {Object} src_acc Source account informations
        @apiSuccess (Success) {Number} src_acc.id Account ID
        @apiSuccess (Success) {String} src_acc.created Date created
        @apiSuccess (Success) {Number} src_acc.cur_bal Current balance
        @apiSuccess (Success) {Number} src_acc.ini_bal Initial balance
        @apiSuccess (Success) {Number} src_acc.limit Credit account limit (not available for cash account type)
        @apiSuccess (Success) {String} src_acc.name Account name
        @apiSuccess (Success) {String} src_acc.type Account type

        @apiExample cURL example
        $ curl -H "Content-Type: application/json" -H "Authorization": "Bearer auth_token_here" -X POST
            -d '{"acc_id": 1, "name": "tep_sav1", "ini_bal": 1000000, "duration": 3, "rate": 0.1}'
            http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/accounts/saving

        @apiSuccessExample {json} Success-Response:
            HTTP/1.0 200 OK
            {
                "created": "2018-12-20T14:07:46",
                "cur_bal": 1000000,
                "duration": 90,
                "id": 1,
                "ini_bal": 1000000,
                "name": "tep_sav1",
                "rate": 0.1,
                "src_acc": {
                    "created": "2018-12-13T03:09:48",
                    "cur_bal": 158400000,
                    "id": 1,
                    "ini_bal": 100000000,
                    "limit": null,
                    "name": "tepacc",
                    "type": "cash"
                }
            }
        """
        ctx = _request_ctx_stack.top
        current_user = ctx.user
        request_body = request.get_json()
        acc_id, name, ini_bal, duration, rate = get_dict_value_by_key(
            request_body,
            'acc_id',
            'name',
            'ini_bal',
            'duration',
            'rate'
        )
        account = Account.get_by_id(acc_id, current_user.id)
        if account is None:
            return response('failed', 'This account belongs to another user', 401)
        try:
            new_saving_account = SavingAccount.create(
                account_id=acc_id,
                user_id=current_user.id,
                name=name,
                initial_balance=ini_bal,
                duration=duration,
                interest_rate=rate
            )
            new_saving_account.save()
            account.update_balance('expense', ini_bal)
        except IntegrityError:
            return response('failed', 'Duplicate account name', 400)
        except ValueError:
            return response('failed', 'Please check your balance', 400)
        else:
            return response_created_account(new_saving_account, 200)
