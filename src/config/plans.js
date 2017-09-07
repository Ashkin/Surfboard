
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


export default [StandardPlan, PrimePlan]
