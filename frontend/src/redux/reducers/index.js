import { combineReducers } from 'redux';
import alert from './alert';
import authentication from './authentication';
import accounts from './accounts'
import categories from './categories'
import transactions from './transactions'
import savingAccount from './savingAccount'

export default combineReducers({
  alert,
  authentication,
  accounts,
  categories,
  transactions,
  savingAccount,
});
