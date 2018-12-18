import {
  GET_ALL_ACCOUNT_REQUEST,
  GET_ALL_ACCOUNT_SUCCESS,
  GET_ALL_ACCOUNT_ERROR,
} from '../actions/accountAction'

const initialState = {
  listOfAccounts: [],
  accountLoading: false,
}

export default function accounts(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ACCOUNT_REQUEST:
      return { ...state, accountLoading: true }
    case GET_ALL_ACCOUNT_SUCCESS:
      return { ...state, listOfAccounts: action.accounts, accountLoading: false }
    case GET_ALL_ACCOUNT_ERROR:
      return { ...state, error: action.error, accountLoading: false }
    default:
      return state
  }
}
