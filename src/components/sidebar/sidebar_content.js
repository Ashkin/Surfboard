//React
import React, { Component } from 'react'

// Mui Components
import {List, ListItem} from 'material-ui/List'
import Paper from 'material-ui/Paper'

// Local files
import Logo from '../logo'


const SidebarContent = ({sidebarHide}) => {
    return (
        <List className="sidebar-content">
            <Paper
                rounded={false}
                zDepth={2}
                className="paper"
            >
                <Logo />
            </Paper>
            <ListItem onClick={sidebarHide} primaryText="List Item" />
            <ListItem onClick={sidebarHide} primaryText="List Item 2" />
        </List>
    )
}

export default SidebarContent
