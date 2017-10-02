import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect }          from 'react-redux'
import Paper                from 'material-ui/Paper'

import { renderTextField } from '../helpers/material-ui-redux-form'
import classBuilder        from '../helpers/class-builder'
import { saveVenueData }   from '../actions'


class FormVenue extends Component {
  render() {
    return (
      <section className={classBuilder("venue", this.props.className)}>
        <Paper className="paper" zDepth={2}>
          <header>
            <span className="filled-circle">{this.props.step}</span> Venue information
          </header>
          <summary></summary>

          { this.renderForm() }
        </Paper>
      </section>
    )
  }



  buildTextField(options) {
    const { name, required, label } = options

    return (
      <Field
        component={renderTextField}
        name={name}
        label={label + (required ? " (required)" : "")}
        hint={label}
      />
    )
  }


  renderForm() {
    const { handleSubmit } = this.props  // Magic.  comes from redux-form

    return (
      <form className="venue" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
        { this.buildTextField({name:"name",     required:true,   label:"Venue Name"}) }
        { this.buildTextField({name:"address",  required:true,   label:"Address"}) }
        { this.buildTextField({name:"address2", required:false,  label:"Suite Number"}) }
        { this.buildTextField({name:"city",     required:false,  label:"City"}) }
        { this.buildTextField({name:"state",    required:false,  label:"State"}) }
        { this.buildTextField({name:"zip",      required:true,   label:"Zip"}) }

        <div className="center">
          <button type="button" onClick={this.props.prevStep}>Back</button>
          <button type="submit" className="button">Next</button>
        </div>
      </form>
    )
  }


  handleSubmit(values) {
    this.props.saveVenueData(values)
    this.props.nextStep()
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
  reduxForm(formOptions)(FormVenue)
)
