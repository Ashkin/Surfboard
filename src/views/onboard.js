import React, { Component }         from 'react'
import { connect }                  from 'react-redux'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import Paper                        from 'material-ui/Paper'

import Welcome         from '../components/welcome'
import FormVenue       from '../components/form-venue'
import FormContact     from '../components/form-contact'
import VenuePhotos     from '../components/venue-photos'
import Plans           from '../components/plans'
import FormCreditcard  from '../components/form-creditcard'
import CheckoutSummary from '../components/checkout-summary'
import Success         from '../components/success'

import ViewNotFound    from './not_found'

import { setStep }     from '../actions'


class ViewOnboard extends Component {


  handleNext = () => {
    // Fetch activeStep
    let activeStep = this.props.activeStep

    // and default it to -1  (catch null/undefined)
    if (activeStep == null)
      activeStep = -1

    // Don't go past the end, obv.
    if (activeStep >= 6)
      return

    this.props.setStep({activeStep: activeStep + 1})
  }


  handlePrev = () => {
    const { activeStep } = this.props

    // Allow navigating back to step -1 (Welcome), but not before
    if (activeStep < 0)
      return

    this.props.setStep({activeStep: activeStep - 1})
  }



  //TODO: Add a Success step
  getStepContent() {
    const { activeStep } = this.props

    switch(activeStep) {
      case undefined:
      case -1: return <Welcome         step={activeStep+1}                              nextStep={this.handleNext} />
      case 0:  return <FormVenue       step={activeStep+1}  prevStep={this.handlePrev}  nextStep={this.handleNext} />
      case 1:  return <FormContact     step={activeStep+1}  prevStep={this.handlePrev}  nextStep={this.handleNext} />
      case 2:  return <VenuePhotos     step={activeStep+1}  prevStep={this.handlePrev}  nextStep={this.handleNext} />
      case 3:  return <Plans           step={activeStep+1}  prevStep={this.handlePrev}  nextStep={this.handleNext} />
      case 4:  return <FormCreditcard  step={activeStep+1}  prevStep={this.handlePrev}  nextStep={this.handleNext} />
      case 5:  return <CheckoutSummary step={activeStep+1}  prevStep={this.handlePrev}  nextStep={this.handleNext} />
      case 6:  return <Success />
      default: return <ViewNotFound />
    }
  }



  renderStepper() {
    const { activeStep } = this.props

    return (
      <Paper className="stepper paper" zDepth={3} rounded={false}>
        <Stepper activeStep={activeStep}>
          <Step><StepLabel>Venue</StepLabel></Step>
          <Step><StepLabel>Contact</StepLabel></Step>
          <Step><StepLabel>Photos</StepLabel></Step>
          <Step><StepLabel>Plans</StepLabel></Step>
          <Step><StepLabel>Billing</StepLabel></Step>
          <Step><StepLabel>Checkout</StepLabel></Step>
        </Stepper>
      </Paper>
    )
  }

  renderStep() {
    return (
      <div className="step">
        { this.getStepContent() }
      </div>
    )
  }



  render() {
    return (
      <main className="onboard">
        { this.renderStepper() }
        { this.renderStep() }
      </main>
    )
  }
}



function mapStateToProps(state) {
  return { ...state.onboard }
}


export default connect(mapStateToProps, { setStep })(ViewOnboard)
