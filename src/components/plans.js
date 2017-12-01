import React, { Component } from "react"
import { connect } from "react-redux"
import Paper from "material-ui/Paper"

import PLANS          from "../config/plans"
import classBuilder   from "../helpers/class-builder"
import { selectPlan } from "../actions"


class Plans extends Component {

    // selectedPlan

    constructor(props) {
        super(props)

        this.state = {
            plans: {}
        }
    }


    handleClick(id) {
        this.props.selectPlan({selectedPlan: id})
    }


    // Render Button or Selected
    renderPlansButton(plan, planId) {
        if (this.props.plans.selectedPlan == planId) {
            return (
                <div className="selected">
                    <span className="checkmark-box"></span> Selected
                </div>
            )
        }

        return (
            <button
                onClick={() => this.handleClick(planId)}>
                Select Plan
            </button>
        )
    }

    renderPlans() {
        return PLANS.map((plan, planId) => {
            // class list builder
            let planClasses = ["plan"]
            if (plan.recommended) planClasses.push("recommended")
            // mark as selected if the id matches
            planClasses.push(this.props.plans.selectedPlan == planId ? "selected" : "unselected")
            planClasses = planClasses.join(" ")


            return (
                <li className={planClasses} key={planId}>
                    <div className="title">{plan.name}</div>
                    <div className="details">
                        <div className="cost">
                            ${plan.pricePerMonth}<span className="unit">/mo</span>
                        </div>
                        <div className="flavor-text">
                            {plan.flavorText}
                        </div>
                        {this.renderPlansButton(plan, planId)}
                        <div className="recommended">
                            {plan.recommended ? "Recommended" : ""}
                        </div>
                    </div>
                </li>
            )
        })
    }


    renderNextButton() {
        const { selectedPlan } = this.props.plans

        if (selectedPlan == null) {
            return <button className="button-disabled">Next</button>
        }

        return <button onClick={this.props.nextStep}>Next</button>
    }



    render() {
        // The world's first on-demand gift card program with zero financial risk
        return (
            <section className={classBuilder("plans", this.props.className)}>
                <Paper className="paper primary" zDepth={2}>
                    <header>
                        <span className="filled-circle">{this.props.step}</span> Choose a Plan
                    </header>
                    <summary>
                        Pay monthly or yearly?
                    </summary>
                    <ul>
                        { this.renderPlans() }
                    </ul>
                    <div className="center">
                        <button type="button" onClick={this.props.prevStep}>Back</button>
                        { this.renderNextButton() }
                    </div>
                    <img src="https://clickserv.basis.net/conv/5e98c33bdbc7e048" data-purpose="user-tracking" />
                </Paper>
                <Paper className="paper help-text">
                    Need help? Text 310.235.3835 for immediate assistance, or email <a href="mailto:sales@itson.me" target="_blank">sales@itson.me</a>
                </Paper>
            </section>
        )
    }
}


function mapStateToProps(state) {
    return { plans: state.plans }
}


export default connect(mapStateToProps, { selectPlan })(Plans)