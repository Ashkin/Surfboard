import { combineReducers } from "redux"
import { reducer as reduxFormReducer } from "redux-form"

import { ACTIONS } from "../actions"
import signup      from "./merchant-signup"
import sidebar     from "./sidebar"

import order_fetch_products  from "./order-fetch-products"
import order_cart            from "./order-cart"
import order_submit_status   from "./order-submit-status"

// Basic reducer factory
// Usage: reducerFactory(ACTIONS.WHATEVER, {default: state})
const reducerFactory = function(actionConst, defaultState={}) {
    return function(state=defaultState, action) {
        if (action.type != actionConst)
            return state
        return {...state, ...action.payload}
    }
}


/** Basic reduers **/

// Header
const header = reducerFactory(ACTIONS.SET_HEADER)

// Ordering
//TODO: move {product, ...} into `ordering`
const order_step    = reducerFactory(ACTIONS.ORDER_SET_STEP)
const order_product = reducerFactory(ACTIONS.ORDER_SELECT_PRODUCT)
const order_venue   = reducerFactory(ACTIONS.ORDER_SAVE_VENUE)
const order_billing = reducerFactory(ACTIONS.ORDER_SAVE_STRIPE_TOKEN)

// Onboard
//TODO: move {venue, hours, contact, photos, plans, stripe, signup} into `onboard`
const onboard  = reducerFactory(ACTIONS.SET_ONBOARD_STEP)
const venue    = reducerFactory(ACTIONS.UPDATE_VENUE)
const hours    = reducerFactory(ACTIONS.UPDATE_HOURS)
const contact  = reducerFactory(ACTIONS.UPDATE_CONTACT)
const photos   = reducerFactory(ACTIONS.UPDATE_PHOTO)
const plans    = reducerFactory(ACTIONS.SELECT_PLAN)
const stripe   = reducerFactory(ACTIONS.UPDATE_STRIPE_TOKEN)
const check    = reducerFactory(ACTIONS.PAY_BY_CHECK)


const rootReducer = combineReducers({
    form:  reduxFormReducer,

    header,
    sidebar,

    order_step,
    order_fetch_products,
    order_product,
    order_venue,
    order_cart,
    order_billing,
    order_submit_status,

    onboard,
    venue,
    hours,
    contact,
    photos,
    plans,
    stripe,
    check,
    signup,
})


export default rootReducer
