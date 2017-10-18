import React, { Component } from "react"
import { Field, reduxForm } from "redux-form"
import { connect }          from "react-redux"
import Paper                from "material-ui/Paper"

import { renderTextField }  from "../helpers/material-ui-redux-form"
import classBuilder         from "../helpers/class-builder"
import { saveContactData }  from "../actions"


class FormContact extends Component {
  render() {
    return (
      <section className={classBuilder("contact", this.props.className)}>
        <Paper className="paper primary" zDepth={2}>
          <header>
            <span className="filled-circle">{this.props.step}</span> Contact information
          </header>
          <summary>
            Who will be our main contact for your team?
          </summary>

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
        { this.buildTextField({name:"name",     required:true,  label:"Contact Name"}) }
        { this.buildTextField({name:"position", required:false, label:"Contact Position"}) }
        { this.buildTextField({name:"email",    required:true,  label:"Email Address"}) }
        { this.buildTextField({name:"phone",    required:false, label:"Phone Number"}) }

        <div className="center">
          <button type="button" onClick={this.props.prevStep}>Back</button>
          <button type="submit" className="button">Next</button>
        </div>
      </form>
    )
  }


  handleSubmit(values) {
    this.props.saveContactData(values)
    this.props.nextStep()
  }
}




function validate(values) {
  const errors = {}
  const requiredFields = ["name", "email"]

  requiredFields.forEach((field) => {
    if (!values[field])
      errors[field] = " "  // Displays invalid styles without displaying a message
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
  form: "contact",
}

export default connect(
  mapStateToProps, { saveContactData }
)(
  reduxForm(formOptions)(FormContact)
)
