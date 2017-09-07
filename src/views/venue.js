import React, { Component } from 'react'

import VenueAddress  from '../components/venue-address'
import VenueContact  from '../components/venue-contact'


class ViewVenue extends Component {
  render() {
    return (
      <main>
        <VenueAddress className="col-2" />
        <VenueContact className="col-2" />
      </main>
    )
  }
}


export default ViewVenue
