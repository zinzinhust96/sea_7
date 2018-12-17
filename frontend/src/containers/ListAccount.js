import { connect } from 'react-redux'
import { getAllAccounts } from '../redux/actions/accountAction'
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

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListAccount)
