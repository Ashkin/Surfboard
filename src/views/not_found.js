import React, { Component } from "react"
import { Link } from "react-router-dom"


// Basic 404 view
//TODO: abstract out markup to its own component, and pass message and status-code

class ViewNotFound extends Component {

    render() {
        return (
            <main className="http-error">
                <div className="wrapper">
                    <div className="side">
                        <h1>Oh no!</h1>
                        <h3>You've found yourself somewhere you're not meant to be.</h3>
                        <aside>(Error 404)</aside>
                        <Link to="/" className="button">Back to safety</Link>
                    </div>
                    <div className="side">
                        <div className="missing-giftcard">???</div>
                    </div>
                </div>
            </main>
        )
    }

}


export default ViewNotFound