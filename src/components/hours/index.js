import React     from "react"
import { Field } from "redux-form"

import {renderTimePicker,
        renderToggle}    from "../../helpers/material-ui-redux-form"
import classBuilder      from "../../helpers/class-builder"

import "./hours.scss"


const Hours = ({day, className}) => {
    const DAYS = ["sunday",    "monday",   "tuesday",
                  "wednesday", "thursday", "friday", "saturday"]

    // renderer = renderer || Hours  //? Would this even work?

    function validDay(day) {
        if (!day)
            return false
        return DAYS.includes( day.toLowerCase() )
    }


    function renderDay(day) {
        day = day.toLowerCase()
        const name = "hours-" + day
        // Capitalize:
        const friendlyDay = day.slice(0,1).toUpperCase() + day.slice(1)


        return (
            <div className={classBuilder("hours-day", className)}>
                <label>
                    {friendlyDay + ":"}
                </label>
                <Field
                    component={renderToggle}
                    name={name + "-24hrs"}
                    label="Open 24hrs"
                    labelStyle={{textAlign: "right"}}
                />
                <div className="range">
                    <Field
                        component={renderTimePicker}
                        autoOk={true}
                        pedantic={true}
                        name={name + "-open"}
                        hintText="Open"
                        minutesStep={15}
                        textFieldStyle={{textAlign: "center"}}
                    />
                    <div className="hr" />
                    <Field
                        component={renderTimePicker}
                        autoOk={true}
                        pedantic={true}
                        name={name + "-close"}
                        hintText="Close"
                        minutesStep={15}
                        textFieldStyle={{textAlign: "center"}}
                    />
                </div>
            </div>
        )
    }


    function renderWeek() {
        return (
            <div className={classBuilder("hours-week", className)}>
                { DAYS.map((day) => {
                    return <Hours day={day} key={day} />
                }) }
            </div>
        )
    }


    // Render a single day, if specified
    if (day) {
        if (validDay(day)) {
            return renderDay(day)
        } else throw new error("Invalid day passed to Hours: " + day)
    }

    // Render the entire week
    return renderWeek()
}


export default Hours
