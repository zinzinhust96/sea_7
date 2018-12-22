"""update categories types

Revision ID: b871f89b3ee9
Revises: c84e28fe1eec
Create Date: 2018-12-14 21:02:04.104513

"""
from alembic import op

# revision identifiers, used by Alembic.
revision = 'b871f89b3ee9'
down_revision = 'c84e28fe1eec'
branch_labels = None
depends_on = None


def upgrade():
    op.execute("UPDATE `categories` SET `type` = 'expense' WHERE `type` = 'Expense';")
    op.execute("UPDATE `categories` SET `type` = 'income' WHERE `type` = 'Income';")
    op.execute("DELETE FROM `categories` WHERE `type` = 'Debt/Loan';")


def downgrade():
    op.execute("UPDATE `categories` SET `type` = 'Expense' WHERE `type` = 'expense';")
    op.execute("UPDATE `categories` SET `type` = 'Income' WHERE `type` = 'income';")
