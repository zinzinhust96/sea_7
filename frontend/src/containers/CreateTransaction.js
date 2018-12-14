import { connect } from 'react-redux'
import CreateTransaction from '../components/Transactions/create'
import { getAllAccounts } from '../redux/actions/accountAction'
import { getCategoriesByAccount } from '../redux/actions/categoryAction'

function mapStateToProps(state) {
  const { accounts, categories } = state;
  return {
    ...accounts,
    ...categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllAccounts: () => dispatch(getAllAccounts()),
    getCategoriesByAccount: (accountID, transType) => dispatch(getCategoriesByAccount(accountID, transType)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateTransaction)
