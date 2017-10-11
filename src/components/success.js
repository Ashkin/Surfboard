import React, { Component } from "react"
import Paper                from "material-ui/Paper"


class Success extends Component {
  render() {
    return (
      <section className="success">
        <Paper className="paper" zDepth={2}>
          <header>Success!</header>
          <summary>
            Congratulations! You've created an ItsOnMe merchant account.
          </summary>

          <p>
            We will contact you within 24 hours to 
            introduce you to your rep and finalize your account setup.
          </p>
          <br/>
          <a className="button" href="https://www.itson.me">Back to ItsOnMe</a>
        </Paper>
      </section>
    )
  }
}

export default Success
