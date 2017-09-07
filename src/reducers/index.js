import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'

import plans      from './plans'
import creditcard from './creditcard'
import venue      from './venue'
import contact    from './contact'
import checkout   from './checkout'


const rootReducer = combineReducers({
  form:  reduxFormReducer,
  plans,
  creditcard,
  venue,
  contact,
  checkout,
})


export default rootReducer