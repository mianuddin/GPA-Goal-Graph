import React from 'react';
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

import '../styles/partials/_ClassPaper';

const ClassPaper = props => (
  <div id="ClassSectionContainer">
    <Paper zDepth={1} className="PaperContainer">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Class</TableHeaderColumn>
            <TableHeaderColumn>Grade</TableHeaderColumn>
            <TableHeaderColumn>Credits</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.classes.map((classObj, index) => (
            <TableRow key={index}>
              <TableRowColumn>{classObj.get('name')}</TableRowColumn>
              <TableRowColumn>{classObj.get('grade')}</TableRowColumn>
              <TableRowColumn>{classObj.get('credits')}</TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    <div id="FAB">
      <FloatingActionButton
        onClick={props.onUserInteraction}
      >
        <ContentAdd />
      </FloatingActionButton>
    </div>
    <Dialog
      title="Add a Class"
      actions={
        <FlatButton
          label="Cancel"
          secondary
          onTouchTap={props.onUserInteraction}
        />
      }
      modal={false}
      open={props.dialogOpen}
      onRequestClose={props.onUserInteraction}
    >
      Form Here
    </Dialog>
  </div>
);

ClassPaper.propTypes = {
  classes: React.PropTypes.array,
  dialogOpen: React.PropTypes.bool,
  onUserInteraction: React.PropTypes.func,
};

export default ClassPaper;
