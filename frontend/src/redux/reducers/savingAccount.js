import {
  GET_ALL_SAVING_ACCOUNT_REQUEST,
  GET_ALL_SAVING_ACCOUNT_SUCCESS,
  GET_ALL_SAVING_ACCOUNT_ERROR,
} from '../actions/savingAccount'

const initialState = {
  listOfSavingAccounts: [],
  accountLoading: false,
}

export default function savingAccounts(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SAVING_ACCOUNT_REQUEST:
      return { ...state, accountLoading: true, accountError: null }
    case GET_ALL_SAVING_ACCOUNT_SUCCESS:
      return { ...state, listOfSavingAccounts: action.accounts, accountLoading: false }
    case GET_ALL_SAVING_ACCOUNT_ERROR:
      return { ...state, accountError: action.error, accountLoading: false }
    default:
      return state
  }
}
