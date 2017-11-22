import { ACTIONS } from "../actions"


export default function(state={}, action) {
    switch(action.type) {
    case ACTIONS.SIDEBAR_VISIBILITY:

        switch(action.payload) {
        case true:
        case "show":
            return {...state, visible: true}
        case "toggle":
            return {...state, visible: !state.visible}
        case false:
        case "hide":
            return {...state, visible: false}
        default:
            return state
        }

    default:
        return state
    }
}
