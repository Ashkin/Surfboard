import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import PLANS                from '../config/plans'
import classBuilder         from '../helpers/class-builder'
import { renderCheckbox }   from '../helpers/material-ui-redux-form'
import { saveCheckoutData, merchantSignup } from '../actions'



class CheckoutSummary extends Component {



  renderVenue() {
    const { venue } = this.props


    if (!(venue.name && venue.address && venue.zip)) {
      return (
        <div className="venue">
          <dt>Venue</dt>
          <dd>
            <span className="error">
              Please fill out the venue information
            </span>
          </dd>
        </div>
      )
    }

    console.log("[CheckoutSummary::renderVenue]  Rendering venue")
    return (
      <div className="venue">
        <dt>Venue</dt>
        <dd>
          <span>{venue.name}</span><br/>
          <span>{venue.address}</span><br/>
          <span>{venue.zip}</span>
        </dd>
      </div>
    )
  }


  renderOrder() {
    const { selectedPlan } = this.props.plans


    if (selectedPlan == null) {
      return (
        <div className="order">
          <dt>Order</dt>
          <dd>
            <span className="error">
              Please select a plan
            </span>
          </dd>
        </div>
      )
    }


    const plan = PLANS[selectedPlan]

    let planBillingCycle = ""
    switch(plan.cycleInMonths) {
      case 1:  { planBillingCycle = "Monthly"; break; }
      case 12: { planBillingCycle = "Anually"; break; }
      default: { planBillingCycle = "ohnoes";  break; }
    }
    const planItemName = `ItsOnMe ${plan.name} Membership (Billed ${planBillingCycle})`
    const planItemCost = plan.pricePerMonth * plan.cycleInMonths


    return (
      <div className="order">
        <dt>Order</dt>
        <dd>
          {this.renderItem(planItemName, planItemCost)}
          {this.renderItem("Tax", "0")}
          <hr/>
          {this.renderItem("Total", planItemCost, "total")}
        </dd>
      </div>
    )
  }




  renderItem(desc, cost, className) {
    const classes=`item ${className}`.trim()
    return (
      <div className={classes}>
        <div className="desc">{desc}</div>
        <div className="cost">${cost}</div>
      </div>
    )
  }


  renderSignupStatus() {
    const { signup } = this.props

    // User hasn't submitted yet.
    if (!signup.status)
      return undefined



    if (signup.status == "pending") {
      return (
        <div className="signup-status pending">
          <h3>Awesome!</h3>
          We're signing you up. Give us a sec ~
        </div>
      )
    }

    //TODO: read and react to the status code
    if (signup.status == "failure") {
      return (
        <div className="signup-status error">
          <h3>Oh no!</h3>
          There was an error submitting your information.<br/>
          Please try again in a little while.
        </div>
      )
    }

    if (signup.status == "success") {
      // redirect user to `/success`
    }

  }



  //TODO: cleanup
  render() {
    const { venue, contact, plans, stripe, checkout, signup } = this.props


    //TODO: only display error when clicking [submit]
    let errors = {venue: null, contact: null, plans: null, creditcard: null}

    // Venue
    if (!venue.zip)           errors.venue = "Before submitting, you must fill out the Venue information. (Missing zip code)"
    if (!venue.address)       errors.venue = "Before submitting, you must fill out the Venue information. (Missing address)"
    if (!venue.name)          errors.venue = "Before submitting, you must fill out the Venue information. (Missing venue name)"

    // Contact
    if (!contact.email)       errors.contact = "Before submitting, you must provide an email address.  (Otherwise we are unable to contact you!)"

    // Plans
    if (plans.selectedPlan == null)  errors.plans = "You must select a plan"

    // Stripe (Creditcard)
    if (!stripe.token)        errors.stripe = "Before submitting, you must submit your creditcard info to Stripe."


    //TODO: Factor out per-section error message, e.g. "Before submitting, you must fill out the ___ section."



    // Pluck out first error message
    const errorMessage = (errors.venue || errors.contact || errors.plans || errors.stripe)

    let buttonClasses = ['button-large']
    if (!!errorMessage)        buttonClasses.push('hidden')
    if (checkout.tos !== true) buttonClasses.push('button-disabled')
    if (signup.status == "pending" ) buttonClasses.push('button-disabled')
    buttonClasses = buttonClasses.join(' ')

    let buttonText = "Complete Signup!"
    if (signup.status == "pending")
      buttonText = "Submitting ..."


    const { handleSubmit } = this.props  // Magic.  comes from redux-form

    return (
      <section className={classBuilder("checkout-summary", this.props.className)}>
        <header>
          <span className="filled-circle">6</span> Checkout
        </header>
        <summary>
          We will confirm everything with you by email<br/>
          prior to charging your card.
        </summary>

        <p>
          Welcome, {contact.name || "Anon"}!<br/>
          You're the {contact.position || "big cheese"} at {venue.name || "4chan"}.<br/>
          Good on you!
        </p>


        <dl>
          {this.renderVenue()}
          {this.renderOrder()}
        </dl>

        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
          <Field
            component={renderCheckbox}
            id="checkout-tos"
            name="tos"
            label={
              <label htmlFor="checkout-tos">
                I agree to the <a href="//itson.me/tos" target="_blank">Terms of Service</a>.
              </label>
            }
            labelStyle={{zIndex: 3}}
          />

          <button type="submit" className={buttonClasses} disabled={!checkout.tos || !!errorMessage}>
            { buttonText }
          </button>
        </form>

        <div className={!!errorMessage ? "validation" : "hidden"}>
          <div className="title">Missing info</div>
          {errorMessage}
        </div>

        {this.renderSignupStatus()}
      </section>
    )
  }



  handleSubmit(values) {
    console.log("[CheckoutForm] Submitting!")

    const { venue, contact, photos, plans, stripe, checkout } = this.props

    this.props.merchantSignup({
      venue,
      contact,
      photos,
      plans,
      stripe,
      checkout
    })
  }
}




function mapStateToProps(state) {
  console.log("[CheckoutSummary::mapStateToProps()]")
  console.log(" | state: ", state)

  return {
    venue:      state.venue,
    contact:    state.contact,
    photos:     state.photos,
    plans:      state.plans,
    stripe:     state.stripe,
    checkout:   state.checkout,
    signup:     state.signup
  }
}


function validate(values) {
  const errors = {}

  if (values.tos !== true) {
    errors.tos = "You must agree to the Terms of Service"
  }

  return errors;
}




const formOptions = {
  validate,
  form: 'CheckoutForm'
}

export default connect(
  mapStateToProps, { saveCheckoutData, merchantSignup }
)(
  reduxForm(formOptions)(CheckoutSummary)
)
