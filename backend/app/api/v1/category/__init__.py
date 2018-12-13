from flask import Blueprint
from app.api.general_helpers import response
from .categories import Categories

category = Blueprint('category', __name__)

# Register classes as views
categories_view = Categories.as_view('categories')

# Add rules for the api Endpoints
# category.add_url_rule('/categories', view_func=categories_view, methods=['POST'])
category.add_url_rule('/categories/<int:acc_id>', view_func=categories_view, methods=['GET'])


@category.errorhandler(404)
def handle_404_error(e):
    """
    Return a custom message for 404 errors.
    :param e:
    :return:
    """
    return response('failed', 'Categories resource cannot be found', 404)


@category.errorhandler(400)
def handle_400_errors(e):
    """
    Return a custom response for 400 errors.
    :param e:
    :return:
    """
    return response('failed', 'Bad Request', 400)
