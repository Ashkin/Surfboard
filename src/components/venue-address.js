import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect }          from 'react-redux'

import { renderTextField } from '../helpers/material-ui-redux-form'
import classBuilder        from '../helpers/class-builder'
import { saveVenueData }   from '../actions'


class VenueAddress extends Component {

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
      <section className={classBuilder("venue-address", this.props.className)}>
        <header>
          <span className="filled-circle">1</span> Venue Address
        </header>
        <summary></summary>
        <form className="venue" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
          { this.buildTextField({name:"name",     required:true,   label:"Venue Name"}) }
          { this.buildTextField({name:"address",  required:true,   label:"Address"}) }
          { this.buildTextField({name:"address2", required:false,  label:"Suite Number"}) }
          { this.buildTextField({name:"city",     required:false,  label:"City"}) }
          { this.buildTextField({name:"state",    required:false,  label:"State"}) }
          { this.buildTextField({name:"zip",      required:true,   label:"Zip"}) }

          <div className="center">
            <button type="submit" className="button">Next</button>
          </div>
        </form>
      </section>
    )
  }


  handleSubmit(values) {
    console.log("[VenueAddress] Submitting!")
    this.props.saveVenueData(values)
    // .then(() => {
    //   this.props.complete()
    // })
  }
}




function validate(values) {
  const errors = {}
  const requiredFields = ['name', 'address', 'zip', 'phone', 'email']

  requiredFields.forEach((field) => {
    if (!values[field])
      errors[field] = ' '  // Displays invalid styles without displaying a message
  })

  return errors
}



function mapStateToProps(state) {
  const venue = state.venue || {}
  const initialValues = venue

  return { venue, initialValues }
}



const formOptions = {
  validate,
  form: 'venue'
}

export default connect(
  mapStateToProps, { saveVenueData }
)(
  reduxForm(formOptions)(VenueAddress)
)
