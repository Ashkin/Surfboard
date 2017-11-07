// React + Redux
import React, { Component } from "react"
import { Field, reduxForm, formValueSelector } from "redux-form"
import { connect } from "react-redux"

// Mui
import Paper                from "material-ui/Paper"

// Components
import Cart from "./cart"

// Helpers
import classBuilder         from "../../helpers/class-builder"
import { renderCheckbox }   from "../../helpers/material-ui-redux-form"

// Actions
import { order }            from "../../actions"
const { submitOrder } = order



class Checkout extends Component {

    renderContact() {
        const { contact_name, contact_position, contact_email, contact_phone } = this.props.venue

        // Ex: Sally (Maître d'hôtel)
        return (
            <div className="contact">
                <dt>Primary Contact</dt>
                <dd>
                    <ul>
                        <li>
                            <label>Name:</label>
                            <span className="name">{contact_name}</span>
                            <span className="position">{contact_position ? ` (${contact_position})` : ""}</span>
                        </li><li>
                            <label>Email:</label>
                            <span className="email">{contact_email}</span>
                        </li><li>
                            <label>Phone:</label>
                            <span className="phone">{contact_phone || "n/a"}</span>
                        </li>
                    </ul>
                </dd>
            </div>
        )
    }



    renderVenue() {
        const { venue_name, venue_address, venue_city, venue_state, venue_zip } = this.props.venue


        if (!(venue_name && venue_address && venue_zip)) {
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
                    <span>{venue_name}</span><br/>
                    <span>{venue_address}</span><br/>
                    <span>{venue_city}, {venue_state} &nbsp;{venue_zip}</span>
                </dd>
            </div>
        )
    }


    renderCart() {
        return (
            <div className="cart">
                <dt>Your Cart</dt>
                <dd>
                    <Cart />
                </dd>
            </div>
        )
    }


    renderStatus() {
        const { status } = this.props.submit_status

        // User hasn't submitted yet.
        if (status == null) {
            return null
        }


        if (status == "pending") {
            return (
                <div className="signup-status pending">
                    <h3>Awesome!</h3>
                    We're submitting your order. Give us a sec ~
                </div>
            )
        }

        //TODO: read and react to the status code
        if (status == "failure") {
            return (
                <div className="signup-status error">
                    <h2>Oh no!</h2>
                    There was an error submitting your order.  (Don't worry, your card has not been charged.)<br/>
                    <br/>
                    Please try again in 5-10 minutes.<br/>
                    (Do not refresh the page or you will lose your data.)<br/>
                    <br/>
                    You may also contact support here:<br/>
                    Text <span className="tel">310.235.3835</span> for immediate assistance, or email <a href="mailto:sales@itson.me" target="_blank">sales@itson.me</a>.
                </div>
            )
        }

        if (status == "success") {
            // This does not work in componentWillMount() or componentDidMount()
            this.props.nextStep()
        }

    }



    //TODO: cleanup
    render() {
        const { venue, products, stripe, submit_status: { status } } = this.props

        const cartIsEmpty = (Object.keys(products).length == 0)


        //TODO: only display error when clicking [submit]
        let errors = {venue: null, contact: null, cart: null, stripe: null}

        // Venue
        if (!venue.venue_zip)     errors.venue = "Before submitting, you must fill out the Venue information. (Missing zip code)"
        if (!venue.venue_address) errors.venue = "Before submitting, you must fill out the Venue information. (Missing address)"
        if (!venue.venue_name)    errors.venue = "Before submitting, you must fill out the Venue information. (Missing venue name)"

        // Contact
        if (!venue.contact_name)  errors.contact = "Before submitting, you must provide a contact name."
        if (!venue.contact_email) errors.contact = "Before submitting, you must provide an email address.  (Otherwise we are unable to contact you!)"

        // Plans
        if (cartIsEmpty)          errors.cart = "Your cart is empty!"

        // Stripe (Creditcard)
        if (!stripe.token)        errors.stripe = "Before submitting, you must submit your creditcard info to Stripe."


        //TODO: Factor out per-section error message, e.g. "Before submitting, you must fill out the ___ section."



        // Pluck out first error message
        const errorMessage = (errors.venue || errors.contact || errors.cart || errors.stripe)

        let buttonClasses = []
        if (errorMessage)         buttonClasses.push("hidden")
        if (status == "pending")  buttonClasses.push("button-disabled")
        buttonClasses = buttonClasses.join(" ")

        let buttonText = "Submit Order"
        if (status == "pending")
            buttonText = "Submitting ..."


        const { handleSubmit } = this.props  // Magic.  comes from redux-form

        return (
            <section className={classBuilder("checkout", this.props.className)}>
                <Paper className="paper primary" zDepth={2}>
                    <header>
                        <span className="filled-circle">{this.props.step}</span> Checkout
                    </header>
                    <summary>
                        Once you have submitted your order, your customer success rep will contact you.
                    </summary>

                    <dl>
                        {this.renderContact()}
                        {this.renderVenue()}
                        {this.renderCart()}
                    </dl>


                    <div className="center">
                        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                            <div className="center">
                                <button type="button" onClick={this.props.prevStep}>Back</button>
                                <button type="submit" className={buttonClasses} disabled={!!errorMessage}>
                                    { buttonText }
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className={errorMessage ? "validation" : "hidden"}>
                        <div className="title">Missing info</div>
                        {errorMessage}
                    </div>

                    {this.renderStatus()}
                </Paper>
            </section>
        )
    }


    handleSubmit() {
        const { cart, venue, stripe } = this.props

        this.props.submitOrder({
            cart,
            venue,
            stripe,
        })
    }
}




function mapStateToProps(state) {
    const selector = formValueSelector("OrderCheckout")

    return {
        venue:         state.order_venue,
        cart:          state.order_cart,
        products:      state.order_cart.products || {},
        stripe:        state.order_billing,
        submit_status: state.order_submit_status
    }
}



const formOptions = {
    form: "OrderCheckout"
}

export default connect(
    mapStateToProps, { submitOrder }
)(
    reduxForm(formOptions)(Checkout)
)
