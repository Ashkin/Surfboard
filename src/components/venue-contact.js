import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect }          from 'react-redux'

import { renderTextField } from '../helpers/material-ui-redux-form'
import classBuilder        from '../helpers/class-builder'
import { saveContactData } from '../actions'


class VenueContact extends Component {

  buildTextField(options) {
    const { name, required, label } = options

    return (
      <Field
        component={renderTextField}
        name={name}
        label={label + (required ? "" : " (optional)")}
        hint={label}
      />
    )
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
          { this.buildTextField({name:"name",     required:true,  label:"Contact Name"}) }
          { this.buildTextField({name:"position", required:false, label:"Contact Position"}) }
          { this.buildTextField({name:"email",    required:true,  label:"Email Address"}) }
          { this.buildTextField({name:"url",      required:false, label:"Website"}) }
          { this.buildTextField({name:"phone",    required:false, label:"Phone Number"}) }
          { this.buildTextField({name:"pos",      required:false, label:"Point-of-Sale System"}) }

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




function validate(values) {
  const errors = {}
  const requiredFields = ['name', 'email']

  requiredFields.forEach((field) => {
    if (!values[field])
      errors[field] = ' '  // Displays invalid styles without displaying a message
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
  form: 'contact',
}

export default connect(
  mapStateToProps, { saveContactData }
)(
  reduxForm(formOptions)(VenueContact)
)
