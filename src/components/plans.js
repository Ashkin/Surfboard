import React, { Component } from 'react'
import { connect } from 'react-redux'

import PLANS          from '../config/plans'
import classBuilder   from '../helpers/class-builder'
import { selectPlan } from '../actions'


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
        className={plan.recommended ? "" : "button-dark-silver"}
        onClick={() => this.handleClick(planId)}>
        Choose Plan
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


  render() {
    return (
      <section className={classBuilder("plans", this.props.className)}>
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