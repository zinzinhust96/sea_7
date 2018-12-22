"""add transaction post-balance

Revision ID: 2e9807e1a2d3
Revises: f523aea02c93
Create Date: 2018-12-15 20:09:31.650204

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2e9807e1a2d3'
down_revision = 'f523aea02c93'
branch_labels = None
depends_on = None


def upgrade():
    op.execute("UPDATE `transactions` SET `post_transaction_balance` = `pre_transaction_balance` - `amount` WHERE `transaction_type` = 'expense';")
    op.execute("UPDATE `transactions` SET `post_transaction_balance` = `pre_transaction_balance` + `amount` WHERE `transaction_type` = 'income';")


def downgrade():
    pass
