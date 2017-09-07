import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import PLANS                from '../config/plans'
import classBuilder         from '../helpers/class-builder'
import { saveCheckoutData } from '../actions'



class CheckoutSummary extends Component {



  renderVenue() {
    const { venue } = this.props


    if (!(venue.name && venue.address && venue.zip)) {
      console.log("[CheckoutSummary::renderVenue]  Rendering error")
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



  renderTOS(field) {
    const { getValue, handleChange, meta: { touched, error }, input: { name } } = field
    const hasError  = (touched && error)
    const className = (hasError ? 'error' : '')

    return (
      <fieldset>
        <input
          type="checkbox"
          className={className}
          {...field.input}
          onChange={event => { handleChange(name, event.target.checked) }}
          value={getValue(name)}
        />
        <span>
          I agree to the <Link to="/tos">Terms of Service</Link>.
        </span>
        <br/>
        <span className="error">
          {hasError ? error : ''}
        </span>
      </fieldset>
    )
  }


  handleChange(name, val) {
    console.log(`[CheckoutSummary::handleChange] Saving checkout data: ${name}=${val}`)
    this.props.saveCheckoutData({[name]: val})
  }

  getCheckoutValue(key) {
    // State isn't populated yet
    if (this.props == null)  return "ohnoes"

    return this.props.checkout[key] || ''
  }

  render() {

    const { venue, contact, plans, creditcard, checkout } = this.props


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

    // Credit card
    if (!creditcard.exp_mo ||
        !creditcard.exp_yr)   errors.creditcard = "Before submitting, you must fill out the creditcard information.  (Missing expiration date)"
    if (!creditcard.cvv)      errors.creditcard = "Before submitting, you must fill out the creditcard information.  (Missing the CVV code)"
    if (!creditcard.number)   errors.creditcard = "Before submitting, you must fill out the creditcard information.  (Missing the creditcard number)"
    if (!creditcard.name)     errors.creditcard = "Before submitting, you must fill out the creditcard information.  (Missing the cardholder name)"


    //TODO: Factor out per-section error message, e.g. "Before submitting, you must fill out the ___ section."
    


    // Pluck out first error message
    const errorMessage = (errors.venue || errors.contact || errors.plans || errors.creditcard)

    let buttonClasses = ['button-large']
    if (!!errorMessage)        buttonClasses.push('hidden')
    if (checkout.tos !== true) buttonClasses.push('button-disabled')
    buttonClasses = buttonClasses.join(' ')


    const { handleSubmit } = this.props  // Magic.  comes from redux-form
    const handleChange     = this.handleChange.bind(this)
    const getCheckoutValue = this.getCheckoutValue.bind(this)


    return (
      <section className={classBuilder("checkout-summary", this.props.className)}>
        <header>
          <span className="filled-circle">3</span> Checkout
        </header>
        <summary>
          We will confirm everything with you by email<br/>
          prior to charging your card.
        </summary>


        <dl>
          {this.renderVenue()}
          {this.renderOrder()}
        </dl>

        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <button type="submit" className={buttonClasses} disabled={!checkout.tos || !!errorMessage}>Complete Signup!</button>
          <Field component={this.renderTOS} name="tos" handleChange={handleChange} getValue={getCheckoutValue} />
        </form>

        <div className={!!errorMessage ? "validation" : "hidden"}>
          <div className="title">Missing info</div>
          {errorMessage}
        </div>
      </section>
    )
  }



  onSubmit(values) {
    console.log("[CheckoutForm] Submitting!")
  }

}


function mapStateToProps(state) {
  return {
    venue:      state.venue,
    contact:    state.contact,
    plans:      state.plans,
    creditcard: state.creditcard,
    checkout:   state.checkout
  }
}

function validate(values) {
  const errors = {}

  if (values.tos !== true) {
    errors.tos = "You must agree to the Terms of Service"
  }

  return errors;
}


export default reduxForm({
  validate,
  form: 'CheckoutForm'
})(
  connect(mapStateToProps,{ saveCheckoutData /* , completeSignup */ })(CheckoutSummary)
)