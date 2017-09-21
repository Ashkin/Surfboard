import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import ReduxPromise from 'redux-promise'
import { createStore, applyMiddleware } from 'redux'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


import reducers from './reducers'

require('./styles/main.scss')

import Header from './views/partials/header'
import ViewVenue from './views/venue'
import ViewPhotos from './views/photos'
import ViewCheckout from './views/checkout'
import ViewNotFound from './views/not_found'


const createStoreWithMiddleware = applyMiddleware(ReduxPromise, ReduxThunk)(createStore)


ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/"         component={ViewVenue} />
            <Route exact path="/venue"    component={ViewVenue} />
            <Route exact path="/photos"   component={ViewPhotos} />
            <Route exact path="/checkout" component={ViewCheckout} />
            <Route path="*"               component={ViewNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>
  , document.querySelector('#iom-surfboard')
)
