import React from "react"
import Paper from "material-ui/Paper"


const Welcome = ({nextStep, className, affiliate, golfNow}) => {
    function affiliateName(affiliate) {
        // Custom affiliates
        if (affiliate == 'golfnow')  return 'GolfNow'
        // Default: just capitalize
        return affiliate.charAt(0).toUpperCase() + affiliate.slice(1);
    }

    return (
        <section className={`welcome ${className}`}>
            <Paper className="paper primary" zDepth={2}>
                <header>Welcome{affiliate
                                ? <span>, <span className='affiliate-name'>{affiliateName(affiliate)}</span> affiliate</span>
                                : ''
                            }!</header>
                <br/>
                <summary>
                    Register your business, create your account, and go live in 15 minutes. 
                    Sign up today & sell your first gift card online tomorrow.
                </summary>

                <article>
                    <span>Here's what we'll need from you:</span>
                    <br/><br/>
                    <Paper className="paper item" zDepth={2}>
                        <ul><li>
                            Your business's name and address
                        </li></ul>
                    </Paper>
                    <Paper className="paper item" zDepth={2}>
                        <ul><li>
                            A short one-liner, and a longer description
                            <aside>
                                These descriptions drive awareness and increased gift card sales. You can update these at any time.
                            </aside>
                        </li></ul>
                    </Paper>
                    <Paper className="paper item" zDepth={2}>
                        <ul><li>
                            Primary contact name and email
                            <aside>This will be who our customer success and support teams will reach out to.</aside>
                        </li></ul>
                    </Paper>
                    <Paper className="paper item" zDepth={2}>
                        <ul><li>
                            A high-res logo and cover photo for your venue listing
                            <aside>
                                Be sure to represent your brand with quality, high-res images.
                            </aside>
                        </li></ul>
                    </Paper>
                    <Paper className={`paper item ${golfNow ? 'hidden' : ''}`} zDepth={2}>
                        <ul><li>
                            Credit card info
                            <aside>Once you've submitted payment, your customer success rep will contact you.</aside>
                        </li></ul>
                    </Paper>
                </article>

                Click the button below and let's get started!<br/>

                <button onClick={nextStep}>Begin Signup</button>
                <img src="https://clickserv.basis.net/conv/f57faa46b3600678" data-purpose="user-tracking" />
            </Paper>
        </section>
    )
}

export default Welcome
