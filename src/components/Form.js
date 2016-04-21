import React from 'react';
import InputGroup from './InputGroup';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

import '../styles/partials/_Form';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // fetchFormData() {
  //   return {
  //     currentGPA: parseFloat(this.refs.currentGPAInput.getValue()),
  //     goalGPA: parseFloat(this.refs.goalGPAInput.getValue()),
  //     currentCredits: parseFloat(this.refs.currentCreditsInput.getValue()),
  //     targetCredits: parseFloat(this.refs.targetCreditsInput.getValue()),
  //   };
  // }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form
        id="Form"
        onSubmit={this.handleSubmit}
      >
        <div className="row">
          <div className="col-xs-12 col-md-8">
            <Paper zDepth={1} className="PaperContainer">
              <h3>Current Semester Classes</h3>
            </Paper>
          </div>
          <div className="col-xs-12 col-md-4 first-md">
            <Paper zDepth={1} className="PaperContainer">
              <InputGroup />
              <div id="SubmitButton">
                <RaisedButton type="submit" label="Submit" primary />
              </div>
            </Paper>
          </div>
        </div>
      </form>
    );
  }
}

export default Form;
