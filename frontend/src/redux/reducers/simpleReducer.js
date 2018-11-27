import { SIMPLE_ACTION } from 'redux/actions/simpleAction'

export default (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case SIMPLE_ACTION:
      return {
        result: payload,
      }
    default:
      return state
  }
}
