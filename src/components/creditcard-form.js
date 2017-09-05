import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


class CreditcardForm extends Component {

  renderField(field) {
    const { placeholder, required, handleChange, input: { name } } = field
    const { touched, error } = field.meta

    const hasError = (touched && error)

    console.log("[CreditcardForm::renderField]  handleChange: ", handleChange)

    // className builder
    let  classes = [field.className]
    if (hasError) classes.push('error')
    classes = classes.join(" ")

    return (
      <input
        className={classes}
        type={field.type || "text"}
        placeholder={placeholder}
        onChange={event => { handleChange(name, event.target.value) }}
        {...field.input}
      />
    )
  }



  handleChange(name, newVal) {
    console.log("[CreditcardForm::handleChange]")
    console.log(" | name:   ", name)
    console.log(" | newVal: ", newVal)
  }

  onSubmit(values) {
    console.log("[CreditcardForm::onSubmit] Submitting!")
    console.log(" | values:", values)
  }



  render() {
    const { handleSubmit, submitFailed} = this.props  // Magic.  comes from redux-form

    const errorMessage = (submitFailed ? "Please fill out the missing fields above." : "")
    const handleChange = this.handleChange.bind(this)


    return (
      <section className="creditcard-form">
        <header>
          <span className="filled-circle">2</span> Billing
        </header>
        <summary>
          Credit Card Information
        </summary>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field component={this.renderField}  handleChange={handleChange}  name="name"        placeholder="Name on Card"        className="creditcard-name"   />
          <Field component={this.renderField}  handleChange={handleChange}  name="cardnumber"  placeholder="Credit Card Number"  className="creditcard-number" />
          <Field component={this.renderField}  handleChange={handleChange}  name="cvv"         placeholder="CVV"                 className="cvv"               />
          <Field component={this.renderField}  handleChange={handleChange}  name="exp_mo"      placeholder="Exp. Month"          className="expiration"        />
          <Field component={this.renderField}  handleChange={handleChange}  name="exp_yr"      placeholder="Exp. Year"           className="expiration"        />
          <Field component={this.renderField}  handleChange={handleChange}  name="zip"         placeholder="Zip Code"            className="zip"               />

          <br className="clearfix" />

          <div className="error">{errorMessage}</div>

          <div className="center">
            <button type="submit" className="button">Test Submit</button>
          </div>

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

  if (!values.name)       addError(errors, "name",       "Please enter the cardholder name")
  if (!values.cardnumber) addError(errors, "cardnumber", "Please enter a card number")
  if (!values.cvv)        addError(errors, "cvv",        "Missing CVV")
  if (!values.exp_mo)     addError(errors, "exp_mo",     "Missing expiration month")
  if (!values.exp_yr)     addError(errors, "exp_yr",     "Missing expiration year")


  return errors
}



function mapStateToProps(state) {
  const newState = { initialValues:  state.form.CreditcardForm.values }

  console.log("[CreditcardForm::mapStateToProps]  newState:", newState)
  return newState
}





export default reduxForm({
  validate,
  form: 'CreditcardForm'
})(
  connect(mapStateToProps,{  })(CreditcardForm)
)