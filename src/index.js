import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Provider } from "react-redux"
import ReduxThunk from "redux-thunk"
import ReduxPromise from "redux-promise"
import { createStore, applyMiddleware } from "redux"
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import getMuiTheme from "material-ui/styles/getMuiTheme"


import reducers from "./reducers"

require("./styles/main.scss")

import Header from "./views/partials/header"
import Background from "./views/partials/background"
import ViewOnboard from "./views/onboard"
import ViewNotFound from "./views/not_found"


const createStoreWithMiddleware = applyMiddleware(ReduxPromise, ReduxThunk)(createStore)


ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <div>
      <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
          <div>
            <Header />
            <Background />
            <Switch>
              <Route exact path="/"         component={ViewOnboard} />
              <Route path="*"               component={ViewNotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>


      <div className="s-row">
        <span className="s-3-narrow">3 narrow</span>
      </div>
      <div className="s-row">
        <span className="s-3-wide">3 wide</span>
      </div>
      <div className="s-row">
        <span className="s-3-wider">3 wider</span>
      </div>



      <div className="s-row">
        <span className="s-1">1</span><span className="s-1">1</span><span className="s-1">1</span><span className="s-1">1</span><span className="s-1">1</span><span className="s-1">1</span><span className="s-1">1</span><span className="s-1">1</span><span className="s-1">1</span><span className="s-1">1</span><span className="s-1">1</span><span className="s-1">1</span>
      </div><div className="s-row">
        <span className="s-2">2</span><span className="s-2">2</span><span className="s-2">2</span><span className="s-2">2</span><span className="s-2">2</span><span className="s-2">2</span>
      </div><div className="s-row">
        <span className="s-3">3</span><span className="s-3">3</span><span className="s-3">3</span><span className="s-3">3</span>
      </div><div className="s-row">
        <span className="s-4">4</span><span className="s-4">4</span><span className="s-4">4</span>
      </div><div className="s-row">
        <span className="s-1">1</span><span className="s-5">5</span><span className="s-5">5</span><span className="s-1">1</span>
      </div><div className="s-row">
        <span className="s-6">6</span><span className="s-6">6</span>
      </div><div className="s-row">
        <span className="s-8">8</span><span className="s-2">2</span><span className="s-2">2</span>
      </div><div className="s-row">
        <span className="s-1">1</span><span className="s-10">10</span><span className="s-1">1</span>
      </div><div className="s-row">
        <span className="s-11">11</span><span className="s-1">1</span>
      </div><div className="s-row">
        <span className="s-12">12</span>
      </div><div className="s-row">
        <span className="s-1">1</span><span className="s-2">2</span><span className="s-3">3</span><span className="s-4">4</span><span className="s-1">1</span><span className="s-1">1</span>
      </div>
    </div>

  </MuiThemeProvider>
  , document.querySelector("#iom-surfboard")
)
