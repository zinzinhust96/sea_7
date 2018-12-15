from app import app, db
from datetime import datetime, timedelta
from .types import TransactionType


class Account(db.Model):
    """
    Accounts table schema
    """
    __tablename__ = 'accounts'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    account_type = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    initial_balance = db.Column(db.BigInteger, nullable=False)
    current_balance = db.Column(db.BigInteger, nullable=False)
    saving_duration = db.Column(db.Interval)
    saving_interest_rate = db.Column(db.Float)
    transactions = db.relationship('Transaction', order_by="desc(Transaction.created_at)", backref='transaction', lazy='dynamic')
    categories = db.relationship('Category', backref='category', lazy='dynamic')

    __mapper_args__ = {
        'polymorphic_identity': 'cash',
        'polymorphic_on': account_type
    }

    def __init__(self, name, account_type, user_id, initial_balance, saving_duration=None, saving_interest_rate=None):
        self.name = name
        self.account_type = account_type
        self.user_id = user_id
        self.created_at = datetime.utcnow()
        self.initial_balance = initial_balance
        self.current_balance = initial_balance
        self.saving_duration = timedelta(saving_duration * 30) if saving_duration else None
        self.saving_interest_rate = saving_interest_rate

    def save(self):
        """
        Persist an account in the database
        :return:
        """
        db.session.add(self)
        db.session.commit()

    def get_paginated_transactions(self, page):
        """
        Get an account's transactions and also paginate the results.
        :param page: Page number
        :return: Accounts of the user.
        """
        paginated_transactions_list = self.transactions.paginate(
            page=page,
            per_page=app.config['ITEMS_PER_PAGE'],
            error_out=False
        )
        return paginated_transactions_list

    @staticmethod
    def get_by_id(account_id, user_id):
        """
        Filter an account by Id.
        :param account_id:
        :return: Account or None
        """
        return Account.query.filter_by(id=account_id, user_id=user_id).first()

    def get_categories(self, typ):
        """
        Get an account's categories
        :return: Categories
        """
        return list(filter(lambda cat: cat.type == typ, self.categories)) if typ else self.categories

    def get_current_balance(self):
        return self.current_balance

    def update_balance(self, trans_type, amount):
        if self.current_balance + TransactionType[trans_type].value * amount >= 0:
            self.current_balance += TransactionType[trans_type].value * amount
            db.session.commit()
            return self.current_balance
        else:
            raise ValueError

    def json(self):
        """
        JSON representation.
        :return:
        """
        return {
            'id': self.id,
            'name': self.name,
            'type': self.account_type,
            'created': self.created_at.isoformat(),
            'ini_bal': self.initial_balance,
            'cur_bal': self.current_balance,
            'sav_dur': self.saving_duration,
            'sav_itr': self.saving_interest_rate,
            'limit': None
        }


class CreditAccount(Account):
    """
    Credit accounts table schema
    """
    __tablename__ = 'credit_accounts'

    __mapper_args__ = {
        'polymorphic_identity': 'credit',
    }
    id = db.Column(db.Integer, db.ForeignKey('accounts.id'), primary_key=True)
    limit = db.Column(db.BigInteger, nullable=False)

    def __init__(self, limit, **kwargs):
        super().__init__(**kwargs)
        self.limit = limit

    def update_balance(self, trans_type, amount):
        if self.current_balance + TransactionType[trans_type].value * amount + self.limit >= 0:
            self.current_balance += TransactionType[trans_type].value * amount
            db.session.commit()
            return self.current_balance
        else:
            raise ValueError

    def json(self):
        """
        JSON representation.
        :return:
        """
        return {
            'id': self.id,
            'name': self.name,
            'type': self.account_type,
            'created': self.created_at.isoformat(),
            'ini_bal': self.initial_balance,
            'cur_bal': self.current_balance,
            'sav_dur': self.saving_duration,
            'sav_itr': self.saving_interest_rate,
            'limit': self.limit
        }


class AccountFactory(object):
    OBJ_TYPE_MAP = {
        x.polymorphic_identity: x.class_
        for x in Account.__mapper__.self_and_descendants
    }

    def create_account(self, **kwargs):
        acc_type = self.OBJ_TYPE_MAP.get(kwargs['account_type'].lower())
        assert acc_type, "Unknown type: {}".format(kwargs['account_type'].lower())
        return acc_type(**kwargs)
