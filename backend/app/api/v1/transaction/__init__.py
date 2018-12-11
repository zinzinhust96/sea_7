from flask import Blueprint
from app.api.general_helpers import response
from .transactions import Transactions

transaction = Blueprint('transaction', __name__)

# Register classes as views
transactions_view = Transactions.as_view('transactions')

# Add rules for the api Endpoints
transaction.add_url_rule('/transactions', view_func=transactions_view, methods=['POST'])
transaction.add_url_rule('/transactions', view_func=transactions_view, methods=['GET'])


@transaction.errorhandler(404)
def handle_404_error(e):
    """
    Return a custom message for 404 errors.
    :param e:
    :return:
    """
    return response('failed', 'Transactions resource cannot be found', 404)


@transaction.errorhandler(400)
def handle_400_errors(e):
    """
    Return a custom response for 400 errors.
    :param e:
    :return:
    """
    return response('failed', 'Bad Request', 400)
