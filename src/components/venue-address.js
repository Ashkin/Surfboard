import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import classBuilder      from '../helpers/class-builder'
import { saveVenueData } from '../actions'


class VenueAddress extends Component {

  renderField(field) {
    const { placeholder, required, handleChange, getValue, input: { name } } = field
    const { touched, error } = field.meta

    const type = field.type || "text"   // allow checkbox, radio, etc; default to "text"
    const hasError = (touched && error)

    // className builder
    let  classes = []
    if ( hasError) classes.push('error')
    if (!required) classes.push('optional')
    const className = classes.join(" ")


    return (
      <fieldset>
        <input
          className={className}
          type={type}
          placeholder={placeholder + (required ? "" : " (optional)")}
          {...field.input}
          onChange={event => handleChange(name, event.target.value)}
          value={getValue(name)}
        />
        <aside className="error">
          {hasError ? error.message : ''}
        </aside>
      </fieldset>
    )
  }


  onSubmit(values) {
    console.log("[VenueAddress] Submitting!")
  }



  handleChange(name, val) {
    this.props.saveVenueData({[name]: val})
  }




  getVenueValue(key) {
    // State isn't populated yet
    if (this.props == null)  return "ohnoes"

    return this.props.venue[key] || ''
  }



  render() {
    const { handleSubmit } = this.props  // Magic.  comes from redux-form

    const handleChange  = this.handleChange.bind(this)
    const getVenueValue = this.getVenueValue.bind(this)

    return (
      <section className={classBuilder("venue-address", this.props.className)}>
        <header>
          <span className="filled-circle">1</span> Venue Address
        </header>
        <summary></summary>
        <form className="venue" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field component={this.renderField}  name="name"     handleChange={handleChange} getValue={getVenueValue} required={true}  placeholder="Venue Name" />
          <Field component={this.renderField}  name="address"  handleChange={handleChange} getValue={getVenueValue} required={true}  placeholder="Address" />
          <Field component={this.renderField}  name="address2" handleChange={handleChange} getValue={getVenueValue} required={false} placeholder="Suite Number" />
          <Field component={this.renderField}  name="city"     handleChange={handleChange} getValue={getVenueValue} required={false} placeholder="City" />
          <Field component={this.renderField}  name="state"    handleChange={handleChange} getValue={getVenueValue} required={false} placeholder="State" />
          <Field component={this.renderField}  name="zip"      handleChange={handleChange} getValue={getVenueValue} required={true}  placeholder="Zip" />

          <div className="center">
            <button type="submit" className="button">Next</button>
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

  if (!values.name)     addError(errors, "name",    "You must specify the venue name")
  if (!values.address)  addError(errors, "address", "Please provide an address")
  if (!values.zip)      addError(errors, "zip",     "Please provide a Zip code")
  if (!values.phone)    addError(errors, "phone",   "Please provide a phone number")
  if (!values.email)    addError(errors, "email",   "Please provide an email address")
  if (!values.url)      addError(errors, "url",     "Please provide your website address")

  return errors
}



function mapStateToProps(state) {
  const venue = state.venue || {}
  return { venue }
}





export default reduxForm({
  validate,
  form: 'VenueForm'
})(
  connect(mapStateToProps,{ saveVenueData })(VenueAddress)
)