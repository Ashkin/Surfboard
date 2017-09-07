import React, { Component } from 'react'

import Plans           from '../components/plans'
import CreditcardForm  from '../components/creditcard-form'
import CheckoutSummary from '../components/checkout-summary'


class ViewCheckout extends Component {
  render() {
    return (
      <main>
        <Plans           className="col-3" />
        <CreditcardForm  className="col-3" />
        <CheckoutSummary className="col-3" />
      </main>
    )
  }
}


export default ViewCheckout