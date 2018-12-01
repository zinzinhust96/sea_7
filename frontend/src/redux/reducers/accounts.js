import {
  GET_ALL_ACCOUNT_REQUEST,
  GET_ALL_ACCOUNT_SUCCESS,
  GET_ALL_ACCOUNT_ERROR,
} from '../actions/accountAction'

const initialState = {
  listData: [],
  loading: false,
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ACCOUNT_REQUEST:
      return { ...state, loading: true }
    case GET_ALL_ACCOUNT_SUCCESS:
      return { ...state, listData: action.accounts }
    case GET_ALL_ACCOUNT_ERROR:
      return { ...state, error: action.error }
    default:
      return state
  }
}
