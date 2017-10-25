// React/Redux
import React, { Component } from 'react'
import { connect }          from "react-redux"
// MUI components
import Drawer       from 'material-ui/Drawer'
import RaisedButton from 'material-ui/RaisedButton'
// Local files
import SidebarContent from './sidebar_content'
// Actions
import { sidebarShow, sidebarToggle, sidebarHide, sidebarVisibility } from '../../actions'


class Sidebar extends React.Component {
  render() {
    const {sidebarHide} = this.props

    return (
      <Drawer
        docked={false}
        width={200}
        open={this.props.visible}
        onRequestChange={(state) => this.props.sidebarVisibility(state)}
      >
        <SidebarContent sidebarHide={sidebarHide} />
      </Drawer>
    )
  }
}


function mapStateToProps(state) {
  return {...state.sidebar}
}

export default connect(mapStateToProps, {sidebarShow, sidebarToggle, sidebarHide, sidebarVisibility})(Sidebar)
