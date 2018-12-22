"""empty message

Revision ID: 6fda96c3b1bb
Revises: ffeaa4610b23
Create Date: 2018-11-28 12:16:53.658479

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '6fda96c3b1bb'
down_revision = 'ffeaa4610b23'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('accounts', sa.Column('saving_duration', sa.Interval(), nullable=True))
    op.add_column('accounts', sa.Column('saving_interest_rate', sa.Float(), nullable=True))
    op.drop_column('accounts', 'interest_rate')
    op.drop_column('accounts', 'duration')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('accounts', sa.Column('duration', mysql.DATETIME(), nullable=True))
    op.add_column('accounts', sa.Column('interest_rate', mysql.FLOAT(), nullable=True))
    op.drop_column('accounts', 'saving_interest_rate')
    op.drop_column('accounts', 'saving_duration')
    # ### end Alembic commands ###
