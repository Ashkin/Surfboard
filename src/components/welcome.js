import React, { Component } from 'react'
import Paper                from 'material-ui/Paper'


class Welcome extends Component {

  render() {

    const { nextStep } = this.props


    return (
      <section className="welcome">
        <Paper className="paper" zDepth={2}>
          <header>Welcome!</header>
          <summary>
            We'll get you signed up with a merchant account within a few minutes, <wbr/>
            and selling gift cards shortly thereafter.
          </summary>

          <article style={{textAlign: 'left', width: '50%', margin: '0 auto'}}>
            <br/>
            <br/>
            <p>Sound good?</p>

            Here's what we'll need from you:
            <ul>
              <li>Venue name and address</li>
              <li>Contact name and email (for following up)</li>
              <li>High-res logo</li>
              <li>High-res cover photo (e.g. your front-of-house)</li>
              <li>Creditcard info</li>
            </ul>
            <aside style={{fontSize: '0.85em'}}>(And don't worry: we won't bill you until we've confirmed all of the details over email.)</aside>
            <br/>
            <br/>
            Click the button below and let's get started!
          </article>

          <button onClick={nextStep}>Next</button>
        </Paper>
      </section>
    )
  }
}

export default Welcome
