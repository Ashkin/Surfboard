/* Surfboard API Keys */

/* Heroku config vars exposed as global constants within /webpack.common.js:
 *   NODE_ENV
 *   APPLICATION_KEY
 *   ONBOARDING_TOKEN
 */


// Always use the same QA API endpoint for now
export let ONBOARD_API_URL = "https://qaapi.itson.me/web/v3/merchants/signup"

// if (NODE_ENV == "production")
//   ONBOARD_API_URL = "https://api.itson.me/web/v3/merchants/signup"


