import { connect } from 'react-redux'
import { getAllAccounts } from '../redux/actions/accountAction'
import TransactionsHistory from '../components/Transactions'
import { getAllTransactions, updateAccountIDToGetTransactions } from '../redux/actions/transactionsAction';

function mapStateToProps(state) {
  const { accounts, transactions } = state;
  return {
    ...accounts,
    ...transactions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllAccounts: () => dispatch(getAllAccounts()),
    getAllTransactions: accountID => dispatch(getAllTransactions(accountID)),
    updateAccountIDToGetTransactions: accountID => dispatch(updateAccountIDToGetTransactions(accountID)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsHistory)
