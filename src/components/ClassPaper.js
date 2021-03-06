import React from 'react';

import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';

import Paper from 'material-ui/lib/paper';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import CardActions from 'material-ui/lib/card/card-actions';

import '../styles/partials/_ClassPaper';

const errorMessages = {
  matchRegexp: 'Must be A through F or 0-4.',
  isNumeric: 'Must be numbers only (i.e. 0-9).',
};

const ClassPaper = props => {
  function handleSubmit(data) {
    props.addClass(data.className, data.classGrade.toUpperCase(), data.classCredits);
    props.onUserInteraction();
  }

  function handleSelect(selectedRows) {
    const row = selectedRows.length ? selectedRows[0] + 1 : 0;
    props.selectClass(row);
  }

  function duplicateSelectedClass() {
    const selectedClass = props.classes[props.formProps.selectedClass - 1];
    props.addClass(selectedClass.name, selectedClass.gradeInput, selectedClass.credits);
  }

  function removeSelectedClass() {
    if (!(props.classes.length - 1) || props.formProps.selectedClass === props.classes.length) {
      props.selectClass(0);
    }
    props.removeClass(props.formProps.selectedClass - 1);
  }

  const classTableJSX = (
    <div>
      <Paper
        className={!props.classes.length ? 'center-contents' : ''}
        zDepth={1}
      >
        <div
          className={`ClassSectionContainer_inner ${!props.classes.length ? 'row' : ''}`}
        >
          <div
            className={`col-xs-2 center-contents ${!props.classes.length ? '' : 'hidden'}`}
          >
            <i className="material-icons">note_add</i>
          </div>
          <div
            className={`col-xs-10 center-contents ${!props.classes.length ? '' : 'hidden'}`}
          >
            <p>Press the button below to add your first class!</p>
          </div>
          <Table
            multiSelectable={false}
            onRowSelection={handleSelect}
            className={
              ! props.classes.length
              ? 'hidden'
              : ''
            }
          >
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Class</TableHeaderColumn>
                <TableHeaderColumn>Grade</TableHeaderColumn>
                <TableHeaderColumn>Credits</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              deselectOnClickaway={false}
            >
              {props.classes.map((classObj, index) => (
                <TableRow
                  key={index}
                  selected={(index + 1) === props.formProps.selectedClass}
                >
                  <TableRowColumn>{classObj.name}</TableRowColumn>
                  <TableRowColumn>{classObj.gradeInput}</TableRowColumn>
                  <TableRowColumn>{classObj.credits}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <CardActions
          className={
            ! props.classes.length
            ? 'hidden'
            : ''
          }
        >
          <FlatButton
            label="Duplicate"
            disabled={!props.formProps.selectedClass}
            onClick={duplicateSelectedClass}
          />
          <FlatButton
            label="Remove"
            disabled={!props.formProps.selectedClass}
            onClick={removeSelectedClass}
          />
        </CardActions>
      </Paper>
      <div className="FloatingActionButton">
        <FloatingActionButton
          onClick={props.onUserInteraction}
          disabled={!props.includeClasses}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    </div>
  );

  const classesNotIncludedJSX = (
    <Paper zDepth={1} className="ClassSectionContainer--not-included center-contents">
      <div className="ClassSectionContainer_inner row">
        <div className="col-xs-2 center-contents">
          <i className="material-icons">class</i>
        </div>
        <div className="col-xs-10 center-contents">
          <p>Select "<em>Include current semester classes</em>" <br />to include your classes!</p>
        </div>
      </div>
    </Paper>
  );

  return (
    <div className="ClassSectionContainer">
      {
        props.includeClasses
        ? classTableJSX
        : classesNotIncludedJSX
      }
      <Dialog
        title="Add a Class"
        contentClassName="DialogContent"
        modal={false}
        open={props.formProps.dialogOpen}
        onRequestClose={props.onUserInteraction}
      >
        <Formsy.Form
          onValid={props.changeSubmit.bind(this, true)} // eslint-disable-line react/jsx-no-bind
          onInvalid={props.changeSubmit.bind(this, false)} // eslint-disable-line react/jsx-no-bind
          onValidSubmit={handleSubmit}
        >
          <div className="DialogContent_Inputs">
            <FormsyText
              name="className"
              required
              hintText="What is the name of this class?"
              floatingLabelText="Name"
              validations="isExisty"
            />
            <br />
            <FormsyText
              name="classGrade"
              required
              hintText="What is your grade in this class?"
              floatingLabelText="Grade"
              validations={{
                matchRegexp: /^([a-dA-DfF][+-]?|[0-4][.]?[0-9]?)$/,
              }}
              validationErrors={errorMessages}
            />
            <br />
            <FormsyText
              name="classCredits"
              required
              hintText="How many credits is this class?"
              floatingLabelText="Credits"
              validations="isNumeric"
              validationErrors={errorMessages}
            />
          </div>
          <div className="DialogContent_Actions">
            <FlatButton
              label="Cancel"
              secondary
              onTouchTap={props.onUserInteraction}
            />
            <FlatButton
              label="Submit"
              primary
              disabled={!props.formProps.canSubmit}
              type="submit"
            />
          </div>
        </Formsy.Form>
      </Dialog>
    </div>
  );
};

ClassPaper.propTypes = {
  classes: React.PropTypes.array,
  formProps: React.PropTypes.object,
  onUserInteraction: React.PropTypes.func,
  changeSubmit: React.PropTypes.func,
  addClass: React.PropTypes.func,
  selectClass: React.PropTypes.func,
  removeClass: React.PropTypes.func,
  includeClasses: React.PropTypes.bool,
};

export default ClassPaper;
