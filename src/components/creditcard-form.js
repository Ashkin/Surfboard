import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import classBuilder           from '../helpers/class-builder'
import { saveCreditcardData } from '../actions'


class CreditcardForm extends Component {

  renderField(field) {
    const { placeholder, required, handleChange, getValue, input: { name } } = field
    const { touched, error } = field.meta

    const hasError = (touched && error)

    // className builder
    let  classes = [field.className]
    if (hasError) classes.push('error')
    classes = classes.join(" ")


    return (
      <input
        className={classes}
        type={field.type || "text"}
        placeholder={placeholder}
        {...field.input}
        value={getValue(name)}
        onChange={event => { handleChange(name, event.target.value) }}
      />
    )
  }



  handleChange(name, val) {
    this.props.saveCreditcardData({[name]: val})
  }

  onSubmit(values) {
    console.log("[CreditcardForm::onSubmit] Submitting!")
    console.log(" | values:", values)
  }


  getCreditcardValue(key) {
    // State isn't populated yet
    if (this.props == null)  return "ohnoes"

    return this.props.creditcard[key] || ''
  }


  render() {
    const { handleSubmit, submitFailed} = this.props  // Magic.  comes from redux-form

    const errorMessage = (submitFailed ? "Please fill out the missing fields above." : "")
    const handleChange = this.handleChange.bind(this)

    const getCreditcardValue = this.getCreditcardValue.bind(this)


    return (
      <section className={classBuilder("creditcard-form", this.props.className)}>
        <header>
          <span className="filled-circle">2</span> Billing
        </header>
        <summary>
          Credit Card Information
        </summary>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field component={this.renderField}  handleChange={handleChange}  name="name"    getValue={getCreditcardValue}  placeholder="Name on Card"        className="creditcard-name"   />
          <Field component={this.renderField}  handleChange={handleChange}  name="number"  getValue={getCreditcardValue}  placeholder="Credit Card Number"  className="creditcard-number" />
          <Field component={this.renderField}  handleChange={handleChange}  name="cvv"     getValue={getCreditcardValue}  placeholder="CVV"                 className="cvv"               />
          <Field component={this.renderField}  handleChange={handleChange}  name="exp_mo"  getValue={getCreditcardValue}  placeholder="Exp. Month"          className="expiration"        />
          <Field component={this.renderField}  handleChange={handleChange}  name="exp_yr"  getValue={getCreditcardValue}  placeholder="Exp. Year"           className="expiration"        />
          <Field component={this.renderField}  handleChange={handleChange}  name="zip"     getValue={getCreditcardValue}  placeholder="Zip Code"            className="zip"               />

          <br className="clearfix" />

          <div className="error">{errorMessage}</div>
        </form>
      </section>
    )
  }
}


function addError(errors, key, message) {
  errors[key] = { message }
  errors.first_error = errors.first_error || key
}

function validate(values) {
  const errors = {}

  if (!values.name)    addError(errors, "name",    "Please enter the cardholder name")
  if (!values.number)  addError(errors, "number",  "Please enter a card number")
  if (!values.cvv)     addError(errors, "cvv",     "Missing CVV")
  if (!values.exp_mo)  addError(errors, "exp_mo",  "Missing expiration month")
  if (!values.exp_yr)  addError(errors, "exp_yr",  "Missing expiration year")

  return errors
}



function mapStateToProps(state) {
  const creditcard = state.creditcard || {}
  return { creditcard }
}





export default reduxForm({
  validate,
  form: 'CreditcardForm'
})(
  connect(mapStateToProps,{ saveCreditcardData })(CreditcardForm)
)