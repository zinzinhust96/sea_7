import { authHeader } from '../../helpers/auth-header';
import { fetchJSON } from '../../helpers/network';
import { GET_CATEGORIES_URL } from '../../constants/endpoint';
import { alertActions } from './alertAction';

export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST'
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS'
export const GET_CATEGORIES_ERROR = 'GET_CATEGORIES_ERROR'

export function getCategoriesByAccount(accountID, transType) {
  function request() { return { type: GET_CATEGORIES_REQUEST } }
  function success(categories) { return { type: GET_CATEGORIES_SUCCESS, categories } }
  function failure(error) { return { type: GET_CATEGORIES_ERROR, error } }

  return async (dispatch) => {
    dispatch(request());
    try {
      const response = await fetchJSON((`${GET_CATEGORIES_URL}/${accountID}?type=${transType}`), {
        headers: {
          'Content-Type': 'application/json',
          ...authHeader(),
        },
        method: 'GET',
      });
      if (response.status === 'success') {
        dispatch(success(response.categories))
      } else {
        dispatch(alertActions.error(response.message));
      }
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
}
