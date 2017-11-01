import React, { Component } from "react"
import { Field, reduxForm } from "redux-form"
import { connect }          from "react-redux"
import Paper                from "material-ui/Paper"

import Hours                from "./hours"
import classBuilder         from "../helpers/class-builder"
import { saveHoursData }    from "../actions"


class FormHours extends Component {
  render() {
    return (
      <section className={classBuilder("hours", this.props.className)}>
        <Paper className="paper" zDepth={2}>
          <header>
            <span className="filled-circle">{this.props.step}</span> Venue Hours
          </header>
          <summary>
            When are you open?  (Optional)
          </summary>

          { this.renderForm() }
          <img src="https://clickserv.basis.net/conv/b66a72cc453b58e9" data-purpose="user-tracking" />
        </Paper>
      </section>
    )
  }



  renderForm() {
    const { handleSubmit } = this.props  // Magic.  comes from redux-form

    return (
      <form className="venue" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
        <Hours className="hours-entry" />

        <div className="center">
          <button type="button" onClick={this.props.prevStep}>Back</button>
          <button type="submit" className="button">Next</button>
        </div>
      </form>
    )
  }


  handleSubmit(values) {
    this.props.saveHoursData(values)
    this.props.nextStep()
  }
}



function mapStateToProps(state) {
  const hours = state.hours || {}
  const initialValues = hours

  return { hours, initialValues }
}


const formOptions = {
  form: "hours",
}

export default connect(
  mapStateToProps, { saveHoursData }
)(
  reduxForm(formOptions)(FormHours)
)
