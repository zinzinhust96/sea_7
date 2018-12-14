from app import db


class Category(db.Model):
    """
    Categories table schema
    """
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    account_id = db.Column(db.Integer, db.ForeignKey('accounts.id'))
    parent_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    name = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(32), server_default='Other', nullable=False)
    children = db.relationship('Category', backref=db.backref('parent', remote_side=[id]))

    __table_args__ = (
        db.UniqueConstraint('name', 'type', name='unique_name_type'),
    )

    def __init__(self, name, typ, account_id=None):
        self.name = name
        self.type = typ
        self.account_id = account_id

    @staticmethod
    def create(name, typ, account_id):
        new_category = Category(name, typ, account_id)
        return new_category

    def save(self):
        """
        Persist a category in the database
        :return:
        """
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def get_by_id(cat_id):
        return Category.query.filter_by(id=cat_id).first()

    @staticmethod
    def get_default_categories(typ):
        """
        Get all default categories.
        :return: Categories
        """
        return Category.query.filter_by(account_id=None, parent_id=None, type=typ).all() if typ else Category.query.filter_by(account_id=None, parent_id=None).all()

    def json(self):
        """
        JSON representation.
        :return:
        """
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'subcategories': [item.json() for item in self.children]
        }
