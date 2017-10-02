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

        <article style={{textAlign: 'left', width: '50%', margin: '0 auto'}}>
          <br/>
          <br/>
          <span>Here's what we'll need from you:</span>
          <br/><br/>
          <Paper className="paper item">
            Your venue's name and address
          </Paper>
          <Paper className="paper item">
            Contact name and email for following up
            <aside>This will be our primary contact on your team.</aside>
          </Paper>
          <Paper className="paper item">
            A high-res logo for your venue
            <aside>
              The logo must be square, and should be between 150px and 1000px on a side.  (Higher-res will always look better)
            </aside>
          </Paper>
          <Paper className="paper item">
            A high-res cover photo (e.g. your front-of-house)
            <aside>
              The cover photo must be rectangular and landscape, and <em>at least</em> 1500px wide by 500px tall.
            </aside>
          </Paper>
          <Paper className="paper item">
            Credit card info
            <aside>We won't bill you until we've confirmed everything with you over email.</aside>
          </Paper>

          <br/>
          <br/>
          <div className="center">
            Click the button below and let's get started!
          </div>
        </article>

        <button onClick={nextStep}>Next</button>
      </Paper>
    </section>
  )
}

export default Welcome
