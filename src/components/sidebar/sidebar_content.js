import React, { Component } from 'react'

import {List, ListItem} from 'material-ui/List'

const SidebarContent = ({sidebarHide}) => {
    return (
        <List>
            SidebarContent:
            <ListItem onClick={sidebarHide} primaryText="List Item" />
            <ListItem onClick={sidebarHide} primaryText="List Item 2" />
        </List>
    )
}

export default SidebarContent
