import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Header extends Component {

  render() {
    return (
      <header className="site">
        <div className="logo"></div>
        <nav>
          <Link to="/venue" className="item">
            <img src="https://res.cloudinary.com/drinkboard/image/upload/v1505516837/onboard/onboard-icon-Gift-Card-128.png" />
            <span>Venue</span>
          </Link>
          <hr/>
          <Link to="/photos" className="item">
            <img src="https://res.cloudinary.com/drinkboard/image/upload/v1505516837/onboard/onboard-icon-pictures-icon-22.gif" />
            <span>Photos</span>
          </Link>
          <hr/>
          <Link to="/checkout" className="item">
            <img src="https://res.cloudinary.com/drinkboard/image/upload/v1505516837/onboard/onboard-icon-payment-200.png" />
            <span>Checkout</span>
          </Link>
        </nav>
      </header>
    )
  }

}


export default Header
