import { ACTIONS } from "../actions"


/* 
 * Cart Format:
 * products: {
 *     [id]: {hex_id, price, quantity}
 * }
*/


let products, quantity, _state

export default function(state={}, action) {
    switch(action.type) {
    case ACTIONS.ORDER_ADD_PRODUCT:
        // Add prooduct if it doesn't exist
        products = {...state.products}
        if (products[action.payload.id] === undefined) {
            let { id, hex_id, price } = action.payload
            products[id] = {
                quantity: 1,
                hex_id,
                price
            }

        } else {
            // Otherwise, increment its quantity
            products[action.payload.id].quantity++
        }

        return { products: {...products} }

    case ACTIONS.ORDER_SET_PRODUCT_QUANTITY:
        products = {...state.products}
        quantity = action.payload.quantity
        // Minimum allowed: 1
        if (quantity < 1)
            quantity = 1

        // Update quantity, but preserve the rest
        products[action.payload.id] = {
            ...products[action.payload.id],
            quantity
        }
        return { products: {...products} }

    case ACTIONS.ORDER_REMOVE_PRODUCT:
        products = {...state.products}
        delete products[action.payload.id]

        return { products: {...products} }

    default:
        return state
    }
}
