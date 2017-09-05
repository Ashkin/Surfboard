import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link }             from 'react-router-dom'
import { connect }          from 'react-redux'

import Plans           from '../components/plans'
import CreditcardForm  from '../components/creditcard-form'
import CheckoutSummary from '../components/checkout-summary'


class ViewCheckout extends Component {
  render() {
    return (
      <main>
        <Plans />
        <CreditcardForm />
        <CheckoutSummary />
      </main>
    )
  }
}


export default ViewCheckout