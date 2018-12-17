import { connect } from 'react-redux'
import { getAllAccounts } from '../redux/actions/accountAction'
import { updateAccountIDToGetTransactions } from '../redux/actions/transactionsAction'
import ListAccount from '../components/Account'

function mapStateToProps(state) {
  const { accounts } = state;
  return {
    ...accounts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllAccounts: () => dispatch(getAllAccounts()),
    updateAccountIDToGetTransactions: accountID => dispatch(updateAccountIDToGetTransactions(accountID)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListAccount)
