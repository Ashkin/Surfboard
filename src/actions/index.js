export const ACTIONS = {
    // Sidebar
    SIDEBAR_VISIBILITY:  "SIDEBAR_VISIBILITY",

    // Header
    SET_HEADER:          "SET_HEADER",
    SET_HEADER_TITLE:    "SET_HEADER_TITLE",

    // Save Ordering Data
    ORDER_SET_STEP:             "SET_ORDERING_STEP",
    ORDER_ADD_PRODUCT:          "ADD_PRODUCT",
    ORDER_SET_PRODUCT_QUANTITY: "SET_PRODUCT_QUANTITY",
    ORDER_REMOVE_PRODUCT:       "REMOVE_PRODUCT",
    ORDER_SAVE_VENUE:           "ORDER_SAVE_VENUE",
    ORDER_SAVE_STRIPE_TOKEN:    "ORDER_SAVE_STRIPE_TOKEN",

    // Product API Actions
    ORDER_FETCH_PRODUCTS:         "ORDER_FETCH_PRODUCTS",
    ORDER_FETCH_PRODUCTS_PENDING: "ORDER_FETCH_PRODUCTS_PENDING",
    ORDER_FETCH_PRODUCTS_SUCCESS: "ORDER_FETCH_PRODUCTS_SUCCESS",
    ORDER_FETCH_PRODUCTS_FAILURE: "ORDER_FETCH_PRODUCTS_FAILURE",
    ORDER_SUBMIT_PENDING:         "ORDER_SUBMIT_PENDING",
    ORDER_SUBMIT_SUCCESS:         "ORDER_SUBMIT_SUCCESS",
    ORDER_SUBMIT_FAILURE:         "ORDER_SUBMIT_FAILURE",

    // Save Onboarding Data
    SET_ONBOARD_STEP:    "SET_ONBOARD_STEP",
    UPDATE_VENUE:        "UPDATE_VENUE",
    UPDATE_HOURS:        "UPDATE_HOURS",
    UPDATE_CONTACT:      "UPDATE_CONTACT",
    UPDATE_PHOTO:        "UPDATE_PHOTO",
    SELECT_PLAN:         "SELECT_PLAN",
    UPDATE_STRIPE_TOKEN: "UPDATE_STRIPE_TOKEN",

    // Merchant API Actions
    MERCHANT_SIGNUP:         "MERCHANT_SIGNUP",
    MERCHANT_SIGNUP_PENDING: "MERCHANT_SIGNUP_PENDING",
    MERCHANT_SIGNUP_SUCCESS: "MERCHANT_SIGNUP_SUCCESS",
    MERCHANT_SIGNUP_FAILURE: "MERCHANT_SIGNUP_FAILURE",
}


// Basic action factory
// Usage: actionFactory(action)(data)
function actionFactory(action) {
    return function(data) {
        return { type: action, payload: data }
    }
}


/** Actions **/

// Sidebar
export function sidebarShow()             { return actionFactory(ACTIONS.SIDEBAR_VISIBILITY)(true)}
export function sidebarToggle()           { return actionFactory(ACTIONS.SIDEBAR_VISIBILITY)("toggle")}
export function sidebarVisibility(visible){ return actionFactory(ACTIONS.SIDEBAR_VISIBILITY)(visible) }
export function sidebarHide()             { return actionFactory(ACTIONS.SIDEBAR_VISIBILITY)(false)}

// Header
export function setHeader(data={})        { return actionFactory(ACTIONS.SET_HEADER)(data)}
export function setHeaderTitle(title)     { return actionFactory(ACTIONS.SET_HEADER)({title})}

// Onboard
export function setOnboardStep(data={})   { return actionFactory(ACTIONS.SET_ONBOARD_STEP)(data) }
export function saveVenueData(data={})    { return actionFactory(ACTIONS.UPDATE_VENUE)(data) }
export function saveHoursData(data={})    { return actionFactory(ACTIONS.UPDATE_HOURS)(data) }
export function saveContactData(data={})  { return actionFactory(ACTIONS.UPDATE_CONTACT)(data) }
export function savePhoto(data={})        { return actionFactory(ACTIONS.UPDATE_PHOTO)(data) }
export function selectPlan(data={})       { return actionFactory(ACTIONS.SELECT_PLAN)(data) }
export function saveStripeToken(data={})  { return actionFactory(ACTIONS.UPDATE_STRIPE_TOKEN)(data) }
export { merchantSignup } from "./merchant-signup"

// Ordering
import fetchProducts from "./order-fetch-products"
import submitOrder   from "./order-submit"
export const order = {
  setStep:              (data={}) => { return actionFactory(ACTIONS.ORDER_SET_STEP)(data) },
  addProduct:           (data={}) => { return actionFactory(ACTIONS.ORDER_ADD_PRODUCT)(data) },
  setProductQuantity:   (data={}) => { return actionFactory(ACTIONS.ORDER_SET_PRODUCT_QUANTITY)(data) },
  removeProduct:        (data={}) => { return actionFactory(ACTIONS.ORDER_REMOVE_PRODUCT)(data) },
  saveVenue:            (data={}) => { return actionFactory(ACTIONS.ORDER_SAVE_VENUE)(data) },
  saveStripeToken:      (data={}) => { return actionFactory(ACTIONS.ORDER_SAVE_STRIPE_TOKEN)(data) },
  fetchProducts,
  submitOrder
}
