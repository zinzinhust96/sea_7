"""update transactions enum types

Revision ID: c84e28fe1eec
Revises: 1d3fbd64958a
Create Date: 2018-12-14 20:47:36.758993

"""
from alembic import op

# revision identifiers, used by Alembic.
revision = 'c84e28fe1eec'
down_revision = '1d3fbd64958a'
branch_labels = None
depends_on = None


def upgrade():
    op.execute("ALTER TABLE `transactions` CHANGE `transaction_type` `transaction_type` ENUM('expense', 'SPEND', 'INCOME') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;")
    op.execute("UPDATE `transactions` SET `transaction_type` = 'expense' WHERE `transaction_type` = 'SPEND'")
    op.execute("UPDATE `transactions` SET `transaction_type` = 'income' WHERE `transaction_type` = 'INCOME'")
    op.execute("ALTER TABLE `transactions` CHANGE `transaction_type` `transaction_type` ENUM('expense', 'income') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;")
    pass


def downgrade():
    op.execute("ALTER TABLE `transactions` CHANGE `transaction_type` `transaction_type` ENUM('expense', 'SPEND', 'INCOME') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;")
    op.execute("UPDATE `transactions` SET `transaction_type` = 'SPEND' WHERE `transaction_type` = 'expense'")
    op.execute("UPDATE `transactions` SET `transaction_type` = 'INCOME' WHERE `transaction_type` = 'income'")
    op.execute("ALTER TABLE `transactions` CHANGE `transaction_type` `transaction_type` ENUM('SPEND', 'INCOME') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;")
    pass
