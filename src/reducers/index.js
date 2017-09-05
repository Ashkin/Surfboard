import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'

import plans from './plans'


const rootReducer = combineReducers({
  form:  reduxFormReducer,
  plans
})


export default rootReducer