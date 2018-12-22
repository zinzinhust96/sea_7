import json
import logging
from app.models import Category
from app import db
from sqlalchemy.exc import IntegrityError

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


def main():
    with open('seed.json', 'r') as f:
        try:
            data = f.read()
            json_data = json.loads(data)
            categories = json_data['categories']
            for category_type in categories.keys():
                category_items = categories[category_type]
                for item in category_items:
                    parent_category = Category(name=item['name'], typ=category_type)
                    db.session.add(parent_category)
                    for child_item in item['children']:
                        child_category = Category(name=child_item['name'], typ=category_type)
                        parent_category.children.append(child_category)
                        db.session.add(child_category)
            db.session.commit()
        except IntegrityError:
            logging.warning('Skipped seeding process')
    logging.info('Successfully seeded database')


if __name__ == '__main__':
    main()
