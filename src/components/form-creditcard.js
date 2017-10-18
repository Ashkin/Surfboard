import React, { Component } from "react"
import { Field, reduxForm } from "redux-form"
import { connect } from "react-redux"
import Paper from "material-ui/Paper"

import STRIPE_API_KEYS     from "../config/stripe"
import classBuilder        from "../helpers/class-builder"
import { saveStripeToken } from "../actions"



class FormCreditcard extends Component {
  constructor(props) {
    super(props)

    this.stripe = Stripe(STRIPE_API_KEYS.STAGING)
    this.stripe_elements = this.stripe.elements()
    this.stripe_style = {
      base: {
        color: "#20252b",
        lineHeight: "24px",
        fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#92989F"
        }
      },
      invalid: {
        color: "#f32",
        iconColor: "#f32"
      }
    }
  }


  componentDidMount() {
    // User already submitted their card info
    if (this.props.stripe && this.props.stripe.token)
      return

    // Create the Stripe Elements controls
    this.stripe_card = this.stripe_elements.create("card", {style: this.stripe_style})
    this.stripe_card.mount("#card-element")

    // Handle real-time validation errors from the card Element.
    this.stripe_card.addEventListener("change", ({error}) => {
      const displayError = document.getElementById("card-errors")
      displayError.textContent = (error ? error.message : "")
    })
  }


  renderCardInput() {
    if (this.props.stripe.token) {
      return (
        <div id="stripe-success">
          Submitted successfully!
        </div>
      )
    }

    return (
      <div id="card-element-wrapper">
        <div id="card-element"></div>
      </div>
    )
  }


  renderVerifyButton() {
    const { nextStep, stripe: { token } } = this.props

    if (!token) {
      return <button type="submit">Submit to Stripe</button>
    }

    return <button type="button" onClick={nextStep}>Next</button>
  }

  render() {
    const { handleSubmit } = this.props  // Magic.  handleSubmit comes from redux-form

    return (
      <section className={classBuilder("form-creditcard", this.props.className)}>
        <Paper className="paper primary" zDepth={2}>
          <header>
            <span className="filled-circle">{this.props.step}</span> Billing
          </header>
          <summary>
            Credit Card Information<br/>
            (We let Stripe handle this part)
          </summary>

          <form id="stripe-payment-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <div className="stripe-wrapper">
              <label htmlFor="card-element">
                Credit or debit card:
              </label>
              {this.renderCardInput()}
              <div id="card-errors" role="alert"></div>

              <div className="stripe-info">
                Hosted and protected by <a href="https://stripe.com" target="_blank">Stripe, Inc.</a>
              </div>
            </div>
            <aside>
              Credit card information is handled exclusively by Stripe, Inc.<br/>
              ItsOnMe never stores (or even sees) any of this data.
            </aside>

            <div className="center">
              <button type="button" onClick={this.props.prevStep}>Back</button>
              { this.renderVerifyButton() }
            </div>
          </form>
        </Paper>
      </section>
    )
  }


  onSubmit() {
    this.stripe.createToken(this.stripe_card).then(result => {
      if (result.error) {
        return document.getElementById("card-errors").textContent = result.error.message
      }
      this.props.saveStripeToken({token: result.token})
      this.props.nextStep()
    })
  }
}


function mapStateToProps(state) {
  const stripe = state.stripe || {}
  return { stripe }
}


export default reduxForm({
  form: "creditcard"
})(
  connect(mapStateToProps,{ saveStripeToken })(FormCreditcard)
)
