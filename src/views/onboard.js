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

import { setOnboardStep, setHeaderTitle }     from '../actions'


class ViewOnboard extends Component {
    steps = (() => {
        const { affiliate } = this.props
        let steps

        switch(affiliate && affiliate.toLowerCase()) {  // use downcased `affiliate` if it exists, otherwise undefined
            case 'golfnow':
                steps = [
                    { title: "Business",  component: FormVenue   },
                    { title: "Contact",   component: FormContact },
                    { title: "Photos",    component: VenuePhotos },
                ]
                break;
            default:
                steps = [
                    { title: "Business",  component: FormVenue      },
                    { title: "Contact",   component: FormContact    },
                    { title: "Photos",    component: VenuePhotos    },
                    { title: "Plans",     component: Plans          },
                    { title: "Billing",   component: FormCreditcard },
                ]
                break;
        }

        steps = [
            { title: null,        component: Welcome },
            ...steps,
            { title: "Checkout",  component: CheckoutSummary },
            { title: null,        component: Success },
        ]

        return steps
    })()


    handleNext = () => {
        // Fetch activeStep and default it to zero
        const activeStep = this.props.activeStep || 0

        // Don't go past the end, obv.
        if (activeStep >= this.steps.length)
            return

        this.props.setOnboardStep({activeStep: activeStep + 1})
    }


    handlePrev = () => {
        const { activeStep } = this.props

        // Allow navigating back to step 0 (Welcome), but not before
        if (activeStep < 1)
            return

        this.props.setOnboardStep({activeStep: activeStep - 1})
    }



    //TODO: Add a Success step
    getStepContent() {
        const { affiliate, golfNow } = this.props
        const activeStep = this.props.activeStep || 0  // Default to zero for the Welcome step
        const step       = this.steps[activeStep]

        // Scroll to top
        window.scrollTo(0,0)

        if (step === undefined)  return <ViewNotFound />
        return <step.component step={activeStep}  prevStep={this.handlePrev}  nextStep={this.handleNext} className="fadein-fast" affiliate={affiliate} golfNow={golfNow} />
    }



    renderStepper() {
        const activeStep = (this.props.activeStep||0) - 1 // Decrement since the <Welcome> step is not included here.

        // Hide stepper on the Welcome step
        let className = ""
        if (activeStep == -1)
            className = "hidden"

        // Strip out all steps with blank titles (since we're not displaying them as steps)
        let payload = []
        this.steps.map((step) => {
            if (step.title == null) return
            payload.push(step)
        })

        return (
            <Paper className={`stepper paper ${className}`} zDepth={3} rounded={false}>
                <Stepper activeStep={activeStep}>
                    { payload.map((step) => {
                        return <Step className="step-item" key={step.title}><StepLabel><span className="step-label">{step.title}</span></StepLabel></Step>
                    }) }
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
