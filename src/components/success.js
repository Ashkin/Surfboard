import React, { Component } from 'react'
import Paper                from 'material-ui/Paper'


class Success extends Component {
  render() {
    return (
      <section className="success">
        <Paper className="paper" zDepth={2}>
          <header>Success!</header>
          <summary>
            Congratulations! You've created a merchant account.
          </summary>

          <p>
            We'll contact you by email within 24 hours
            to go over the details and complete your account setup.
          </p>
        </Paper>
      </section>
    )
  }
}

export default Success
