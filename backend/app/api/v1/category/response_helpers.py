from flask import make_response, jsonify, url_for


def response_get_categories(categories, status_code):
    response = {
        'status': 'success',
        'categories': [item.json() for item in categories]
    }
    return make_response(jsonify(response)), status_code
