from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_mail import Mail
from celery import Celery
from click import option
import os
import subprocess

# Initialize application
app = Flask(__name__, static_folder=None)

# Enabling CORS
CORS(app)

# app configuration
app_settings = os.getenv(
    'APP_SETTINGS',
    'app.config.Config'
)
app.config.from_object(app_settings)

# Initialize Bcrypt
bcrypt = Bcrypt(app)

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Initialize Flask Migrate
migrate = Migrate(app, db)

mail_settings = {
    'MAIL_SERVER': 'smtp.gmail.com',
    'MAIL_PORT': 465,
    'MAIL_USE_TLS': False,
    'MAIL_USE_SSL': True,
    'MAIL_USERNAME': app.config['EMAIL_ADDRESS'],
    'MAIL_PASSWORD': app.config['EMAIL_PASSWORD']
}

app.config.update(mail_settings)

# Initialize Flask-Mail
mail = Mail(app)


def make_celery(app):
    celery = Celery(
        app.import_name,
        backend='rpc://',
        include=['tasks'],
        broker=app.config['CELERY_BROKER_URL']
    )
    celery.conf.update(app.config)

    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    celery.Task = ContextTask
    return celery


# Initialize Celery
celery = make_celery(app)


@app.cli.command()
@option('--input', default='app')
@option('--output', default='docker/nginx/apidoc')
@option('--template', default=None)
def apidoc(input, output, template):
    cmd = ['apidoc']
    if input:
        cmd.append('--input')
        cmd.append(input)
    if output:
        cmd.append('--output')
        cmd.append(output)
    if template:
        cmd.append('--template')
        cmd.append(template)
    p = subprocess.Popen(cmd)
    p.communicate()
    return p.returncode


# Error handlers
from app.api import error_handlers

# Register blue prints
from app.api.v1.auth import auth
from app.api.v1.account import account
from app.api.v1.transaction import transaction
from app.api.v1.category import category

app.register_blueprint(auth, url_prefix='/api/v1')
app.register_blueprint(account, url_prefix='/api/v1')
app.register_blueprint(transaction, url_prefix='/api/v1')
app.register_blueprint(category, url_prefix='/api/v1')
