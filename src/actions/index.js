export const ACTIONS = {
  UPDATE_VENUE:        'UPDATE_VENUE',
  UPDATE_CONTACT:      'UPDATE_CONTACT',
  SELECT_PLAN:         'SELECT_PLAN',
  UPDATE_STRIPE_TOKEN: 'UPDATE_STRIPE_TOKEN',
  UPDATE_CHECKOUT:     'UPDATE_CHECKOUT',
}


// Basic action factory
// Usage: actionFactory(action)(data)
function actionFactory(action) {
  return function(data) {
    return { type: action, payload: data }
  }
}


// Actions
export function saveVenueData(data={})    { return actionFactory(ACTIONS.UPDATE_VENUE)(data) }
export function saveContactData(data={})  { return actionFactory(ACTIONS.UPDATE_CONTACT)(data) }
export function selectPlan(data={})       { return actionFactory(ACTIONS.SELECT_PLAN)(data) }
export function saveStripeToken(data={})  { return actionFactory(ACTIONS.UPDATE_STRIPE_TOKEN)(data) }
export function saveCheckoutData(data={}) { return actionFactory(ACTIONS.UPDATE_CHECKOUT)(data) }
