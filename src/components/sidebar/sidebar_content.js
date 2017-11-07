// React
import React, { Component } from "react"

// History
import { withRouter } from "react-router-dom"

// Mui Components
import {List, ListItem} from "material-ui/List"
import Paper from "material-ui/Paper"
import Divider from "material-ui/Divider"

// Local files
import Logo from "../logo"


class SidebarContent extends Component {
    render() {
        return (
            <List className="sidebar-content">
                <Paper
                    rounded={false}
                    zDepth={2}
                    className="paper"
                >
                    <Logo />
                </Paper>
                <ListItem onClick={this.showOnboard.bind(this)}  primaryText="Merchant Signup" />
                <ListItem onClick={this.showOrdering.bind(this)} primaryText="Ordering" secondaryText="Printers, Marketing items" />
            </List>
        )
    }

    // These must be bound to access history
    showOnboard() {
        this.props.history.push("/onboard")
        this.props.sidebarHide()
    }

    showOrdering() {
        this.props.history.push("/order")
        this.props.sidebarHide()
    }
}


export default withRouter(SidebarContent)
