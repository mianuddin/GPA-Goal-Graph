import { Map, fromJS } from 'immutable';
import { combineReducers } from 'redux';
import mainForm from './reducers/mainForm';
import classForm from './reducers/classForm';
import classes from './reducers/classes';

function setState(state, newState) {
  return state.merge(newState);
}

function reducer(state = new Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    default:
      return fromJS({
        mainForm: mainForm(state.get('mainForm'), action),
        classForm: classForm(state.get('classForm'), action),
        classes: classes(state.get('classes'), action),
      });
  }
}

export default reducer;

