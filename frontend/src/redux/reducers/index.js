import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import alert from './alert';
import authentication from './authentication';
import users from './users';

export default combineReducers({
  simpleReducer,
  alert,
  authentication,
  users,
});
