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

import '../styles/partials/_ClassPaper';

const ClassPaper = () => (
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
          <TableRow>
            <TableRowColumn>Calculus</TableRowColumn>
            <TableRowColumn>A</TableRowColumn>
            <TableRowColumn>10</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
    <div id="FAB">
      <FloatingActionButton>
        <ContentAdd />
      </FloatingActionButton>
    </div>
  </div>
);

export default ClassPaper;
