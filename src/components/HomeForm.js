import React from 'react';

import InputGroup from './InputGroup';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';
import ClassPaper from './ClassPaper';

import '../styles/partials/_HomeForm';

class HomeForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
            <ClassPaper
              classes={this.props.classes}
            />
          </div>
          <div className="col-xs-12 col-md-4 first-md">
            <Paper zDepth={1} className="PaperContainer">
              <InputGroup
              />
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

HomeForm.propTypes = {
  classes: React.PropTypes.array,
};

export default HomeForm;
