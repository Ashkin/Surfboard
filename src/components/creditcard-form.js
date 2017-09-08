import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import STRIPE_API_KEYS     from '../config/stripe'
import classBuilder        from '../helpers/class-builder'
import { saveStripeToken } from '../actions'



class CreditcardForm extends Component {
  constructor(props) {
    super(props)

    this.stripe = Stripe(STRIPE_API_KEYS.STAGING)
    this.stripe_elements = this.stripe.elements()
    this.stripe_style = {
      base: {
        color: '#20252b',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#92989F'
        }
      },
      invalid: {
        color: '#f32',
        iconColor: '#f32'
      }
    }
  }


  componentDidMount() {
    this.stripe_card = this.stripe_elements.create('card', {style: this.stripe_style})
    this.stripe_card.mount('#card-element')

    // Handle real-time validation errors from the card Element.
    this.stripe_card.addEventListener('change', ({error}) => {
      const displayError = document.getElementById('card-errors')
      displayError.textContent = (error ? error.message : '')
    })
  }


  renderCardInput() {
    if (this.props.stripe.token) {
      return (
        <div id="stripe-success">
          Successfully received and verified!
        </div>
      )
    }

    return (
      <div id="card-element-wrapper">
        <div id="card-element"></div>
      </div>
    )

  }


  render() {
    const { handleSubmit, submitFailed, stripe: { token }} = this.props  // Magic.  comes from redux-form

    const buttonClasses = (token ? 'button-disabled' : '')


    return (
      <section className={classBuilder("creditcard-form", this.props.className)}>
        <header>
          <span className="filled-circle">2</span> Billing
        </header>
        <summary>
          Creditcard Information
        </summary>

        <form id="stripe-payment-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <label htmlFor="card-element">
            Credit or debit card:
          </label>
          {this.renderCardInput()}
          <div id="card-errors" role="alert"></div>

          <button type="submit" className={buttonClasses} disabled={token ? 'disabled' : ''}>Verify with Stripe</button>

          <div className="stripe-info">
            Hosted and protected by <a href="https://stripe.com" target="_blank">Stripe, Inc.</a>
          </div>
        </form>
        <aside>
          Creditcard information is handled exclusively by Stripe, Inc.<br/>
          ItsOnMe never stores (or even sees) any of this data.
        </aside>
      </section>
    )
  }


  onSubmit(values) {
    this.stripe.createToken(this.stripe_card).then(result => {
      if (result.error) {
        return document.getElementById('card-errors').textContent = result.error.message;
      }
      this.props.saveStripeToken({token: result.token})
    })
  }
}


function mapStateToProps(state) {
  const stripe = state.stripe || {}
  return { stripe }
}


export default reduxForm({
  form: 'CreditcardForm'
})(
  connect(mapStateToProps,{ saveStripeToken })(CreditcardForm)
)