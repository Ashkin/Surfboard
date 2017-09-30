import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Header extends Component {

  render() {
    return (
      <header className="site">
        <div className="logo"></div>

        <div className="title">
          Merchant Signup
        </div>
      </header>
    )
  }

}


export default Header
