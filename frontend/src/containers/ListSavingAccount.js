import { connect } from 'react-redux'
import { getAllSavingAccounts } from '../redux/actions/savingAccount'
import SavingAccount from '../components/SavingAccount'

function mapStateToProps(state) {
  const { savingAccount } = state;
  return {
    ...savingAccount,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllSavingAccounts: () => dispatch(getAllSavingAccounts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavingAccount)
