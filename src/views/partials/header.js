// React
import React, { Component } from "react"
import { connect }          from "react-redux"
// MUI components
import AppBar from 'material-ui/AppBar'
// Actions
import { sidebarShow } from '../../actions'


class Header extends Component {
  render() {
    return (
      <AppBar
        title="Merchant Signup"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonTouchTap={this.props.sidebarShow}
        className="site-header"
      >
        <div className="logo"></div>
      </AppBar>
    )
  }
}


export default connect(null, {sidebarShow})(Header)
