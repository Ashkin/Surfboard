import React, { Component } from "react"
import { Link }             from "react-router-dom"
import { Field, reduxForm, formValueSelector } from "redux-form"
import { connect }          from "react-redux"
import Paper                from "material-ui/Paper"

import PLANS                from "../config/plans"
import classBuilder         from "../helpers/class-builder"
import { renderCheckbox }   from "../helpers/material-ui-redux-form"
import { merchantSignup }   from "../actions"



class CheckoutSummary extends Component {

    renderContact() {
        // Ex: Sally (Maître d'hôtel)
        return (
            <div className="contact">
                <dt>Primary Contact</dt>
                <dd>
                    <ul>
                        <li>
                            <label>Name:</label>
                            <span className="name">{this.props.contact.name}
                            </span><span className="position">{this.props.contact.position ? ` (${this.props.contact.position})` : ""}</span>
                        </li><li>
                            <label>Email:</label>
                            <span className="email">{this.props.contact.email}</span>
                        </li><li>
                            <label>Phone:</label>
                            <span className="phone">{this.props.contact.phone}</span>
                        </li>
                    </ul>
                </dd>
            </div>
        )
    }



    renderVenue() {
        const { venue } = this.props


        if (!(venue.name && venue.address && venue.zip)) {
            return (
                <div className="venue">
                    <dt>Venue Address</dt>
                    <dd>
                        <span className="error">
                            Please fill out the venue information
                        </span>
                    </dd>
                </div>
            )
        }

        return (
            <div className="venue">
                <dt>Venue Address</dt>
                <dd>
                    <span>{venue.name}</span><br/>
                    <span>{venue.address}</span><br/>
                    <span>{venue.city}, {venue.state} &nbsp;{venue.zip}</span>
                </dd>
            </div>
        )
    }



    renderZinger() {
        return (
            <div className="zinger">
                <dt>Description (short)</dt>
                <dd>
                    <span>{this.props.venue.zinger}</span>
                </dd>
            </div>
        )
    }



    renderDescription() {
        return (
            <div className="description">
                <dt>Description (full)</dt>
                <dd>
                    <span>{this.props.venue.description}</span>
                </dd>
            </div>
        )
    }



    renderOrder() {
        const { selectedPlan } = this.props.plans


        if (selectedPlan == null) {
            return (
                <div className="order">
                    <dt>ItsOnMe Order</dt>
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
        case 1:  { planBillingCycle = "Monthly"; break }
        case 12: { planBillingCycle = "Anually"; break }
        default: { planBillingCycle = "ohnoes";  break }
        }
        const planItemName = `ItsOnMe ${plan.name} Membership (Billed ${planBillingCycle})`
        const planItemCost = plan.pricePerMonth * plan.cycleInMonths


        return (
            <div className="order">
                <dt>ItsOnMe Order</dt>
                <dd>
                    {this.renderItem(planItemName, planItemCost)}
                    <hr/>
                    {this.renderItem("Total", planItemCost, "total")}
                </dd>
            </div>
        )
    }




    renderItem(desc, cost, className="") {
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
                    <h2>Oh no!</h2>
                    There was an error submitting your information.<br/>
                    <br/>
                    Please try again in 5-10 minutes.<br/>
                    (Do not refresh the page or you will lose your data.)<br/>
                    <br/>
                    You may also contact support here:<br/>
                    Text <span className="tel">310.235.3835</span> for immediate assistance, or email <a href="mailto:sales@itson.me" target="_blank">sales@itson.me</a>.
                </div>
            )
        }

        if (signup.status == "success") {
            this.props.nextStep()
        }

    }



    //TODO: cleanup
    render() {
        const { venue, contact, plans, stripe, tos, signup } = this.props


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

        let buttonClasses = []
        if (errorMessage)                buttonClasses.push("hidden")
        if (tos !== true)                buttonClasses.push("button-disabled")
        if (signup.status == "pending" ) buttonClasses.push("button-disabled")
        buttonClasses = buttonClasses.join(" ")

        let buttonText = "Complete Signup!"
        if (signup.status == "pending")
            buttonText = "Submitting ..."


        const { handleSubmit } = this.props  // Magic.  comes from redux-form

        return (
            <section className={classBuilder("checkout-summary", this.props.className)}>
                <Paper className="paper primary" zDepth={2}>
                    <header>
                        <span className="filled-circle">{this.props.step}</span> Checkout
                    </header>
                    <summary>
                        Once you have submitted payment, your customer success rep will contact you.
                    </summary>

                    <dl>
                        {this.renderContact()}
                        {this.renderVenue()}
                        {this.renderZinger()}
                        {this.renderDescription()}
                        {this.renderOrder()}
                    </dl>


                    <div className="center">
                        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                            <div className="center">
                                <button type="button" onClick={this.props.prevStep}>Back</button>
                                <button type="submit" className={buttonClasses} disabled={!tos || !!errorMessage}>
                                    { buttonText }
                                </button>
                            </div>

                            <Field
                                component={renderCheckbox}
                                id="checkout-tos"
                                name="tos"
                                className="tos"
                                label={
                                    <label htmlFor="checkout-tos">
                                        I agree to the <a href="//itson.me/tos" target="_blank">Terms of Service</a>.
                                    </label>
                                }
                                labelStyle={{zIndex: 3, textAlign: "left"}}
                            />
                        </form>
                    </div>

                    <div className={errorMessage ? "validation" : "hidden"}>
                        <div className="title">Missing info</div>
                        {errorMessage}
                        <img src="https://clickserv.basis.net/conv/dcd065f088995e09" data-purpose="user-tracking for-submission-errors" />
                    </div>

                    {this.renderSignupStatus()}
                </Paper>
            </section>
        )
    }


    handleSubmit() {
        const { venue, hours, contact, photos, plans, stripe, tos } = this.props

        this.props.merchantSignup({
            venue,
            hours,
            contact,
            photos,
            plans,
            stripe,
            tos
        })
    }
}




function mapStateToProps(state) {
    const selector = formValueSelector("CheckoutForm")

    return {
        venue:      state.venue,
        hours:      state.hours,
        contact:    state.contact,
        photos:     state.photos,
        plans:      state.plans,
        stripe:     state.stripe,
        tos:        selector(state, "tos"),
        signup:     state.signup
    }
}



const formOptions = {
    form: "CheckoutForm"
}

export default connect(
    mapStateToProps, { merchantSignup }
)(
    reduxForm(formOptions)(CheckoutSummary)
)
