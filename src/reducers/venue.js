import { ACTIONS } from '../actions'


export default function(state={}, action) {
  switch(action.type) {
    case ACTIONS.UPDATE_VENUE:
      return { ...state, ...action.payload }

    default:
      return state
  }
}
