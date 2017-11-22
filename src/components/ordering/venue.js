// React + Redux
import React, { Component } from "react"
import { Field, reduxForm } from "redux-form"
import { connect }          from "react-redux"

// Mui
import Paper                from "material-ui/Paper"
import Divider              from "material-ui/Divider"
import Subheader            from 'material-ui/Subheader'

// Components
import Cart                 from "./cart"

// Helpers
import { renderTextField }  from "../../helpers/material-ui-redux-form"
import classBuilder         from "../../helpers/class-builder"

// Actions
import { order }            from "../../actions"


class Venue extends Component {
    render() {
        return (
            <section className={classBuilder("venue", this.props.className)}>
                <Paper className="paper primary" zDepth={2}>
                    <header>
                        <span className="filled-circle">{this.props.step}</span> Venue and Contact Information
                    </header>
                    { this.renderForm() }
                </Paper>
            </section>
        )
    }



    buildTextField(options) {
        const { name, required } = options
        let   { label, hint }   = options

        // Set label and hint
        hint = hint || label
        if (!required)
            label += " (optional)"


        return (
            <Field
                component={renderTextField}
                name={name}
                label={label}
                hint={hint}
            />
        )
    }



    renderForm() {
        const { handleSubmit } = this.props  // Magic.  comes from redux-form

        return (
            <form className="venue" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                <div className="group-title">
                    <strong>Venue information</strong>
                </div>

                { this.buildTextField({name:"venue_name",      required:true,   label:"Venue Name"}) }
                { this.buildTextField({name:"venue_address",   required:true,   label:"Address"}) }
                { this.buildTextField({name:"venue_address_2", required:false,  label:"Second Address line (Suite Number, etc.)"}) }
                { this.buildTextField({name:"venue_city",      required:true,   label:"City"}) }
                { this.buildTextField({name:"venue_state",     required:true,   label:"State"}) }
                { this.buildTextField({name:"venue_zip",       required:true,   label:"Zip"}) }
                { this.buildTextField({name:"venue_url",       required:false,  label:"Website"}) }

                <div className="group-title">
                    <strong>Contact Information</strong>
                    <aside>This will be our primary contact for your team.</aside>
                </div>
                { this.buildTextField({name:"contact_name",     required:true,   label:"Contact Name"}) }
                { this.buildTextField({name:"contact_position", required:false,  label:"Contact Position"}) }
                { this.buildTextField({name:"contact_email",    required:true,   label:"Email Address"}) }
                { this.buildTextField({name:"contact_phone",    required:false,  label:"Phone Number"}) }

                <div className="center">
                    <button type="button" className="button" onClick={this.props.prevStep}>Back</button>
                    <button type="submit" className="button">Next</button>
                </div>
            </form>
        )
    }


    handleSubmit(values) {
        this.props.saveVenue(values)
        this.props.nextStep()
    }
}




function validate(values) {
    const errors = {}
    const requiredFields = ["venue_name", "venue_address", "venue_city",
                            "venue_state", "venue_zip", "contact_name", "contact_email"]

    requiredFields.forEach((field) => {
        if (!values[field])
            errors[field] = " "  // Displays invalid styles without displaying a message
    })
    return errors
}



function mapStateToProps(state) {
    const venue   = state.order_venue   || {}
    const product = state.order_product || {}
    const initialValues = venue

    return window.newState = { venue, product, initialValues }
}

const formOptions = {validate, form: "order-venue"}


export default connect(
    mapStateToProps, { saveVenue: order.saveVenue }
)(
    reduxForm(formOptions)(Venue)
)
