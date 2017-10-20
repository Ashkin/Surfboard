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
    </div>

  </MuiThemeProvider>
  , document.querySelector("#iom-surfboard")
)
