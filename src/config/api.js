/* Surfboard APIs */

// NODE_ENV is a Heroku config var exposed as a global constant within /webpack.common.js


// eslint-disable-next-line no-undef
if (!(["development", "staging", "production"].includes(NODE_ENV.toLowerCase()))) {
    throw new Error(`[API init] Unknown NODE_ENV: ${NODE_ENV}`)
}


let proto = "https"
let qa    = ""
let host  = "api.itson.me"

// eslint-disable-next-line no-undef
if (NODE_ENV.toLowerCase() == "staging")
    qa = "qa"

// eslint-disable-next-line no-undef
if (NODE_ENV.toLowerCase() == "development") {
    proto = "http"
    host  = "localhost:3001"
}


let base_api_url = `${proto}://${qa}${host}`

const onboard_api_url = `${base_api_url}/web/v3/merchants/signup`
const order_api_url   = `${base_api_url}/web/v3/merchants/supply_request`
const product_api_url = `${base_api_url}/web/v3/merchants/supply_items`


export const ONBOARD_API_URL        = onboard_api_url
export const ORDER_SUBMIT_API_URL   = order_api_url
export const ORDER_PRODUCTS_API_URL = product_api_url
