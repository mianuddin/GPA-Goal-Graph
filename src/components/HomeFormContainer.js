import HomeForm from './HomeForm';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    classes: state.get('classes').toArray(),
  };
}

const HomeFormContainer = connect(
  mapStateToProps
)(HomeForm);

export default HomeFormContainer;
