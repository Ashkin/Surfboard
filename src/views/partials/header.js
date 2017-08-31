import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Header extends Component {

  render() {
    return (
      <header>
        <div className="logo">
          ItsOnMe
        </div>
        <nav>
          <Link to="/venue" className="item">
            <img src="nav-icon-venue.png" />
            <span>Venue</span>
          </Link>
          <Link to="/photos" className="item">
            <img src="nav-icon-photos.png" />
            <span>Photos</span>
          </Link>
          <Link to="/checkout" className="item">
            <img src="nav-icon-checkout.png" />
            <span>Checkout</span>
          </Link>
        </nav>
      </header>
    )
  }

}


export default Header