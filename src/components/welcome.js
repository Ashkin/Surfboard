import React from 'react'
import Paper from 'material-ui/Paper'

const Welcome = ({nextStep}) => {
  return (
    <section className="welcome">
      <Paper className="paper" zDepth={2}>
        <header>Welcome!</header>
        <summary>
          Creating your merchant account will only take a few minutes,
          and you can start selling gift cards online as soon as tomorrow.
        </summary>

        <article>
          <span>Here's what we'll need from you:</span>
          <br/><br/>
          <Paper className="paper item" zDepth={2}>
            <ul><li>
              Your venue's name and address
            </li></ul>
          </Paper>
          <Paper className="paper item" zDepth={2}>
            <ul><li>
              A short one-liner, and a longer venue description
              <aside>
                These will help entice potential customers to choose your venue.  You can update these at any time.
              </aside>
            </li></ul>
          </Paper>
          <Paper className="paper item" zDepth={2}>
            <ul><li>
              Contact name and email for following up
              <aside>This will be our primary contact on your team.</aside>
            </li></ul>
          </Paper>
          <Paper className="paper item" zDepth={2}>
            <ul><li>
              A high-res logo and cover photo for your venue
              <aside>
                Be sure to represent your brand with quality, high-res images.
              </aside>
            </li></ul>
          </Paper>
          <Paper className="paper item" zDepth={2}>
            <ul><li>
              Credit card info
              <aside>We will confirm everything with you via email prior to charging your card.</aside>
            </li></ul>
          </Paper>
        </article>

        Click the button below and let's get started!<br/>

        <button onClick={nextStep}>Begin Signup</button>
      </Paper>
    </section>
  )
}

export default Welcome
