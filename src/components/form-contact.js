import React, { Component } from "react"
import { Field, reduxForm } from "redux-form"
import { connect }          from "react-redux"
import Paper                from "material-ui/Paper"

import { renderTextField }  from "../helpers/material-ui-redux-form"
import classBuilder         from "../helpers/class-builder"
import { saveContactData }  from "../actions"


class FormContact extends Component {
    render() {
        return (
            <section className={classBuilder("contact", this.props.className)}>
                <Paper className="paper primary" zDepth={2}>
                    <header>
                        <span className="filled-circle">{this.props.step}</span> Contact information
                    </header>
                    <summary>
                        Who will be our main contact for your team?
                    </summary>

                    { this.renderForm() }
                    <img src="https://clickserv.basis.net/conv/a61362412e5197f5" data-purpose="user-tracking" />
                </Paper>
            </section>
        )
    }



    buildTextField(options) {
        const { name, required, multiLine } = options
        let   { label, hint }   = options
        let   { rows, rowsMax } = options

        // Fix the floating label styling for generated MUI <textarea>s
        let floatingLabelStyle = null
        let hintStyle          = null
        if (multiLine) {
            floatingLabelStyle = {width: "100%", left: "0px", textAlign: "left"}
            hintStyle          = {fontSize: "0.65rem", textAlign: "justify"}
        }

        // Set default row values for multiLine
        rows    = rows    || (multiLine ? 2 : undefined)
        rowsMax = rowsMax || undefined

        // Set label and hint
        hint = hint || label
        if (required)
            label += " (required)"


        return (
            <Field
                component={renderTextField}
                name={name}
                multiLine={multiLine}
                rows={rows}
                rowsMax={rowsMax}
                label={label}
                hint={hint}
                floatingLabelStyle={floatingLabelStyle}
                hintStyle={hintStyle}
            />
        )
    }


    renderForm() {
        const { handleSubmit } = this.props  // Magic.  comes from redux-form

        return (
            <form className="venue" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                { this.buildTextField({name:"name",     required:true,  label:"Contact Name"}) }
                { this.buildTextField({name:"position", required:false, label:"Contact Position"}) }
                { this.buildTextField({name:"email",    required:true,  label:"Email Address"}) }
                { this.buildTextField({name:"phone",    required:false, label:"Phone Number"}) }

                <div className="group-title">
                    <strong>Extra Info</strong>
                    <aside>Is there anything more you'd like to tell us?</aside>
                </div>

                { this.buildTextField({name:"notes",
                    multiLine:true,
                    label:"Extra info:",
                    hint:"Enter any other information you would like to share with us about your team or business.",
                })}

                <div className="center">
                    <button type="button" onClick={this.props.prevStep}>Back</button>
                    <button type="submit" className="button">Next</button>
                </div>
            </form>
        )
    }


    handleSubmit(values) {
        this.props.saveContactData(values)
        this.props.nextStep()
    }
}




function validate(values) {
    const errors = {}
    const requiredFields = ["name", "email"]

    requiredFields.forEach((field) => {
        if (!values[field])
            errors[field] = " "  // Displays invalid styles without displaying a message
    })

    return errors
}

function mapStateToProps(state) {
    const contact = state.contact || {}
    const initialValues = contact

    return { contact, initialValues }
}




const formOptions = {
    validate,
    form: "contact",
}

export default connect(
    mapStateToProps, { saveContactData }
)(
    reduxForm(formOptions)(FormContact)
)
