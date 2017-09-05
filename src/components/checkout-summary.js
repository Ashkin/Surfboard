import React, { Component } from 'react'
// redux

class CheckoutSummary extends Component {

  renderItem(desc, cost, className) {
    const classes=`item ${className}`.trim()
    return (
      <div className={classes}>
        <div className="desc">{desc}</div>
        <div className="cost">${cost}</div>
      </div>
    )
  }


  render() {
    return (
      <section className="checkout-summary">
        <header>
          <span className="filled-circle">3</span> Checkout
        </header>
        <summary>
          We will confirm everything with you by email<br/>
          prior to charging your card.
        </summary>


        <dl>
          <dt>Venue</dt>
          <dd>(Not Yet Linked)</dd>

          <dt>Order</dt>
          <dd>
            {this.renderItem("(Not Yet Linked)", "(NYL)")}
            {this.renderItem("Tax", "0")}
            <hr/>
            {this.renderItem("Total", "(NYL)", "total")}
          </dd>
        </dl>

        <button type="submit" className="button-large button-disabled" disabled>Complete Signup!</button>
      </section>
    )
  }
}


export default CheckoutSummary