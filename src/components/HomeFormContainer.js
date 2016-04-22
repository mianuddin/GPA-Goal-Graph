import HomeForm from './HomeForm';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';

function mapStateToProps(state) {
  return {
    classes: state.get('classes').toArray(),
  };
}

export const HomeFormContainer = connect(
  mapStateToProps,
)(HomeForm);
