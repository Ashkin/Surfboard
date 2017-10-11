
// builds a class list, discarding null/undefined values
export default function() {
  return [...arguments].map(arg => {
    return (arg != null ? arg : "")
  }).join(" ").trim()
}
