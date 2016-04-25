import HomeForm from './HomeForm';
import { connect } from 'react-redux';
import * as Actions from '../actions.js';

function mapStateToProps(state) {
  return {
    classes: state.get('classes').toArray(),
    classFormProps: state.get('classForm').toObject(),
    canSubmit: state.get('canSubmit'),
  };
}

const mapDispatchToProps = (dispatch) => ({
  toggleDialog: () => {
    dispatch(Actions.toggleDialog());
  },
  toggleSubmit: (val) => {
    dispatch(Actions.setBoolKey('canSubmit', val));
  },
  setClassSubmit: (val) => {
    dispatch(Actions.setClassSubmit(val));
  },
});

const HomeFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeForm);

export default HomeFormContainer;
