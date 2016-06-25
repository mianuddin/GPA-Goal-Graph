import React from 'react';

import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import FormsyToggle from 'formsy-material-ui/lib/FormsyToggle';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

import { getTotalCreditsFromClasses } from '../controller/gpaTools.js';
import ClassPaper from './ClassPaper';

import '../styles/partials/_HomeForm';

Formsy.addValidationRule('isMoreThanWith', (values, value, array) => {
  const inputs = array.substring(1, array.length - 1).split(',');
  return Number(value) > (Number(values[inputs[0]]) + Number(inputs[1]));
});

const errorMessages = {
  isMoreThanWith: 'Must be greater than current and class credits.',
  isNumeric: 'Must be a number.',
};

const HomeForm = props => (
  <Formsy.Form
    className="ClassForm"
    onValid={props.toggleSubmit.bind(this, true)} // eslint-disable-line react/jsx-no-bind
    onInvalid={props.toggleSubmit.bind(this, false)} // eslint-disable-line react/jsx-no-bind
  >
    <div className="row">
      <div className="col-xs-12 col-md-8">
        <ClassPaper
          classes={props.classes}
          formProps={props.classFormProps}
          onUserInteraction={props.toggleDialog}
          changeSubmit={props.setClassSubmit}
          addClass={props.addClass}
          selectClass={props.selectClass}
          removeClass={props.removeClass}
          includeClasses={props.includeClasses}
        />
      </div>
      <div className="col-xs-12 col-md-4 first-md">
        <Paper zDepth={1} className="PaperContainer InputContainer">
          <h2>Calculator</h2>
          <FormsyText
            name="currentCredits"
            required
            hintText="How many credits do you have?"
            floatingLabelText="Current Credits"
            validations="isNumeric"
            validationErrors={errorMessages}
          />
          <FormsyText
            name="targetCredits"
            required
            hintText="What is your credit target?"
            floatingLabelText="Target Credits"
            validations=
            {`isNumeric,isMoreThanWith:[currentCredits,${getTotalCreditsFromClasses(props.classes)}]`} // eslint-disable-line max-len
            validationErrors={errorMessages}
          />
          <FormsyText
            name="currentGPA"
            required
            hintText="What is your current GPA?"
            floatingLabelText="Current GPA"
            validations="isNumeric"
            validationErrors={errorMessages}
          />
          <FormsyText
            name="goalGPA"
            required
            hintText="What is your GPA goal?"
            floatingLabelText="Goal GPA"
            validations="isNumeric"
            validationErrors={errorMessages}
          />
          <div className="ToggleBox">
            <FormsyToggle
              name="classesIncluded"
              label="Include current semester classes"
              toggled={props.includeClasses}
              onClick={props.toggleClasses}
            />
          </div>
          <div className="SubmitButton">
            <RaisedButton
              type="submit"
              label="Submit"
              primary
              disabled={!props.canSubmit}
            />
          </div>
        </Paper>
      </div>
    </div>
  </Formsy.Form>
);

HomeForm.propTypes = {
  classes: React.PropTypes.array,
  classFormProps: React.PropTypes.object,
  toggleDialog: React.PropTypes.func,
  canSubmit: React.PropTypes.bool,
  toggleSubmit: React.PropTypes.func,
  setClassSubmit: React.PropTypes.func,
  addClass: React.PropTypes.func,
  selectClass: React.PropTypes.func,
  removeClass: React.PropTypes.func,
  toggleClasses: React.PropTypes.func,
  includeClasses: React.PropTypes.bool,
};

export default HomeForm;
