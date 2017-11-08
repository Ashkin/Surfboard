/* Ferrari APIs */

/* Heroku config vars exposed as global constants within /webpack.common.js:
 *   NODE_ENV
 *   APPLICATION_KEY
 *   WWW_ACCESS_TOKEN
 */


// eslint-disable-next-line no-undef
if (!(["development", "staging", "production"].includes(NODE_ENV.toLowerCase()))) {
    throw new Error(`[API init] Unknown NODE_ENV: ${NODE_ENV}`)
}


let qa = "qa"
// eslint-disable-next-line no-undef
if (NODE_ENV.toLowerCase() == "production")
    qa = ""

const base_api_url    = `https://${qa}api.itson.me`

const onboard_api_url = `${base_api_url}/web/v3/merchants/signup`
const order_api_url   = `${base_api_url}/web/v3/merchants/supply_request`
const product_api_url = `${base_api_url}/web/v3/merchants/supply_items`


export const ONBOARD_API_URL        = onboard_api_url
export const ORDER_SUBMIT_API_URL   = order_api_url
export const ORDER_PRODUCTS_API_URL = product_api_url
