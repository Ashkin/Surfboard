import React, { Component } from 'react'
import { connect } from 'react-redux'

import { selectPlan } from '../actions'


class Plans extends Component {

  // selectedPlan

  constructor(props) {
    super(props)


    //TODO: Add action to create a new plan, or set these as the default state in the reducer
    this.planChoices = [{
      id:            0,
      name:          "Standard",
      pricePerMonth: 100,
      flavorText:    "paid monthly",
      recommended:   false,
    }, {
      id:            1,
      name:          "Prime",
      pricePerMonth: 84,
      flavorText:    "when paid annually",
      recommended:   true,
    }]

    this.state = {
      plans: {}
    }
  }


  handleClick(id) {
    console.log("User clicked a plan.  this:", this)
    this.props.selectPlan(id)
  }


  // Render Button or Selected
  renderPlansButton(plan) {
    if (this.props.plans.selectedPlan == plan.id) {
      return (
        <div className="selected">
          <span className="checkmark-box"></span> Selected
        </div>
      )
    }

    return (
      <button
        className={plan.recommended ? "" : "button-dark-silver"}
        onClick={() => this.handleClick(plan.id)}>
        Choose Plan
      </button>
    )
  }

  renderPlans() {
    return this.planChoices.map(plan => {
      // class list builder
      let planClasses = ["plan"]
      if (plan.recommended)
        planClasses.push("recommended")
      if (this.props.plans.selectedPlan == plan.id)
        planClasses.push("selected")
      else {
        console.log("Comparing selectedPlan", this.props.plans.selectedPlan, "to plan.id", plan.id)
        planClasses.push("unselected")
      }
      planClasses = planClasses.join(" ")

      return (
        <li className={planClasses} key={plan.id}>
          <div className="title">{plan.name}</div>
          <div className="details">
            <div className="cost">
              ${plan.pricePerMonth}<span className="unit">/mo</span>
            </div>
            <div className="flavor-text">
              {plan.flavorText}
            </div>
            {this.renderPlansButton(plan)}
            <div className="recommended">
              {plan.recommended ? "Recommended" : ""}
            </div>
          </div>
        </li>
      )
    })
  }


  render() {
    console.log("[Plans component]::render()  props:", this.props)

    return (
      <section className="plans">
        <header>
          <span className="filled-circle">1</span> Pick a Plan
        </header>
        <summary>
          The world's first on-demand gift card program with zero financial risk
        </summary>
        <ul>
          { this.renderPlans() }
        </ul>
      </section>
    )
  }
}


function mapStateToProps(state) {
  return { plans: state.plans }
}


export default connect(mapStateToProps, { selectPlan })(Plans)