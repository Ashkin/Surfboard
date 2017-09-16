import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'

import { ACTIONS } from '../actions'
import signup      from './merchant-signup'


// Basic reducer factory
// Usage: reducerFactory(ACTIONS.WHATEVER, {default: state})
const reducerFactory = function(actionConst, defaultState={}) {
  return function(state=defaultState, action) {
    if (action.type != actionConst)
      return state;
    return {...state, ...action.payload}
  }
}

// Basic reduers
const venue    = reducerFactory(ACTIONS.UPDATE_VENUE)
const contact  = reducerFactory(ACTIONS.UPDATE_CONTACT)
const photos   = reducerFactory(ACTIONS.UPDATE_PHOTO)
const plans    = reducerFactory(ACTIONS.SELECT_PLAN)
const stripe   = reducerFactory(ACTIONS.UPDATE_STRIPE_TOKEN)
const checkout = reducerFactory(ACTIONS.UPDATE_CHECKOUT)



const rootReducer = combineReducers({
  form:  reduxFormReducer,
  venue,
  contact,
  photos,
  plans,
  stripe,
  checkout,
  signup,
})


export default rootReducer
