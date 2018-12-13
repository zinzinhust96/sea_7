from flask import request, make_response, jsonify, _request_ctx_stack
from flask.views import MethodView
from sqlalchemy.exc import IntegrityError
from app.models import Category, Account
from app.api.v1.category.response_helpers import response_get_categories
from app.api.general_helpers import token_required, response, check_content_type, get_dict_value_by_key


class Categories(MethodView):
    methods = ['GET', 'POST']
    decorators = [check_content_type, token_required]

    def get(self, acc_id):
        """
        @api {GET} /api/v1/categories/:id Get all categories of an account
        @apiVersion 0.0.1
        @apiName GetAllCategories
        @apiGroup Categories
        @apiDescription Get all categories of an account (default and user-created categories)

        @apiHeader {String} Authorization Users auth token
        @apiHeader {String} Content-Type="application/json" Content-Type (should be application/json for every post requests)

        @apiHeaderExample {json} Header-Example:
        {
            "Authorization": "Bearer auth_token_here"
        }

        @apiParam {Number} id Account ID

        @apiSuccess (Success) {Object[]} categories List of categories
        @apiSuccess (Success) {String} categories.id Category ID
        @apiSuccess (Success) {Number} categories.name Name
        @apiSuccess (Success) {String} categories.type Type
        @apiSuccess (Success) {Object[]} categories.subcategories Subcategories

        @apiSampleRequest /api/v1/categories

        @apiExample cURL example
        $ curl -H "Content-Type: application/json" -H "Authorization": "Bearer auth_token_here"
            http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/categories/13

        @apiSuccessExample {json} Success-Response:
            HTTP/1.0 200 OK
            {
                "categories": [
                    {
                        "id": 1,
                        "name": "Food & Beverage",
                        "subcategories": [
                            {
                                "id": 28,
                                "name": "Restaurants",
                                "subcategories": [],
                                "type": "Expense"
                            },
                            {
                                "id": 29,
                                "name": "Café",
                                "subcategories": [],
                                "type": "Expense"
                            }
                        ],
                        "type": "Expense"
                    },
                    {
                        "id": 2,
                        "name": "Bill & Utilities",
                        "subcategories": [
                            {
                                "id": 30,
                                "name": "Phone",
                                "subcategories": [],
                                "type": "Expense"
                            },
                            {
                                "id": 31,
                                "name": "Water",
                                "subcategories": [],
                                "type": "Expense"
                            },
                            {
                                "id": 32,
                                "name": "Electricity",
                                "subcategories": [],
                                "type": "Expense"
                            },
                            {
                                "id": 33,
                                "name": "Gas",
                                "subcategories": [],
                                "type": "Expense"
                            },
                            {
                                "id": 34,
                                "name": "Television",
                                "subcategories": [],
                                "type": "Expense"
                            },
                            {
                                "id": 35,
                                "name": "Internet",
                                "subcategories": [],
                                "type": "Expense"
                            },
                            {
                                "id": 36,
                                "name": "Rental",
                                "subcategories": [],
                                "type": "Expense"
                            }
                        ],
                        "type": "Expense"
                    }
                ],
                "status": "success"
            }
        """
        ctx = _request_ctx_stack.top
        current_user = ctx.user
        account = Account.get_by_id(acc_id, current_user.id)
        if account is None:
            return response('failed', 'This account belongs to another user', 401)
        default_categories = Category.get_default_categories()
        account_categories = account.get_categories()
        all_categories = [*default_categories, *account_categories]
        return response_get_categories(all_categories, 200)
