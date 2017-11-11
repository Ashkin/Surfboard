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
                        {renderRoutes()}
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    </MuiThemeProvider>
    , document.querySelector("#iom-surfboard")
)


function renderRoutes() {
    const paths = {}

    // Add allowed routes per domain
    switch(Cookies.get('host')) {
    case "order.itson.me":
        paths['/']      = ViewOrdering
        paths['/order'] = ViewOrdering
        break

    case "onboard.itson.me":
        paths['/']        = ViewOnboard
        paths['/onboard'] = ViewOnboard
        break

    case "localhost":
        // For development
        paths['/onboard'] = ViewOnboard
        paths['/order']   = ViewOrdering
        break

    default:
        console.error("Unknown domain: ", Cookies.get('host'))
    }

    // Construct the routes
    const routes = Object.keys(paths).map((path) => {
        return <Route exact path={path} component={paths[path]} key={path} />
    })

    // Add the 404 route
    routes.push(
        <Route path="*" component={ViewNotFound} key="*" />
    )


    return routes
}
