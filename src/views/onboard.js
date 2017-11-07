import React, { Component }         from 'react'
import { connect }                  from 'react-redux'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import Paper                        from 'material-ui/Paper'

import Welcome         from '../components/welcome'
import FormVenue       from '../components/form-venue'
import FormHours       from '../components/form-hours'
import FormContact     from '../components/form-contact'
import VenuePhotos     from '../components/venue-photos'
import Plans           from '../components/plans'
import FormCreditcard  from '../components/form-creditcard'
import CheckoutSummary from '../components/checkout-summary'
import Success         from '../components/success'

import ViewNotFound    from './not_found'

import { setOnboardStep, setHeaderTitle }     from '../actions'


class ViewOnboard extends Component {


    handleNext = () => {
        // Fetch activeStep
        let activeStep = this.props.activeStep

        // and default it to -1  (catch null/undefined)
        if (activeStep == null)
            activeStep = -1

        // Don't go past the end, obv.
        if (activeStep >= 7)
            return

        this.props.setOnboardStep({activeStep: activeStep + 1})
    }


    handlePrev = () => {
        const { activeStep } = this.props

        // Allow navigating back to step -1 (Welcome), but not before
        if (activeStep < 0)
            return

        this.props.setOnboardStep({activeStep: activeStep - 1})
    }



    //TODO: Add a Success step
    getStepContent() {
        const { activeStep } = this.props

        switch(activeStep) {
            case undefined:
            case -1: return <Welcome         step={activeStep+1}                              nextStep={this.handleNext} className="fadein-fast" />
            case 0:  return <FormVenue       step={activeStep+1}  prevStep={this.handlePrev}  nextStep={this.handleNext} className="fadein-fast" />
            case 1:  return <FormHours       step={activeStep+1}  prevStep={this.handlePrev}  nextStep={this.handleNext} className="fadein-fast" />
            case 2:  return <FormContact     step={activeStep+1}  prevStep={this.handlePrev}  nextStep={this.handleNext} className="fadein-fast" />
            case 3:  return <VenuePhotos     step={activeStep+1}  prevStep={this.handlePrev}  nextStep={this.handleNext} className="fadein-fast" />
            case 4:  return <Plans           step={activeStep+1}  prevStep={this.handlePrev}  nextStep={this.handleNext} className="fadein-fast" />
            case 5:  return <FormCreditcard  step={activeStep+1}  prevStep={this.handlePrev}  nextStep={this.handleNext} className="fadein-fast" />
            case 6:  return <CheckoutSummary step={activeStep+1}  prevStep={this.handlePrev}  nextStep={this.handleNext} className="fadein-fast" />
            case 7:  return <Success />
            default: return <ViewNotFound />
        }
    }



    renderStepper() {
        const { activeStep } = this.props

        // Hide stepper on the Welcome step (-1)
        let className = ""
        if (activeStep === undefined || activeStep === -1)
            className = "hidden"


        return (
            <Paper className={`stepper paper ${className}`} zDepth={3} rounded={false}>
                <Stepper activeStep={activeStep}>
                    <Step className="step-item"><StepLabel><span className="step-label">Venue</span></StepLabel></Step>
                    <Step className="step-item"><StepLabel><span className="step-label">Hours</span></StepLabel></Step>
                    <Step className="step-item"><StepLabel><span className="step-label">Contact</span></StepLabel></Step>
                    <Step className="step-item"><StepLabel><span className="step-label">Photos</span></StepLabel></Step>
                    <Step className="step-item"><StepLabel><span className="step-label">Plans</span></StepLabel></Step>
                    <Step className="step-item"><StepLabel><span className="step-label">Billing</span></StepLabel></Step>
                    <Step className="step-item"><StepLabel><span className="step-label">Checkout</span></StepLabel></Step>
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


    componentWillMount() {
      this.props.setHeaderTitle("Merchant Signup")
    }
}



function mapStateToProps(state) {
    return { ...state.onboard }
}


export default connect(mapStateToProps, { setOnboardStep, setHeaderTitle })(ViewOnboard)
