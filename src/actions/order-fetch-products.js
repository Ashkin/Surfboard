import axios from "axios"

import { ACTIONS }                from "./index"
import { ORDER_PRODUCTS_API_URL } from "../config/api"


function fetchProducts() {
    return (dispatch) => {
        // Provide user feedback
        dispatch(fetchProductsPending())

        // Construct the request
        const axios_config = {
            url: ORDER_PRODUCTS_API_URL,
            method: "get",
            headers: {
                "X_AUTH_TOKEN":      ONBOARDING_TOKEN,
                "X_APPLICATION_KEY": APPLICATION_KEY
            }
        }

        // Submit!
        axios(axios_config)
            .then((response) => { return dispatch(fetchProductsSuccess(response)) })
            .catch((error)   => { return dispatch(fetchProductsFailure(error)) })
    }
}

function fetchProductsPending() {
    return { type: ACTIONS.ORDER_FETCH_PRODUCTS_PENDING, payload: {} }
}


function fetchProductsSuccess(response) {
    return { type: ACTIONS.ORDER_FETCH_PRODUCTS_SUCCESS, payload: response.data }
}

function fetchProductsFailure(error) {
    ///- Leaving these in for QA
    console.log("Failure!")
    console.log(" | error:    ", error)
    console.log(" | response: ", error.response || "n/a")
    console.log(" | body:     ", (error.response || {}).body || "n/a")
    return { type: ACTIONS.ORDER_FETCH_PRODUCTS_FAILURE, payload: error }
}


export default fetchProducts
