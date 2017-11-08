import axios from "axios"

import { ACTIONS }         from "./index"
import { ONBOARD_API_URL } from "../config/api"
import PLANS               from "../config/plans"


export function merchantSignup(data) {
    return (dispatch) => {
        // Provide user feedback
        dispatch(merchantSignupPending())


        // Extract the plan's data from config
        // (Clean Skies!  within an IIFE to avoid pollution)
        data["plan"] = (() => {
            const selectedPlan = PLANS[data.plans.selectedPlan]
            const { name, pricePerMonth, cycleInMonths } = selectedPlan
            return { name, pricePerMonth, cycleInMonths }
        })()
        // and remove the useless `plans` object (as it only contains the selectedPlan id)
        delete data.plans


        // Construct the POST config & payload
        const axios_config = {
            url: ONBOARD_API_URL,
            method: "post",
            headers: {
                "X_AUTH_TOKEN":      WWW_ACCESS_TOKEN,
                "X_APPLICATION_KEY": APPLICATION_KEY
            },
            data: {
                // Everything needs to live within `data`
                data: {
                    // Specific named fields used by the server
                    name: data.contact.name,
                    position: data.contact.position || "Surfboard",  // Mimic the CLOVER behavior and include the signup source
                    address: data.venue.address,
                    venue_name: data.venue.name,
                    venue_url: data.venue.url,
                    email: data.contact.email,
                    phone: data.contact.phone,
                    point_of_sale_system: data.venue.pos || "Surfboard",  // Required by the backend
                    // message: "",

                    // but it will store everything else, too
                    // so let's make sure we send everything!
                    data: {
                        signup_source: "Surfboard",  // and a semantic signup_source here, too.
                        zinger: data.venue.zinger,
                        description: data.venue.description,
                        address: data.venue.address,
                        address_2: data.venue.address_2,
                        yelp_url: data.venue.yelp_url,
                        ...data
                    }
                }
            }
        }

        // Submit!
        axios(axios_config)
            .then((response) => { return dispatch(merchantSignupSuccess(response)) })
            .catch((error)   => { return dispatch(merchantSignupFailure(error)) })
    }
}

function merchantSignupPending() {
    return { type: ACTIONS.MERCHANT_SIGNUP_PENDING, payload: {} }
}


function merchantSignupSuccess(response) {
    ///- Leaving these in for QA
    console.log("Success!")
    console.log(" | response: ", response)
    console.log(" | body:     ", response.body)
    return { type: ACTIONS.MERCHANT_SIGNUP_SUCCESS, payload: response }
}

function merchantSignupFailure(error) {
    ///- Leaving these in for QA
    console.log("Failure!")
    console.log(" | response: ", error.response)
    console.log(" | body:     ", error.response.body)
    return { type: ACTIONS.MERCHANT_SIGNUP_FAILURE, payload: error }
}


export default merchantSignup
