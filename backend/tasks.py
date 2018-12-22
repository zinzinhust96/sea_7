from app import app, celery, mail
from app.models import SavingAccount
from flask_mail import Message
import datetime

ONE_MONTH_MILLIS = 2563200 * 1000
TWO_MONTHS_MILLIS = 5155200 * 1000
THREE_MONTHS_MILLIS = 7747200 * 1000


@celery.task()
def add_interest_amount():
    today_date = datetime.datetime.today().date()
    for account in SavingAccount.query.all():
        if not account.completed:
            if (
                account.created_at.date() + datetime.timedelta(milliseconds=ONE_MONTH_MILLIS) == today_date or
                account.created_at.date() + datetime.timedelta(milliseconds=TWO_MONTHS_MILLIS) == today_date or
                account.created_at.date() + datetime.timedelta(milliseconds=THREE_MONTHS_MILLIS) == today_date
            ):
                account.update_balance()


@celery.task()
def check_completed_saving_duration():
    today_date = datetime.datetime.today().date()
    for account in SavingAccount.query.all():
        if account.created_at.date() + datetime.timedelta(account.duration.days) == today_date and not account.completed:
            account.finish_saving_duration()
            account.source_account.update_balance('income', account.current_balance)
            mail_body = create_report(account.name,
                                      account.created_at.isoformat(),
                                      account.initial_balance,
                                      account.duration.days,
                                      account.interest_rate,
                                      account.current_balance - account.initial_balance,
                                      account.current_balance)
            msg = Message(subject='Saving account reports',
                          sender=app.config.get('MAIL_USERNAME'),
                          recipients=[account.user.email],
                          body=mail_body)
            mail.send(msg)


def create_report(name, created_at, initial_bal, duration, rate, interest_amount, final):
    return '''Reports:
            - Saving account name: {}
            - Creation date: {}
            - Initial balance: {}
            - Duration: {} (days)
            - Interest rate : {}
            - Interest amount: {}
            - Final balance: {}
            '''.format(name, created_at, initial_bal, duration, rate, interest_amount, final)
