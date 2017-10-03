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
    const { name, required, multiLine } = options
    let   { label, hint }   = options
    let   { rows, rowsMax } = options

    // Set label and hint
    hint = hint || label
    if (required)
      label += " (required)"

    // Fix the floating label styling for generated MUI <textarea>s
    let floatingLabelStyle = null
    let hintStyle          = null
    if (multiLine) {
      floatingLabelStyle = {width: '100%', left: '0px', textAlign: 'left'}
      hintStyle          = {fontSize: '0.8em', textAlign: 'justify'}
    }

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
        hintStyle={hintStyle}
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

        <br/><br/><br/>
        <div className="group-title">
          <strong>Venue Descriptions</strong>
          <aside>Remember, you will be able to change these at any time.</aside>
        </div>

        { this.buildTextField({name:"zinger",
          required:true, multiLine:true,
          label:"One-line description, aka 'Zinger'",
          hint:"(90 characters or less)  American-Vietnamese comfort plates paired with wine & cocktails in a casual, modern space"})
        }
        { this.buildTextField({name:"description",
          required:true, multiLine:true,
          label:"Long description",
          hint:"(500 characters or less)  The owners Cathy & Jon opened this restaurant to honor their mother’s cooking. Since their opening in 2014, they have made the commitment to offering traditional dishes with flavors reminiscent of those you would find in the homes and on the streets of Vietnam. Dedicated to using the freshest ingredients including pasture-raised chickens, cage-free eggs, and the finest cuts of beef, guests will experience distinctly developed fresh and unique Vietnamese flavors.",
          rows:4, rowsMax:6})
        }

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
