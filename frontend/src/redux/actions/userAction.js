import { userConstants } from '../../constants/user';
import { userService } from '../../services/user';
import { alertActions } from './alertAction';
import { history } from '../../helpers/history';

function login(email, password) {
  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }

  return (dispatch) => {
    dispatch(request({ email }));

    userService.login(email, password)
      .then(
        (user) => {
          dispatch(success(user));
          history.push('/');
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

function register(email, password) {
  function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }

  return (dispatch) => {
    dispatch(request({ email }));

    userService.register(email, password)
      .then(
        (user) => {
          dispatch(success(user));
          history.push('/');
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function getAll() {
  function request() { return { type: userConstants.GETALL_REQUEST } }
  function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
  function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }

  return (dispatch) => {
    dispatch(request());

    userService.getAll()
      .then(
        users => dispatch(success(users)),
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error))
        },
      );
  };
}

export const userActions = {
  login,
  register,
  logout,
  getAll,
};
