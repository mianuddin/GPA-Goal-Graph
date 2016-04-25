import HomeForm from './HomeForm';
import { connect } from 'react-redux';
import * as Actions from '../actions.js';

function mapStateToProps(state) {
  return {
    classes: state.get('classes').toArray(),
    dialogOpen: state.get('dialogOpen'),
    canSubmit: state.get('canSubmit'),
  };
}

const mapDispatchToProps = (dispatch) => ({
  toggleDialog: () => {
    dispatch(Actions.toggleBoolKey('dialogOpen'));
  },
  toggleSubmit: (val) => {
    dispatch(Actions.setBoolKey('canSubmit', val));
  },
});

const HomeFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeForm);

export default HomeFormContainer;
