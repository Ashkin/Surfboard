export const ACTIONS = {
  SELECT_PLAN: 'SELECT_PLAN',
  UPDATE_STRIPE_TOKEN: 'UPDATE_STRIPE_TOKEN',
  UPDATE_VENUE: 'UPDATE_VENUE',
  UPDATE_CONTACT: 'UPDATE_CONTACT',
  UPDATE_CHECKOUT: 'UPDATE_CHECKOUT',
}


export function selectPlan(id=null) {
  console.log("[ACTIONS::selectPlan]  id: ", id)

  return {
    type: ACTIONS.SELECT_PLAN,
    payload: id
  }
}



export function saveStripeToken(data={}) {
  return {
    type: ACTIONS.UPDATE_STRIPE_TOKEN,
    payload: data
  }
}


export function saveVenueData(data={}) {
  return {
    type: ACTIONS.UPDATE_VENUE,
    payload: data
  }
}

export function saveContactData(data={}) {
  return {
    type: ACTIONS.UPDATE_CONTACT,
    payload: data
  }
}


export function saveCheckoutData(data={}) {
  console.log("[actions::saveCheckoutData] data: ", data)
  return {
    type: ACTIONS.UPDATE_CHECKOUT,
    payload: data
  }
}