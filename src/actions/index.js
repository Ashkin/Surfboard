export const ACTIONS = {
    // Sidebar
    SIDEBAR_VISIBILITY:  "SIDEBAR_VISIBILITY",
    // Onboarding Stepper
    SET_STEP:            "SET_STEP",
    // Save Onboarding Data
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


// Actions
export function sidebarShow()             { return actionFactory(ACTIONS.SIDEBAR_VISIBILITY)(true)}
export function sidebarToggle()           { return actionFactory(ACTIONS.SIDEBAR_VISIBILITY)("toggle")}
export function sidebarVisibility(visible){ return actionFactory(ACTIONS.SIDEBAR_VISIBILITY)(visible) }
export function sidebarHide()             { return actionFactory(ACTIONS.SIDEBAR_VISIBILITY)(false)}

export function setStep(data={})          { return actionFactory(ACTIONS.SET_STEP)(data) }
export function saveVenueData(data={})    { return actionFactory(ACTIONS.UPDATE_VENUE)(data) }
export function saveHoursData(data={})    { return actionFactory(ACTIONS.UPDATE_HOURS)(data) }
export function saveContactData(data={})  { return actionFactory(ACTIONS.UPDATE_CONTACT)(data) }
export function savePhoto(data={})        { return actionFactory(ACTIONS.UPDATE_PHOTO)(data) }
export function selectPlan(data={})       { return actionFactory(ACTIONS.SELECT_PLAN)(data) }
export function saveStripeToken(data={})  { return actionFactory(ACTIONS.UPDATE_STRIPE_TOKEN)(data) }
export { merchantSignup } from "./merchant-signup"
