import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import classBuilder        from '../helpers/class-builder'
import { saveContactData } from '../actions'


class VenueContact extends Component {

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
    console.log("[VenueContact] Submitting!")
  }

  handleChange(name, val) {
    this.props.saveContactData({[name]: val})
  }

  getContactValue(key) {
    // State isn't populated yet
    if (this.props == null)  return "ohnoes"

    return this.props.contact[key] || ''
  }



  render() {
    const { handleSubmit } = this.props  // Magic.  comes from redux-form

    const handleChange    = this.handleChange.bind(this)
    const getContactValue = this.getContactValue.bind(this)

    return (
      <section className={classBuilder("venue-contact", this.props.className)}>
        <header>
          <span className="filled-circle">2</span> Venue Contact Info
        </header>
        <summary></summary>
        <form className="venue" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field component={this.renderField}  name="email"    handleChange={handleChange} getValue={getContactValue} required={true}  placeholder="Email Address" />
          <Field component={this.renderField}  name="url"      handleChange={handleChange} getValue={getContactValue} required={false} placeholder="Website" />
          <Field component={this.renderField}  name="phone"    handleChange={handleChange} getValue={getContactValue} required={false} placeholder="Phone Number" />

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

  if (!values.email)    addError(errors, "email",   "Please provide an email address")

  return errors
}



function mapStateToProps(state) {
  const contact = state.contact || {}
  return { contact }
}





export default reduxForm({
  validate,
  form: 'ContactForm'
})(
  connect(mapStateToProps,{ saveContactData })(VenueContact)
)