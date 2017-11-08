// React
import React, { Component } from "react"
import { connect }          from "react-redux"
// MUI components
import AppBar from 'material-ui/AppBar'
import Paper  from 'material-ui/Paper'
// Actions
import { sidebarShow } from '../../actions'


class Header extends Component {
    render() {
        return (
            <Paper
                zDepth={2}
                rounded={false}
                style={{position:'relative', zIndex:10}}
            >
                <AppBar
                    title={this.props.header.title || "ItsOnMe"}
                    onLeftIconButtonTouchTap={this.props.sidebarShow}
                    iconStyleLeft={{display: "none"}}
                    style={{backgroundColor: '#20252b'}}
                    className="site-header"
                >
                    <div className="logo"></div>
                </AppBar>
            </Paper>
        )
    }
}


function mapStateToProps(state) {
    return { header: state.header }
}

export default connect(mapStateToProps, {sidebarShow})(Header)
