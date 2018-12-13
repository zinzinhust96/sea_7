import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_ERROR,
} from '../actions/categoryAction'

const initialState = {
  listOfCategories: [],
  categoriesLoading: false,
}

export default function accounts(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return { ...state, categoriesLoading: true, error: null }
    case GET_CATEGORIES_SUCCESS:
      return { ...state, listOfCategories: action.categories, categoriesLoading: false }
    case GET_CATEGORIES_ERROR:
      return { ...state, error: action.error, categoriesLoading: false }
    default:
      return state
  }
}
