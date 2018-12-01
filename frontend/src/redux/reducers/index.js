import { combineReducers } from 'redux';
import alert from './alert';
import authentication from './authentication';
import accounts from './accounts'

export default combineReducers({
  alert,
  authentication,
  accounts,
});
