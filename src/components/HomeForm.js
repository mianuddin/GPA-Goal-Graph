import React from 'react';

import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import FormsyToggle from 'formsy-material-ui/lib/FormsyToggle';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';
import ClassPaper from './ClassPaper';

import '../styles/partials/_HomeForm';

const HomeForm = props => (
  <Formsy.Form
    id="Form"
  >
    <div className="row">
      <div className="col-xs-12 col-md-8">
        <ClassPaper
          classes={props.classes}
          dialogOpen={props.dialogOpen}
          onUserInteraction={props.toggleDialog}
        />
      </div>
      <div className="col-xs-12 col-md-4 first-md">
        <Paper zDepth={1} className="PaperContainer" id="InputContainer">
          <FormsyText
            name="currentCredits"
            required
            hintText="How many credits do you have?"
            floatingLabelText="Current Credits"
          />
          <FormsyText
            name="targetCredits"
            required
            hintText="What is your credit target?"
            floatingLabelText="Target Credits"
          />
          <FormsyText
            name="currentGPA"
            required
            hintText="What is your current GPA?"
            floatingLabelText="Current GPA"
          />
          <FormsyText
            name="goalGPA"
            required
            hintText="What is your GPA goal?"
            floatingLabelText="Goal GPA"
          />
          <div id="ToggleBox">
            <FormsyToggle
              name="classesIncluded"
              label="Include current semester classes"
            />
          </div>
          <div id="SubmitButton">
            <RaisedButton type="submit" label="Submit" primary />
          </div>
        </Paper>
      </div>
    </div>
  </Formsy.Form>
);

HomeForm.propTypes = {
  classes: React.PropTypes.array,
  dialogOpen: React.PropTypes.bool,
  toggleDialog: React.PropTypes.func,
};

export default HomeForm;
