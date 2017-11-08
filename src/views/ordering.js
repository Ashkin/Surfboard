import React, { Component }         from 'react'
import { connect }                  from 'react-redux'

import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import Paper                        from 'material-ui/Paper'

import Products  from '../components/ordering/products'
import Venue     from '../components/ordering/venue'
import Billing   from '../components/ordering/billing'
import Checkout  from '../components/ordering/checkout'
import Success   from '../components/ordering/success'

import ViewNotFound from './not_found'

import { order, setHeaderTitle } from '../actions'
const { setStep } = order


class ViewOrdering extends Component {
    componentWillMount() {
        this.props.setHeaderTitle("ItsOnMe Ordering")
    }


    render() {
        return (
            <main className="onboard">
                { this.renderStepper() }
                { this.renderStep() }
            </main>
        )
    }

    renderStepper() {
        const { activeStep } = this.props

        // Hide stepper on the initial step (-1)
        let className = ""
        if (activeStep === undefined || activeStep === -1)
            className = "hidden"

        return (
            <Paper className={`stepper paper ${className}`} zDepth={3} rounded={false}>
                <Stepper activeStep={activeStep}>
                    <Step className="step-item"><StepLabel><span className="step-label">Venue</span></StepLabel></Step>
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

    getStepContent() {
        const { activeStep } = this.props

        switch(activeStep) {
            case undefined:
            case -1:  return <Products   step={activeStep+1}                              nextStep={this.handleNext} className="fadein-fast" />
            case  0:  return <Venue      step={activeStep+1}  prevStep={this.handlePrev}  nextStep={this.handleNext} className="fadein-fast" />
            case  1:  return <Billing    step={activeStep+1}  prevStep={this.handlePrev}  nextStep={this.handleNext} className="fadein-fast" />
            case  2:  return <Checkout   step={activeStep+1}  prevStep={this.handlePrev}  nextStep={this.handleNext} className="fadein-fast" />
            case  3:  return <Success />
            default: return <ViewNotFound />
        }
    }




    handleNext = () => {
        // Fetch activeStep
        let { activeStep } = this.props

        // and default it to -1  (catch null/undefined)
        if (activeStep == null)
            activeStep = -1

        // Don't go past the end, obv.
        if (activeStep >= 3)
            return

        this.props.setStep({activeStep: activeStep + 1})
    }


    handlePrev = () => {
        const { activeStep } = this.props

        if (activeStep < 0)
            return

        this.props.setStep({activeStep: activeStep - 1})
    }

}



function mapStateToProps(state) {
    return { ...state.order_step }
}

export default connect(mapStateToProps, { setStep, setHeaderTitle })(ViewOrdering)
