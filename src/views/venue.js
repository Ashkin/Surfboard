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
          value={field.input.value}
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

  renderTOS(field) {
    const { touched, error } = field.meta

    return (
      <fieldset>
        <input type="checkbox" {...field.input} />
        I agree to the <Link to="/tos">Terms of Service</Link>.
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
        <section className="active">
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
            <Field component={this.renderTOS}    name="tos" />
  
            <div className="center">
              <button type="submit" className="button">Next</button>
            </div>
          </form>
        </section>
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
  if (!values.zip)      addError(errors, "zip",     "Please provide a Zip code")
  if (!values.phone)    addError(errors, "phone",   "Please provide a phone number")
  if (!values.email)    addError(errors, "email",   "Please provide an email address")
  if (!values.url)      addError(errors, "url",     "Please provide your website address")

  return errors
}



function mapStateToProps(state) {
  const newState = { initialValues:  state.form.VenueForm.values }

  console.log("[ViewVenue::mapStateToProps]. newState:", newState)
  return newState
}



export default reduxForm({
  validate,
  form: 'VenueForm',
  enableReinitialize: true
})(
  connect(mapStateToProps,{  })(ViewVenue)
)