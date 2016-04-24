import React from 'react';

import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
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
      <Formsy.Form>
        <div className="row">
          <div className="col-xs-12 col-md-8">
            <ClassPaper
              classes={this.props.classes}
            />
          </div>
          <div className="col-xs-12 col-md-4 first-md">
            <Paper zDepth={1} className="PaperContainer">
              <FormsyText
                name="name"
                required
                hintText="What is your name?"
                floatingLabelText="Name"
              />
              <div id="SubmitButton">
                <RaisedButton type="submit" label="Submit" primary />
              </div>
            </Paper>
          </div>
        </div>
      </Formsy.Form>
    );
  }
}

HomeForm.propTypes = {
  classes: React.PropTypes.array,
};

export default HomeForm;
