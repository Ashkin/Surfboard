import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import ReduxPromise from 'redux-promise'
import { createStore, applyMiddleware } from 'redux'

import reducers from './reducers'

require('./styles/main.scss')

import Header from './views/partials/header'
import ViewNotFound from './views/not_found'
import ViewVenue from './views/venue'


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/"      component={ViewVenue} />
          <Route exact path="/venue" component={ViewVenue} />
          <Route path="*"      component={ViewNotFound} />
        </Switch>
      </div>
    </BrowserRouter> 
  </Provider>
  , document.querySelector('.container')
)
