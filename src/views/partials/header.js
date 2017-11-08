// React
import React, { Component } from "react"
import { connect }          from "react-redux"

// MUI components
import AppBar from 'material-ui/AppBar'
import Paper  from 'material-ui/Paper'

// Components
import Logo from '../../components/logo'

// Actions
import { sidebarShow } from '../../actions'


class Header extends Component {
    render() {

        const iconStyleLeft = {}
        if (this.props.disableSidebar == true)
            iconStyleLeft.display = "none"


        return (
            <Paper
                zDepth={2}
                rounded={false}
                style={{position:'relative', zIndex:10}}
            >
                <AppBar
                    onLeftIconButtonTouchTap={this.props.sidebarShow}
                    iconStyleLeft={iconStyleLeft}
                    style={{backgroundColor: '#20252b'}}
                    titleStyle={{display: "none"}}
                    className="site-header"
                >
                    {this.renderTitle()}
                </AppBar>
            </Paper>
        )
    }

    renderTitle() {
        return (
            <div className="site-header-content">
                <Logo />
                <span className="site-header-title">{this.props.header.title || ""}</span>
            </div>
        )
    }

}


function mapStateToProps(state) {
    return { header: state.header }
}

export default connect(mapStateToProps, {sidebarShow})(Header)
