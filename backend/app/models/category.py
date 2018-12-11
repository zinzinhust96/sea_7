from app import db


class Category(db.Model):
    """
    Categories table schema
    """
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    account_id = db.Column(db.Integer, db.ForeignKey('accounts.id'))
    parent_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    name = db.Column(db.String(255), unique=True, nullable=False)
    children = db.relationship('Category', backref=db.backref('parent', remote_side=[id]))

    def __init__(self, name, account_id):
        self.name = name
        self.account_id = account_id

    @staticmethod
    def create(name, account_id):
        new_category = Category(name, account_id)
        return new_category

    def save(self):
        """
        Persist a category in the database
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
            'name': self.name,
            'children': [item.json() for item in self.children]
        }
