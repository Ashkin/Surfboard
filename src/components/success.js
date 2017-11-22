import React, { Component } from "react"
import Paper                from "material-ui/Paper"


class Success extends Component {
    render() {
        return (
            <section className="success">
                <Paper className="paper primary" zDepth={2}>
                    <header>Success!</header>
                    <summary>
                        Congratulations! You've created an ItsOnMe merchant account.
                    </summary>

                    <img src="https://clickserv.basis.net/conv/15674eff606c518c" data-purpose="user-tracking" />
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
