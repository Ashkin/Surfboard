import React, { Component } from "react"
import { Link }             from "react-router-dom"
import { Field, reduxForm, formValueSelector } from "redux-form"
import { connect }          from "react-redux"
import Paper                from "material-ui/Paper"

import PLANS                from "../config/plans"
import classBuilder         from "../helpers/class-builder"
import { renderCheckbox }   from "../helpers/material-ui-redux-form"
import { merchantSignup, selectPlan, setPaymentMethod }   from "../actions"


class CheckoutSummary extends Component {

    componentWillMount() {
        const { payment_method, affiliate } = this.props
        let   { selectedPlan }              = this.props.plans

        // Users signing up via (supported) affiliate links are not given the
        // opportunity to select a plan, so select the affiliate's plan for them.
        // NOTE: There *must* be a plan matching the affiliate name if that affiliate does not present the Plans step.
        if (affiliate && selectedPlan == null) {
            PLANS.forEach((_plan, _planId) => {
                if (!_plan.affiliate) return
                if ( _plan.affiliate.toLowerCase() !== affiliate.toLowerCase()) return
                selectedPlan = _planId
            })
            this.props.selectPlan({selectedPlan: selectedPlan})
        }

        // If there is no matching affiliate plan, output an error to the console to aid in debugging.
        // ( Hey you! Go make an affiliate plan! They're in ../config/plans.js )
        if (selectedPlan == null) {
            console.error("[component CheckoutSummary :: componentWillMount]",
                          "Error: No plan found for the affiliate:", affiliate,
                          "\nThe user is unable to continue.")
        }

        // Affiliate signups that are not given a credit card step do not need to pay.
        if (affiliate && payment_method.method == null) {
            // Set their "payment method" to their affiliate's name
            this.props.setPaymentMethod(affiliate)
            // We don't render the payment method section for these merchants
            // so there's no need to set `payment_method` here
        }

    }

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
                    <dt>Business Address</dt>
                    <dd>
                        <span className="error">
                            Please fill out your business information
                        </span>
                    </dd>
                </div>
            )
        }

        return (
            <div className="venue">
                <dt>Business Address</dt>
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



    renderBankInfo() {
        const { bank_name, routing_number, account_number, account_type, bank_address } = this.props.bank_info

        let address = 'Not provided.'

        // Only display the full bank name+address to encourage the user to go back and fill out everything.
        // This will reduce customer support load.
        if (bank_name && bank_address) {

            // Construct full address
            address = [
                bank_name,
                ...(bank_address.split("\n"))
            ].map((item, key) => {
                // Convert \n -> <br/>
                return <span key={key}>{item}<br/></span>
            })
        }

        // Only display the bank info if there's useful info to display.
        if (routing_number && account_number) {
            return (
                <div className="bank-info">
                    <dt>Bank Info</dt>
                    <dd>
                        <ul>
                            <li>
                                <label>Routing number:</label>
                                <span className="bank-number">{routing_number}</span>
                            </li><li>
                                <label>Account number:</label>
                                <span className="bank-number">{account_number}</span>
                                { (account_type
                                    ? <span className="bank-account-type">({account_type})</span>
                                    : null
                                )}
                            </li><li>
                                <label>Bank:</label>
                                <div className="bank-address">{address}</div>
                            </li>
                        </ul>
                    </dd>
                </div>
            )
        }


        return (
            <div className="bank-info">
                <dt>Bank Info</dt>
                <dd>
                    Not provided.
                </dd>
            </div>
        )
    }



    renderOrder() {
        const { selectedPlan } = this.props.plans

        if (selectedPlan == null) {
            return (
                <div className="order">
                    <dt>ItsOnMe Membership Order</dt>
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
        const planItemName = `${plan.name} Membership` + (plan.cycleInMonths ? ` (Billed ${planBillingCycle})` : '')
        const planItemCost = plan.pricePerMonth * plan.cycleInMonths


        return (
            <div className="order">
                <dt>ItsOnMe Membership Order</dt>
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


    renderPayment() {
        const { stripe, payment_method, affiliate } = this.props

        let method = null
        if (payment_method.method == "stripe") {
            method = "by creditcard via Stripe"
        } else if (payment_method.method == "check") {
            method = "by check"
        }

        // Affiliate signups that are not given a creditcard step do not need to pay.  Do not render this section.
        if (affiliate && (payment_method.method == null || payment_method.method == affiliate))  return

        if (method) {
            return (
                <div className="payment">
                    <dt>Payment Method</dt>
                    <dd>
                        You are paying {method}.
                    </dd>
                </div>
            )
        }


        return (
            <div className="payment">
                <dt>Payment Method</dt>
                <dd className="error">
                    You must select a method of payment.
                </dd>
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
        const { affiliate, venue, contact, plans, stripe, payment_method, tos, signup } = this.props


        //TODO: only display error when clicking [submit]
        let errors = {venue: null, contact: null, plans: null, creditcard: null}

        // Venue
        if (!venue.zip)           errors.venue = "Before submitting, you must fill out your Business information. (Missing zip code)"
        if (!venue.address)       errors.venue = "Before submitting, you must fill out your Business information. (Missing address)"
        if (!venue.name)          errors.venue = "Before submitting, you must fill out your Business information. (Missing business name)"

        // Contact
        if (!contact.email)       errors.contact = "Before submitting, you must provide an email address.  (Otherwise we are unable to contact you!)"

        // Plans
        if (plans.selectedPlan == null)  errors.plans = "You must select a plan"

        // Payment method
        if (!payment_method.method || (payment_method.method == "stripe" && !stripe.token))
            errors.payment = "You must either submit your creditcard info to Stripe, or select \"Pay by Check.\""


        //TODO: Factor out per-section error message, e.g. "Before submitting, you must fill out the ___ section."



        // Pluck out first error message
        const errorMessage = (errors.venue || errors.contact || errors.plans || errors.payment)

        let buttonClasses = []
        if (errorMessage)                buttonClasses.push("hidden")
        if (tos !== true)                buttonClasses.push("button-disabled")
        if (signup.status == "pending" ) buttonClasses.push("button-disabled")
        buttonClasses = buttonClasses.join(" ")

        let buttonText = "Complete Signup!"
        if (signup.status == "pending")
            buttonText = "Submitting ..."


        const { handleSubmit } = this.props  // Magic.  comes from redux-form

        let summary_text = "Once you have submitted payment, your customer success rep will contact you."  // Bloody sales people
        if (affiliate && payment_method.method == affiliate) {
            summary_text = "Once you've completed the signup, your customer success rep will contact you."
        }

        return (
            <section className={classBuilder("checkout-summary", this.props.className)}>
                <Paper className="paper primary" zDepth={2}>
                    <header>
                        <span className="filled-circle">{this.props.step}</span> Checkout
                    </header>
                    <summary>
                        {summary_text}
                    </summary>

                    <dl>
                        {this.renderContact()}
                        {this.renderVenue()}
                        {this.renderZinger()}
                        {this.renderDescription()}
                        {this.renderBankInfo()}
                        {this.renderOrder()}
                        {this.renderPayment()}
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
        const { venue, contact, photos, plans, stripe, payment_method, tos } = this.props

        this.props.merchantSignup({
            venue,
            contact,
            photos,
            plans,
            stripe,
            payment_method,
            tos
        })
    }
}




function mapStateToProps(state) {
    const selector = formValueSelector("CheckoutForm")

    return {
        venue:      state.venue,
        contact:    state.contact,
        photos:     state.photos,
        bank_info:  state.bank_info,
        plans:      state.plans,
        stripe:     state.stripe,
        payment_method: state.payment_method,
        tos:        selector(state, "tos"),
        signup:     state.signup
    }
}



const formOptions = {
    form: "CheckoutForm"
}

export default connect(
    mapStateToProps, { merchantSignup, selectPlan, setPaymentMethod }
)(
    reduxForm(formOptions)(CheckoutSummary)
)
