"""empty message

Revision ID: 9de0c99a51bb
Revises: d725bee846ac
Create Date: 2018-12-20 10:50:19.236444

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '9de0c99a51bb'
down_revision = 'd725bee846ac'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('saving_accounts',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('account_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('initial_balance', sa.BigInteger(), nullable=False),
    sa.Column('current_balance', sa.BigInteger(), nullable=False),
    sa.Column('duration', sa.Interval(), nullable=False),
    sa.Column('interest_rate', sa.Float(), nullable=False),
    sa.ForeignKeyConstraint(['account_id'], ['accounts.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.drop_column('accounts', 'saving_interest_rate')
    op.drop_column('accounts', 'saving_duration')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('accounts', sa.Column('saving_duration', mysql.DATETIME(), nullable=True))
    op.add_column('accounts', sa.Column('saving_interest_rate', mysql.FLOAT(), nullable=True))
    op.drop_table('saving_accounts')
    # ### end Alembic commands ###
