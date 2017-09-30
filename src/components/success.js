import React, { Component } from 'react'
import Paper                from 'material-ui/Paper'


class Success extends Component {

  render() {

    const { nextStep } = this.props


    return (
      <section className="success">
        <Paper className="paper" zDepth={2}>
          <header>Success!</header>
          <summary>
            Congratulations! You've created a merchant account.
          </summary>

          <p>
            We'll contact you shortly by email and go over the details.
            Once you're happy, well, david and/or zach can fill in the
            rest of this with the proper timelines and verbage.
          </p>
        </Paper>
      </section>
    )
  }
}

export default Success
