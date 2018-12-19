from flask import make_response, jsonify


def response_get_categories(categories, acc_id, status_code):
    response = {
        'status': 'success',
        'categories': [item.json(acc_id) for item in categories]
    }
    return make_response(jsonify(response)), status_code
