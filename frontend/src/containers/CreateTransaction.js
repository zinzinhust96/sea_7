import { connect } from 'react-redux'
import CreateTransaction from '../components/Transactions/create'
import { getAllAccounts } from '../redux/actions/accountAction'

function mapStateToProps(state) {
  const { accounts } = state;
  return {
    ...accounts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllAccounts: () => dispatch(getAllAccounts()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateTransaction)
