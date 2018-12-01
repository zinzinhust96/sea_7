import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import alert from './alert';
import authentication from './authentication';
import users from './users';
import accounts from './accounts'

export default combineReducers({
  simpleReducer,
  alert,
  authentication,
  users,
  accounts,
});
