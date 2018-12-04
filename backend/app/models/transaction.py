from app import db
from enum import Enum
from datetime import datetime


class TransactionTypeEnum(Enum):
    SPEND = -1
    INCOME = 1


class Transaction(db.Model):
    """
    Transactions table schema
    """
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    account_id = db.Column(db.Integer, db.ForeignKey('accounts.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    transaction_type = db.Column(db.Enum(TransactionTypeEnum), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    note = db.Column(db.String(1000))
    amount = db.Column(db.BigInteger, nullable=False)
    pre_transaction_balance = db.Column(db.BigInteger, nullable=False)

    def __init__(self, account_id, category_id, transaction_type, note, amount, pre_transaction_balance):
        self.account_id = account_id
        self.category_id = category_id
        self.transaction_type = transaction_type,
        self.created_at = datetime.utcnow()
        self.note = note
        self.amount = amount
        self.pre_transaction_balance = pre_transaction_balance

    @staticmethod
    def create(account_id, category_id, transaction_type, note, amount, pre_transaction_balance):
        new_transaction = Transaction(account_id, category_id, transaction_type, note, amount, pre_transaction_balance)
        return new_transaction

    def save(self):
        """
        Persist a transaction in the database
        :return:
        """
        db.session.add(self)
        db.session.commit()

    def json(self):
        """
        JSON representation.
        :return:
        """
        return {
            'type': self.transaction_type,
            'created': self.created_at.isoformat(),
            'pre_bal': self.pre_transaction_balance,
            'note': self.note,
            'amount': self.amount
        }
