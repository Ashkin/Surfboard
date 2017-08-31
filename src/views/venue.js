import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


class ViewVenue extends Component {

  renderField(field) {
    const { placeholder, required } = field
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
        />
        <aside className="error">
          {hasError ? error.message : ''}
        </aside>
      </fieldset>
    )
  }


  onSubmit(values) {
    console.log("[ViewVenue] Submitting!")
  }


  render() {
    const { handleSubmit } = this.props  // Magic.  comes from redux-form

    return (
      <main>
        <form className="venue" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field component={this.renderField}  name="name"     required={true}  placeholder="Venue Name" />
          <Field component={this.renderField}  name="address"  required={true}  placeholder="Address" />
          <Field component={this.renderField}  name="address2" required={false} placeholder="Suite Number" />
          <Field component={this.renderField}  name="city"     required={false} placeholder="City" />
          <Field component={this.renderField}  name="state"    required={false} placeholder="State" />
          <Field component={this.renderField}  name="zip"      required={true}  placeholder="Zip" />
          <Field component={this.renderField}  name="phone"    required={true}  placeholder="Phone Number" />
          <Field component={this.renderField}  name="email"    required={true}  placeholder="Email Address" />
          <Field component={this.renderField}  name="url"      required={true}  placeholder="Website" />

          <div className="center">
            <button type="submit" className="button">Next</button>
          </div>
        </form>
      </main>
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
  if (!values.zip)      addError(errors, "zip",     "Please provide a valid Zip code")
  if (!values.phone)    addError(errors, "phone",   "Please provide a valid phone number")
  if (!values.email)    addError(errors, "email",   "Please provide an email address")
  if (!values.url)      addError(errors, "url",     "Please specify your website address")


  // Only display the first error message. (for e.g. a popup bubble)
  // Object.keys(errors).forEach(key => {
  //   if (key == "first_error")  return
  //   if (key != errors.first_error)  errors[key].message = null
  // })


  return errors
}


export default reduxForm({
  validate,
  form: 'VenueForm'
})(
  connect(null,{  })(ViewVenue)
)