import { authHeader } from '../../helpers/auth-header';
import { fetchJSON } from '../../helpers/network';
import { CREATE_TRANSACTION_URL } from '../../constants/endpoint';
import { alertActions } from './alertAction';

export const GET_TRANSACTIONS_REQUEST = 'GET_TRANSACTIONS_REQUEST';
export const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS';
export const GET_TRANSACTIONS_ERROR = 'GET_TRANSACTIONS_ERROR';

export function getAllTransactions(accountID) {
  function request() { return { type: GET_TRANSACTIONS_REQUEST } }
  function success(transactions) { return { type: GET_TRANSACTIONS_SUCCESS, transactions } }
  function failure(error) { return { type: GET_TRANSACTIONS_ERROR, error } }

  return async (dispatch) => {
    dispatch(request());
    try {
      const response = await fetchJSON((`${CREATE_TRANSACTION_URL}/${accountID}`), {
        headers: {
          'Content-Type': 'application/json',
          ...authHeader(),
        },
        method: 'GET',
      });
      if (response.status === 'success') {
        dispatch(success(response.transactions))
      } else {
        dispatch(alertActions.error(response.message));
      }
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
}
