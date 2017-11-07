import axios from "axios"

import { ACTIONS } from "./index"
import { ORDER_SUBMIT_API_URL } from "../config/api"


function submitOrder(order) {
    // order = { cart, venue, stripe}

    return (dispatch) => {
        // Provide user feedback
        dispatch(submitOrderPending())


        // Construct the cart data how the server expects it
        const data = {}
        data.total_price = 0
        data.products = Object.keys(order.cart.products).map((id) => {
            const product = order.cart.products[id]
            // Sum prices
            data.total_price += product.quantity * product.price
            // Product object
            return {
                hex_id:   product.hex_id,
                quantity: product.quantity
            }
        })


        // Construct the POST config & payload
        const axios_config = {
            url: ORDER_SUBMIT_API_URL,
            method: "post",
            headers: {
                "X_AUTH_TOKEN":      ONBOARDING_TOKEN,
                "X_APPLICATION_KEY": APPLICATION_KEY
            },
            data: {
                // Everything needs to live within `data`

                data: {
                    // Specific named fields used by the server
                    price: data.total_price,
                    ccy: "USD",

                    // Everything else goes in form_data
                    form_data: {
                        // Semantic order_source
                        order_source:  "Ferrari/order",  //TODO: should use the current full URL

                        venue_name:       order.venue.venue_name,
                        venue_address:    order.venue.venue_address,
                        venue_address_2:  order.venue.venue_address_2,
                        venue_city:       order.venue.venue_city,
                        venue_state:      order.venue.venue_state,
                        venue_zip:        order.venue.venue_zip,
                        venue_url:        order.venue.venue_url,

                        contact_name:     order.venue.contact_name,
                        contact_position: order.venue.contact_position,
                        contact_email:    order.venue.contact_email,
                        contact_phone:    order.venue.contact_phone,

                        products:  data.products,

                        stripe:    order.stripe
                    }
                }
            }
        }

        // Submit!
        axios(axios_config)
            .then((response) => { return dispatch(submitOrderSuccess(response)) })
            .catch((error)   => { return dispatch(submitOrderFailure(error)) })
    }
}

function submitOrderPending() {
    return { type: ACTIONS.ORDER_SUBMIT_PENDING, payload: {} }
}

function submitOrderSuccess(response) {
    ///- Leaving these in for QA
    console.log("Success!")
    console.log(" | response: ", response)
    console.log(" | body:     ", response.body)
    return { type: ACTIONS.ORDER_SUBMIT_SUCCESS, payload: response }
}

function submitOrderFailure(error) {
    ///- Leaving these in for QA
    console.log("Failure!")
    console.log(" | response: ", error.response)
    console.log(" | body:     ", error.response.body)
    return { type: ACTIONS.ORDER_SUBMIT_FAILURE, payload: error }
}


export default submitOrder
