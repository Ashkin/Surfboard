import { ACTIONS } from "../actions"


export default function(state={status: null}, action) {
    switch(action.type) {
    case ACTIONS.ORDER_FETCH_PRODUCTS_PENDING:
        return {...state, ...action.payload, status: "pending"}
    case ACTIONS.ORDER_FETCH_PRODUCTS_SUCCESS:
        return {...state, ...action.payload, status: "success"}
    case ACTIONS.ORDER_FETCH_PRODUCTS_FAILURE:
        return {...state, ...action.payload, status: "failure"}
    default:
        return state
    }
}
