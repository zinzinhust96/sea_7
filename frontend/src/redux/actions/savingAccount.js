import { authHeader } from '../../helpers/auth-header';
import { fetchJSON } from '../../helpers/network';
import { SAVING_ACCOUNT_URL } from '../../constants/endpoint';
import { alertActions } from './alertAction';

export const GET_ALL_SAVING_ACCOUNT_REQUEST = 'GET_ALL_SAVING_ACCOUNT_REQUEST'
export const GET_ALL_SAVING_ACCOUNT_SUCCESS = 'GET_ALL_SAVING_ACCOUNT_SUCCESS'
export const GET_ALL_SAVING_ACCOUNT_ERROR = 'GET_ALL_SAVING_ACCOUNT_ERROR'

export function getAllSavingAccounts() {
  function request() { return { type: GET_ALL_SAVING_ACCOUNT_REQUEST } }
  function success(accounts) { return { type: GET_ALL_SAVING_ACCOUNT_SUCCESS, accounts } }
  function failure(error) { return { type: GET_ALL_SAVING_ACCOUNT_ERROR, error } }

  return async (dispatch) => {
    dispatch(request());

    try {
      const response = await fetchJSON(SAVING_ACCOUNT_URL, {
        headers: {
          'Content-Type': 'application/json',
          ...authHeader(),
        },
        method: 'GET',
      });
      if (response.status === 'success') {
        dispatch(success(response.accounts))
      } else {
        dispatch(alertActions.error(response.message));
      }
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
}
