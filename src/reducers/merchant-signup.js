import { ACTIONS } from "../actions"


export default function(state={status: null}, action) {
    switch(action.type) {
    case ACTIONS.MERCHANT_SIGNUP_PENDING:
        return {...state, ...action.payload, status: "pending"}
    case ACTIONS.MERCHANT_SIGNUP_SUCCESS:
        return {...state, ...action.payload, status: "success"}
    case ACTIONS.MERCHANT_SIGNUP_FAILURE:
        return {...state, ...action.payload, status: "failure"}
    default:
        return state
    }
}
