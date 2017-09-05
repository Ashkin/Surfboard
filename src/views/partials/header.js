import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Header extends Component {

  render() {
    return (
      <header className="site">
        <div className="logo"></div>
        <nav>
          <Link to="/venue" className="item">
            <img src="https://cdn4.iconfinder.com/data/icons/shopping-52/24/Gift-Card-128.png" />
            <span>Venue</span>
          </Link>
          <hr/>
          <Link to="/photos" className="item">
            <img src="http://www.freeiconspng.com/uploads/pictures-icon-22.gif" />
            <span>Photos</span>
          </Link>
          <hr/>
          <Link to="/checkout" className="item">
            <img src="https://d30y9cdsu7xlg0.cloudfront.net/png/210124-200.png" />
            <span>Checkout</span>
          </Link>
        </nav>
      </header>
    )
  }

}


export default Header