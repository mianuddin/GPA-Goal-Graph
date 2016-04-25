import { Map, fromJS } from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function toggleDialog(state) {
  return state.setIn(['classForm', 'dialogOpen'], !state.get('classForm').get('dialogOpen'));
}

function setClassSubmit(state, val) {
  return state.setIn(['classForm', 'canSubmit'], val);
}

function setBoolKey(state, key, val = !state.get(key)) {
  return state.set(key, val);
}

export default function (state = new Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    case 'TOGGLE_DIALOG':
      return toggleDialog(state);
    case 'SET_BOOL_KEY':
      return setBoolKey(state, action.key, action.val);
    case 'SET_CLASS_SUBMIT': {
      return setClassSubmit(state, action.val);
    }
    default:
      return state;
  }
}
