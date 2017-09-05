export const ACTIONS = {
  SELECT_PLAN: 'SELECT_PLAN'
}


export function selectPlan(id=null) {
  console.log("[selectPlan action]  id: ", id)

  return {
    type: ACTIONS.SELECT_PLAN,
    payload: id
  }
}
