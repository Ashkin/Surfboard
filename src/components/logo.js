import React, { Component } from 'react'


//TODO: include animated logo (prop or second component)

const Logo = ({style}) => {
    //TODO: replace `width:100%` with `height:64px, width:auto`
    style = {
        width: '100%',
        ...style
    }

    return (
        <img
            src="https://res.cloudinary.com/drinkboard/image/upload/v1485211146/email_elements/IOM.logo_white_transbckgrd-300W.png"
            style={style}
            className="logo"
        />
    )
}


export default Logo