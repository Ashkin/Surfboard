
const StandardPlan = {
    name:            "Standard",
    pricePerMonth:   30,
    cycleInMonths:   1,
    flavorText:      "paid monthly",
    recommended:     false,
}

const PrimePlan = {
    name:            "Prime",
    pricePerMonth:   25,
    cycleInMonths:   12,
    flavorText:      "when paid annually",
    recommended:     true,
}

const GolfNowPlan = {
    name:            "GolfNow",
    pricePerMonth:   0,
    cycleInMonths:   0,
    flavorText:      "for GolfNow affiliates",
    recommended:     false,
    affiliate:       "GolfNow",
}


export default [PrimePlan, StandardPlan, GolfNowPlan]
