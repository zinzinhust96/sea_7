from flask import make_response, jsonify, url_for


def response_created_transaction(new_transaction, status_code):
    """
    Method returning the response when an account has been successfully created.
    :param status_code:
    :param new_transaction: Transaction
    :return: Http Response
    """
    status = {
        'status': 'success'
    }
    new_trans_info = new_transaction.json()
    return make_response(jsonify({**status, **new_trans_info})), status_code


def response_paginate_transactions(account, page, status_code):
    """
    Get an user's account and also paginate the results.
    Generate previous and next pagination urls
    :param account: Current Account
    :param page: Page number
    :return: Pagination next url, previous url and the user buckets.
    """
    pagination = account.get_paginated_transactions(page)
    previous_page = None
    if pagination.has_prev:
        previous_page = url_for('transaction.transactions', page=page-1, _external=True)
    next_page = None
    if pagination.has_next:
        next_page = url_for('transaction.transactions', page=page+1, _external=True)
    items = pagination.items
    return make_response(jsonify({
        'status': 'success',
        'previous': previous_page,
        'next': next_page,
        'total': pagination.total,
        'transactions': [item.json() for item in items]
    })) if items else make_response(jsonify({
        'status': 'success',
        'previous': None,
        'next': None,
        'total': 0,
        'transactions': []
    })), status_code
