import { connect } from 'react-redux'
import TransactionsHistory from '../components/Transactions'
import { getAllTransactions } from '../redux/actions/transactionsAction';

function mapStateToProps(state) {
  const { accounts, transactions } = state;
  return {
    ...accounts,
    ...transactions,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getAllTransactions: accountID => dispatch(getAllTransactions(accountID)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsHistory)
