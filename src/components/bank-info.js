import React, { Component } from "react"
import { Field, reduxForm } from "redux-form"
import { connect }          from "react-redux"
import Paper                from "material-ui/Paper"

import { renderTextField } from "../helpers/material-ui-redux-form"
import classBuilder        from "../helpers/class-builder"

import { saveBankInfo }   from "../actions"


class BankInfo extends Component {
    render() {
        return (
            <section className={classBuilder("bank-info", this.props.className)}>
                <Paper className="paper primary" zDepth={2}>
                    <header>
                        <span className="filled-circle">{this.props.step}</span> Bank information
                    </header>
                    <summary>
                        We need this information in order to pay you for your gift card sales.<br/>
                        (You can set this up at a later time by contacting support.)
                    </summary>

                    <br/><br/>
                    { this.renderCheck() }
                    { this.renderForm() }
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
        rows    = rows    || (multiLine ? 3 : undefined)
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


    renderCheck() {
        return (
            <img className="example-check" src="https://res.cloudinary.com/drinkboard/image/upload/v1538553108/onboard/sample-check-routing_h6sr5p.png" />
        )
    }

    renderForm() {
        const { handleSubmit } = this.props  // handleSubmit: Magic. comes from redux-form

        const random_bank_name = () => {
            const banks = ["Wells Fargo", "JPMorgan Chase", "Bank of America",
                           "Morgan Stanley", "Royal Bank of Canada", "Silicon Valley Bank",
                           "Cayman National Bank, ltd."]
            return banks[Math.floor(Math.random() * banks.length)]
        }

        return (
            <form className="bank-info" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                <div className="group-title">
                    <strong>Bank account info</strong>
                    <aside>All of this can be found on your business checks</aside>
                </div>
                { this.buildTextField({name:"bank_name",       required:false,  label:`Bank Name, e.g. ${random_bank_name()}`}) }
                { this.buildTextField({name:"routing_number",  required:false,  label:"Routing Number (usually listed first)"}) }
                { this.buildTextField({name:"account_number",  required:false,  label:"Account Number (usually listed second)"}) }
                { this.buildTextField({name:"account_type",    required:false,  label:"Account type, e.g. 'Checking'"}) }
                <div className="group-title">
                    <strong>Bank address</strong>
                    <aside>
                        We need this for legal reasons, especially when making international payments.<br/>
                        Please enter the bank's full address (street, city, state/province, zip, and country).
                    </aside>
                </div>
                { this.buildTextField({name:"bank_address", required:false,
                    label:"Bank Address",
                    hint:<span>64455 Windy Lake, Suite 16<br/>Colorado Springs, CO&nbsp; 80908<br/>USA</span>,
                    multiLine:true, rows:3, rowsMax:4}) }

                <div className="center">
                    <button type="button" onClick={this.props.prevStep}>Back</button>
                    <button type="submit" className="button">Next</button>
                </div>
            </form>
        )
    }


    handleSubmit(values) {
        this.props.saveBankInfo(values)
        this.props.nextStep()
    }
}


function validate() {}


function mapStateToProps(state) {
    const bank_info = state.bank_info || {}
    const initialValues = bank_info

    return { bank_info, initialValues }
}

const formOptions = {
    validate,
    form: "bank"
}


export default connect(
    mapStateToProps, { saveBankInfo }
)(
    reduxForm(formOptions)(BankInfo)
)
