// Redux-Form wrappers to enable the use of Material UI components
// Slightly modified of http://redux-form.com/7.0.3/examples/material-ui/


import React                from 'react'
import TextField            from 'material-ui/TextField'
import { RadioButton,
         RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox             from 'material-ui/Checkbox'
import SelectField          from 'material-ui/SelectField'


/* <TextField> */
export const renderTextField = ({
  input,
  hint,
  label,
  meta: { touched, error },
  ...custom
}) =>
  <TextField
    hintText={hint}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />



/* <Checkbox> */
export const renderCheckbox = ({ input, label, ...custom }) => {
  // Hack to make `labelStyle` and `id` work
  delete custom.meta

  return (
    <Checkbox
      label={label}
      {...custom}
      checked={input.value ? true : false}
      onCheck={input.onChange}
    />
  )
}


/* <RadioGroup> */
export const renderRadioGroup = ({ input, ...rest }) =>
  <RadioButtonGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />


/* <SelectField> */
export const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) =>
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
