import { combineReducers } from "redux"
import { reducer as reduxFormReducer } from "redux-form"

import { ACTIONS } from "../actions"
import signup      from "./merchant-signup"


// Basic reducer factory
// Usage: reducerFactory(ACTIONS.WHATEVER, {default: state})
const reducerFactory = function(actionConst, defaultState={}) {
  return function(state=defaultState, action) {
    if (action.type != actionConst)
      return state
    return {...state, ...action.payload}
  }
}

// Basic reduers
const onboard  = reducerFactory(ACTIONS.SET_STEP)
const venue    = reducerFactory(ACTIONS.UPDATE_VENUE)
const hours    = reducerFactory(ACTIONS.UPDATE_HOURS)
const contact  = reducerFactory(ACTIONS.UPDATE_CONTACT)
const photos   = reducerFactory(ACTIONS.UPDATE_PHOTO)
const plans    = reducerFactory(ACTIONS.SELECT_PLAN)
const stripe   = reducerFactory(ACTIONS.UPDATE_STRIPE_TOKEN)



const rootReducer = combineReducers({
  onboard,
  form:  reduxFormReducer,
  venue,
  hours,
  contact,
  photos,
  plans,
  stripe,
  signup,
})


export default rootReducer
