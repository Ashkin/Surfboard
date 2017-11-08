import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Provider } from "react-redux"
import ReduxThunk from "redux-thunk"
import ReduxPromise from "redux-promise"
import { createStore, applyMiddleware } from "redux"
import Cookies from "js-cookie"
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import getMuiTheme from "material-ui/styles/getMuiTheme"


import reducers from "./reducers"

require("./styles/main.scss")

import Header from "./views/partials/header"
import Background from "./views/partials/background"
import Sidebar from './components/sidebar'
import ViewOnboard from "./views/onboard"
import ViewOrdering from "./views/ordering"
import ViewNotFound from "./views/not_found"


const createStoreWithMiddleware = applyMiddleware(ReduxPromise, ReduxThunk)(createStore)

ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Provider store={createStoreWithMiddleware(reducers)}>
            <BrowserRouter>
                <div>
                    <Header disableSidebar={true} />
                    <Background />
                    <Sidebar />
                    <Switch>
                        <Route exact path="/"         component={ViewOrdering} />
                        <Route exact path="/order"    component={ViewOrdering} />
                        <Route path="*"               component={ViewNotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    </MuiThemeProvider>
    , document.querySelector("#iom-surfboard")
)
