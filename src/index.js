import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import ReduxPromise from 'redux-promise'
import { createStore, applyMiddleware } from 'redux'

import reducers from './reducers'

require('./styles/main.scss')

import Header from './views/partials/header'
import ViewVenue from './views/venue'
import ViewPhotos from './views/photos'
import ViewCheckout from './views/checkout'
import ViewNotFound from './views/not_found'


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/"         component={ViewVenue} />
          <Route exact path="/venue"    component={ViewVenue} />
          <Route exact path="/photos"   component={ViewPhotos} />
          <Route exact path="/checkout" component={ViewCheckout} />
          <Route path="*"      component={ViewNotFound} />
        </Switch>
      </div>
    </BrowserRouter> 
  </Provider>
  , document.querySelector('.container')
)
