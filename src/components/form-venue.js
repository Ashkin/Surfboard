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

        <Paper className="paper help-text">
          <p>
            The Zinger text can be anything like "We've got the strongest drinks in town!",
            whereas the long description goes into much greater detail, telling the prospective
            customer what they should expect and why they should choose your venue.
            Good descriptions include the style of cuisine, the ambience, and anything noteworthy
            about your establishment (well-known chef, Michelin stars, etc.).  Be creative and descriptive!
          </p>
          <p>
            Remember, you will be able to change these at any time.
          </p>
        </Paper>
      </section>
    )
  }



  buildTextField(options) {
    const { name, required, multiLine } = options
    let   { label, hint }   = options
    let   { rows, rowsMax } = options
    let floatingLabelStyle = null

    // Set label and hint
    hint = hint || label
    if (required)
      label += " (required)"

    // Fix the floating label styling for generated MUI <textarea>s
    if (multiLine)
      floatingLabelStyle = {width: '100%', left: '0px', textAlign: 'left'}

    // Set default row values for multiLine
    rows    = rows    || (multiLine ? 2 : undefined)
    rowsMax = rowsMax || undefined


    return (
      <Field
        component={renderTextField}
        name={name}
        multiLine={multiLine}
        rows={rows}
        rowsMax={rowsMax}
        label={label}
        hint={hint}
        floatingLabelStyle={floatingLabelStyle}
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
        { this.buildTextField({name:"url",      required:false,  label:"Website"}) }
        { this.buildTextField({name:"pos",      required:false,  label:"Point-of-Sale System"}) }

        { this.buildTextField({name:"zinger",      required:true, multiLine:true, label:"One-line description, aka 'Zinger'", hint:"One-line description, aka 'Zinger' (90 characters or less)"}) }
        { this.buildTextField({name:"description", required:true, multiLine:true, label:"Long description",                   hint:"Long description (500 characters or less)"}) }

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
  const requiredFields = ['name', 'address', 'zip', 'zinger', 'description']

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
