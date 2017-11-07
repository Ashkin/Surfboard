import { ACTIONS } from "../actions"


export default function(state={status: null}, action) {
    switch(action.type) {
    case ACTIONS.ORDER_SUBMIT_PENDING:
        return {...state, ...action.payload, status: "pending"}
    case ACTIONS.ORDER_SUBMIT_SUCCESS:
        return {...state, ...action.payload, status: "success"}
    case ACTIONS.ORDER_SUBMIT_FAILURE:
        return {...state, ...action.payload, status: "failure"}
    default:
        return state
    }
}
