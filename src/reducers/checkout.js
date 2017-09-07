import { ACTIONS } from '../actions'


export default function(state={}, action) {
  switch(action.type) {
    case ACTIONS.UPDATE_CHECKOUT:
      console.log('[checkout-reducer::UPDATE_CHECKOUT]  payload: ', action.payload)

      return { ...state, ...action.payload }

    default:
      return state
  }
}
