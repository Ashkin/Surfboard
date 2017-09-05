import { ACTIONS } from '../actions'


export default function(state={}, action) {
  // console.log("[Plans reducer]  action: ", action)

  switch(action.type) {
    case ACTIONS.SELECT_PLAN:
      const selectedPlan = action.payload
      const newState = { ...state, selectedPlan }
      // console.log("                   | newState: ", newState)

      return newState

    default:
      return state
  }
}
