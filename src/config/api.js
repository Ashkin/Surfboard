/* Surfboard API Keys */

/* Heroku config vars exposed as global constants within /webpack.common.js:
 *   NODE_ENV
 *   APPLICATION_KEY
 *   ONBOARDING_TOKEN
 */


let api_url = null

// eslint-disable-next-line no-undef
switch(NODE_ENV.toLowerCase()) {
case "development":
case "staging":
  api_url = "https://qaapi.itson.me/web/v3/merchants/signup"
  break
case "production":
  api_url = "https://api.itson.me/web/v3/merchants/signup"
  break
default:
  // eslint-disable-next-line no-undef
  throw new Error(`[API init] Unknown NODE_ENV: ${NODE_ENV}`)
}

// Apparently I can't export existing vars today
// so I'll just re-declare it here. whatever.
export const ONBOARD_API_URL = api_url
