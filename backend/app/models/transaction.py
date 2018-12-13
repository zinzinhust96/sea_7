from app import db
from datetime import datetime
from .types import TransactionType


class Transaction(db.Model):
    """
    Transactions table schema
    """
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    account_id = db.Column(db.Integer, db.ForeignKey('accounts.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    transaction_type = db.Column(db.Enum(TransactionType), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    note = db.Column(db.String(1000))
    amount = db.Column(db.BigInteger, nullable=False)
    pre_transaction_balance = db.Column(db.BigInteger, nullable=False)
    category = db.relationship('Category', backref=db.backref('transactions', uselist=False))

    @staticmethod
    def create(account_id, category_id, transaction_type, note, amount, pre_transaction_balance):
        new_transaction = Transaction(
            account_id=account_id,
            category_id=category_id,
            transaction_type=TransactionType[transaction_type],
            created_at=datetime.utcnow(),
            note=note,
            amount=amount,
            pre_transaction_balance=pre_transaction_balance
        )
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
            'type': self.transaction_type.name,
            'created': self.created_at.isoformat(),
            'category': self.category.name,
            'pre_bal': self.pre_transaction_balance,
            'note': self.note,
            'amount': self.amount
        }
