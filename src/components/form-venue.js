import React, { Component } from "react"
import { Field, reduxForm, formValueSelector } from "redux-form"
import { connect }          from "react-redux"
import Paper                from "material-ui/Paper"

import { renderTextField } from "../helpers/material-ui-redux-form"
import classBuilder        from "../helpers/class-builder"
import { saveVenueData }   from "../actions"


class FormVenue extends Component {
    render() {
        return (
            <section className={classBuilder("venue", this.props.className)}>
                <Paper className="paper primary" zDepth={2}>
                    <header>
                        <span className="filled-circle">{this.props.step}</span> Business information
                    </header>
                    <summary></summary>

                    { this.renderForm() }
                    <img src="https://clickserv.basis.net/conv/b237380213f83c06" data-purpose="user-tracking" />
                </Paper>
            </section>
        )
    }



    buildTextField(options) {
        const { name, required, multiLine, maxChars } = options
        let   { label, hint }   = options
        let   { rows, rowsMax } = options

        // Fix the floating label styling for generated MUI <textarea>s
        let floatingLabelStyle = null
        let hintStyle          = null
        if (multiLine) {
            floatingLabelStyle = {width: "100%", left: "0px", textAlign: "left"}
            hintStyle          = {fontSize: "0.65rem", textAlign: "justify"}
        }

        // Handle field length
        let charCount = null
        if (maxChars) {
            // Extract the field's value from redux-form's state
            const fieldValue = this.props.getFieldValue(name) || ""  // undefined -> ''

            charCount = fieldValue.length
            label += ` (chars: ${charCount}/${maxChars})`
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
        const { handleSubmit, golfNow } = this.props  // handleSubmit: Magic. comes from redux-form

        return (
            <form className="venue" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                { this.buildTextField({name:"name",     required:true,   label:"Business Name"}) }
                { this.buildTextField({name:"address",  required:true,   label:"Address"}) }
                { this.buildTextField({name:"address_2",required:false,  label:"Second Address line (Suite Number, etc.)"}) }
                { this.buildTextField({name:"city",     required:true,   label:"City"}) }
                { this.buildTextField({name:"state",    required:true,   label:"State"}) }
                { this.buildTextField({name:"zip",      required:true,   label:"Zip"}) }
                { this.buildTextField({name:"url",      required:false,  label:"Website"}) }
                { (!golfNow ? this.buildTextField({name:"yelp_url",    required:false,  label:"Yelp URL"})          : null) }
                { ( golfNow ? this.buildTextField({name:"golfnow_url", required:false,  label:"Golf Advisor URL"})  : null) }
                { this.buildTextField({name:"pos",      required:false,  label:"Point-of-Sale System"}) }

                <div className="group-title">
                    <strong>Descriptions</strong>
                    <aside>Remember, you will be able to change these at any time.</aside>
                </div>

                { this.buildTextField({name:"zinger",
                    required:true, multiLine:true,
                    label:"One-line description",
                    hint:"(90 characters or less)  American-Vietnamese comfort plates paired with wine & cocktails in a casual, modern space",
                    maxChars:90, rows:3, rowsMax:4,
                })}
                { this.buildTextField({name:"description",
                    required:true, multiLine:true,
                    label:"Long description",
                    hint:"(500 characters or less)  The owners Cathy & Jon opened this restaurant to honor their mother’s cooking. Since their opening in 2014, they have made the commitment to offering traditional dishes with flavors reminiscent of those you would find in the homes and on the streets of Vietnam. Dedicated to using the freshest ingredients including pasture-raised chickens, cage-free eggs, and the finest cuts of beef, guests will experience distinctly developed fresh and unique Vietnamese flavors.",
                    maxChars:500, rows:9, rowsMax:9,
                })}

                <div className="center">
                    {/* <button type="button" onClick={this.props.prevStep}>Back</button> */}
                    <button type="submit" className="button">Next</button>
                </div>
            </form>
        )
    }


    handleSubmit(values) {
        this.props.saveVenueData(values)
        this.props.nextStep()
    }
}




function validate(values) {
    const errors = {}
    const requiredFields = ["name", "address", "city", "state", "zip", "zinger", "description"]
    const maxFieldLengths = {zinger: 90, description: 500}

    requiredFields.forEach((field) => {
        if (!values[field])
            errors[field] = " "  // Displays invalid styles without displaying a message
    })

    Object.keys(maxFieldLengths).forEach((field) => {
        if (!values[field]) return
        if ( values[field].length > maxFieldLengths[field])
            errors[field] = " "  // Displays invalid styles without displaying a message
    })

    return errors
}



function mapStateToProps(state) {
    const venue = state.venue || {}
    const initialValues = venue

    // Allow extracting the values from the state for character counts
    const selector = formValueSelector("venue")
    const getFieldValue = (name) => selector(state, name)

    return { venue, initialValues, getFieldValue }
}



const formOptions = {
    validate,
    form: "venue"
}

export default connect(
    mapStateToProps, { saveVenueData }
)(
    reduxForm(formOptions)(FormVenue)
)
