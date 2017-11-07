import React, { Component } from "react"
import Paper                from "material-ui/Paper"


class Success extends Component {
    render() {
        return (
            <section className="success">
                <Paper className="paper primary" zDepth={2}>
                    <header>Success!</header>
                    <summary>
                        You've submitted your order.
                    </summary>

                    <p>
                        We will send you an order confirmation within 24 hours, 
                        or reach out with any questions we may have.
                    </p>
                    <br/>
                    <a className="button" href="https://www.itson.me">Back to ItsOnMe</a>
                </Paper>
            </section>
        )
    }
}

export default Success
