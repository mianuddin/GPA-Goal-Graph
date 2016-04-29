import HomeForm from './HomeForm';
import { connect } from 'react-redux';
import * as Actions from '../actions.js';

function mapStateToProps(state) {
  return {
    classes: state.get('classes').toJS(),
    includeClasses: state.getIn(['mainForm', 'includeClasses']),
    classFormProps: state.get('classForm').toObject(),
    canSubmit: state.getIn(['mainForm', 'canSubmit']),
  };
}

const mapDispatchToProps = (dispatch) => ({
  toggleDialog: () => {
    dispatch(Actions.toggleDialog());
  },
  toggleSubmit: () => {
    dispatch(Actions.toggleSubmit());
  },
  toggleClasses: () => {
    dispatch(Actions.toggleClasses());
  },
  setClassSubmit: (val) => {
    dispatch(Actions.setClassSubmit(val));
  },
  addClass: (name, grade, credits) => {
    dispatch(Actions.addClass(name, grade, credits));
  },
  selectClass: (index) => {
    dispatch(Actions.selectClass(index));
  },
  removeClass: (index) => {
    dispatch(Actions.removeClass(index));
  },
});

const HomeFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeForm);

export default HomeFormContainer;
