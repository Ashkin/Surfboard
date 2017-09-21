import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { TextField } from 'material-ui/TextField'

import { renderTextField } from '../helpers/material-ui-redux-form'
import classBuilder        from '../helpers/class-builder'
import { saveContactData } from '../actions'


class VenueContact extends Component {

  buildTextField(options) {
    const { name, required, label } = options

    // `input_value` is a hack to make `value` work since
    // the `renderTextField` wrapper only ever receives a
    // blank string instead; I'm trying to figure out why
    return (
      <Field
        component={renderTextField}
        name={name}
        className={''}
        hintText={label + (required ? "" : " (optional)")}
        onChange={(event) => this.handleChange(name, event.target.value)}
        input_value={this.getValue(name)}
      />
    )
  }



  //TODO: remove this and rely on redux-form's onChange instead
  //      this will, ofc, require reading values from
  //      `state.form.{formName}.{inputName}` or similar
  handleChange(key, val) {
    if (["name","position"].includes(key))
      console.log(`[VenueContact::handleChange()]  key: ${key}  val: `, val)
    this.props.saveContactData({[key]: val})
  }

  getValue(key) {
    // State isn't populated yet
    if (this.props == null)  return "ohnoes"

    if (["name","position"].includes(key)) {
      console.log(`[VenueContact::getValue(${key})] value: `, this.props.contact[key] || '')
      console.log(" | this.props.contact: ", this.props.contact)
    }


    return this.props.contact[key] || ''
  }



  render() {
    const { handleSubmit } = this.props  // Magic.  comes from redux-form

    return (
      <section className={classBuilder("venue-contact", this.props.className)}>
        <header>
          <span className="filled-circle">2</span> Venue Contact and Info
        </header>
        <summary></summary>
        <form className="venue" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
          { /* What a travesty. */ }
          { this.buildTextField.bind(this, {name:"name",     required:true,  label:"Contact Name"})() }
          { this.buildTextField.bind(this, {name:"position", required:false, label:"Contact Position"})() }
          { this.buildTextField.bind(this, {name:"email",    required:true,  label:"Email Address"})() }
          { this.buildTextField.bind(this, {name:"url",      required:false, label:"Website"})() }
          { this.buildTextField.bind(this, {name:"phone",    required:false, label:"Phone Number"})() }
          { this.buildTextField.bind(this, {name:"pos",      required:false, label:"Point-of-Sale System"})() }

          <div className="center">
            <button type="submit" className="button">Next</button>
          </div>
        </form>
      </section>
    )
  }

  handleSubmit(values) {
    console.log("[VenueContact] Submitting!")
    this.props.saveContactData(values)
    // .then(() => {
    //   this.props.complete()
    // })
  }
}



function addError(errors, key, message) {
  errors[key] = message
  errors.first_error = errors.first_error || key
}

function validate(values) {
  const errors = {}

  if (!values.email)    addError(errors, "email",   "Please provide an email address")

  return errors
}



function mapStateToProps(state) {
  const contact = state.contact || {}

  console.log("[VenueContact] state: ", contact)

  return { contact }
}





export default reduxForm({
  validate,
  form: 'ContactForm'
})(
  connect(mapStateToProps,{ saveContactData })(VenueContact)
)