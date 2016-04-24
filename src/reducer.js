import { Map, fromJS } from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function toggleDialog(state) {
  return state.set('dialogOpen', !state.get('dialogOpen'));
}

export default function (state = new Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    case 'TOGGLE_DIALOG':
      return toggleDialog(state);
    default:
      return state;
  }
}
