from app import db
from datetime import datetime, timedelta


class SavingAccount(db.Model):
    """
    Accounts table schema
    """
    __tablename__ = 'saving_accounts'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    account_id = db.Column(db.Integer, db.ForeignKey('accounts.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(255), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    initial_balance = db.Column(db.BigInteger, nullable=False)
    current_balance = db.Column(db.BigInteger, nullable=False)
    duration = db.Column(db.Interval, nullable=False)
    interest_rate = db.Column(db.Float, nullable=False)
    source_account = db.relationship('Account')

    def __init__(self, account_id, user_id, name, initial_balance, duration, interest_rate):
        self.name = name
        self.account_id = account_id
        self.user_id = user_id
        self.created_at = datetime.utcnow()
        self.initial_balance = initial_balance
        self.current_balance = initial_balance
        self.duration = timedelta(duration * 30)
        self.interest_rate = interest_rate

    @staticmethod
    def create(account_id, user_id, name, initial_balance, duration, interest_rate):
        new_saving_account = SavingAccount(account_id, user_id, name, initial_balance, duration, interest_rate)
        return new_saving_account

    def save(self):
        """
        Persist an account in the database
        :return:
        """
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def get_by_id(saving_account_id, user_id):
        """
        Filter an account by Id.
        :param saving_account_id:
        :return: Account or None
        """
        return SavingAccount.query.filter_by(id=saving_account_id, user_id=user_id).first()

    def get_current_balance(self):
        return self.current_balance

    def update_balance(self, trans_type, amount):
        pass

    def json(self):
        """
        JSON representation.
        :return:
        """
        return {
            'id': self.id,
            'src_acc': self.source_account.json(),
            'name': self.name,
            'created': self.created_at.isoformat(),
            'ini_bal': self.initial_balance,
            'cur_bal': self.current_balance,
            'duration': self.duration.days,
            'rate': self.interest_rate
        }
