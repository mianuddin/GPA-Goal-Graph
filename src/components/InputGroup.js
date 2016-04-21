import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Toggle from 'material-ui/lib/toggle';

const InputGroup = props => (
  <div>
    <TextField
      hintText="2.7"
      floatingLabelText="Current GPA"
    /><br />
    <TextField
      hintText="3.0"
      floatingLabelText="Goal GPA"
    /><br />
    <TextField
      hintText="120"
      floatingLabelText="Current Credits"
    /><br />
    <TextField
      hintText="150"
      floatingLabelText="Target Credits"
    /><br />
    <div id="ToggleBox">
      <Toggle
        label="Include current semester classes"
      /><br />
    </div>
  </div>
);

export default InputGroup;
