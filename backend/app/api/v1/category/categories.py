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
        @apiParam {String="expense","income"} [type] Category type

        @apiSuccess (Success) {Object[]} categories List of categories
        @apiSuccess (Success) {String} categories.id Category ID
        @apiSuccess (Success) {Number} categories.name Name
        @apiSuccess (Success) {String} categories.type Type
        @apiSuccess (Success) {Object[]} categories.subcategories Subcategories

        @apiSampleRequest /api/v1/categories

        @apiExample cURL example
        $ curl -H "Content-Type: application/json" -H "Authorization": "Bearer auth_token_here"
            http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/categories/13

        @apiExample cURL example with params
        $ curl -H "Content-Type: application/json" -H "Authorization": "Bearer auth_token_here"
            http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/categories/13?type=expense

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
                                "type": "expense"
                            },
                            {
                                "id": 29,
                                "name": "Café",
                                "subcategories": [],
                                "type": "expense"
                            }
                        ],
                        "type": "expense"
                    },
                    {
                        "id": 2,
                        "name": "Bill & Utilities",
                        "subcategories": [
                            {
                                "id": 30,
                                "name": "Phone",
                                "subcategories": [],
                                "type": "expense"
                            },
                            {
                                "id": 31,
                                "name": "Water",
                                "subcategories": [],
                                "type": "expense"
                            },
                            {
                                "id": 32,
                                "name": "Electricity",
                                "subcategories": [],
                                "type": "expense"
                            },
                            {
                                "id": 33,
                                "name": "Gas",
                                "subcategories": [],
                                "type": "expense"
                            },
                            {
                                "id": 34,
                                "name": "Television",
                                "subcategories": [],
                                "type": "expense"
                            },
                            {
                                "id": 35,
                                "name": "Internet",
                                "subcategories": [],
                                "type": "expense"
                            },
                            {
                                "id": 36,
                                "name": "Rental",
                                "subcategories": [],
                                "type": "expense"
                            }
                        ],
                        "type": "expense"
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
        category_type = request.args.get('type')
        default_categories = Category.get_default_categories(category_type)
        account_categories = account.get_categories(category_type)
        all_categories = [*default_categories, *account_categories]
        return response_get_categories(all_categories, acc_id, 200)

    def post(self):
        """
        @api {POST} /api/v1/categories Create category for an account
        @apiVersion 0.0.1
        @apiName CreateCategory
        @apiGroup Categories
        @apiDescription Create a category for an account

        @apiHeader {String} Authorization Users auth token
        @apiHeader {String} Content-Type="application/json" Content-Type (should be application/json for every post requests)

        @apiHeaderExample {json} Header-Example:
        {
            "Authorization": "Bearer auth_token_here"
        }

        @apiParam {Number} acc_id Account ID
        @apiParam {String} name Category name
        @apiParam {String} type Category type
        @apiParam {Number=null} parent_id Parent category ID (omit if no parent)

        @apiParamExample {json} Request-Example:
        {
            "acc_id": 1,
            "name": "Cat",
            "type": "expense"
        }

        @apiParamExample {json} Request-Example with parent_id:
        {
            "acc_id": 1,
            "parent_id": 1,
            "name": "Dog meat",
            "type": "expense"
        }

        @apiSuccess (Success) {String} status Status
        @apiSuccess (Success) {String} message Message

        @apiSampleRequest /api/v1/transactions

        @apiExample cURL example
        $ curl -H "Content-Type: application/json" -H "Authorization": "Bearer auth_token_here" -X POST
            -d '{"acc_id": 1, "name": "Cat", "type": "expense"}'
            http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/categories

        @apiSuccessExample {json} Success-Response:
            HTTP/1.0 200 OK
            {
                "message": "Successfully created new category",
                "status": "success"
            }
        """
        ctx = _request_ctx_stack.top
        current_user = ctx.user
        request_body = request.get_json()
        acc_id, parent_id, name, type = get_dict_value_by_key(request_body, 'acc_id', 'parent_id', 'name', 'type')
        account = Account.get_by_id(acc_id, current_user.id)
        if account is None:
            return response('failed', 'This account belongs to another user', 401)
        new_category = Category.create(name, type.lower(), acc_id)
        if parent_id:
            parent_category = Category.get_by_id(parent_id)
            parent_category.children.append(new_category)
        try:
            new_category.save()
        except IntegrityError:
            return response('failed', 'Duplicate category name', 400)
        else:
            return response('success', 'Successfully created new category', 200)
