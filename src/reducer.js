import { Map, fromJS } from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function setBoolKey(state, key, val = !state.get(key)) {
  return state.set(key, val);
}

export default function (state = new Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    case 'TOGGLE_BOOL_KEY':
      return setBoolKey(state, action.key);
    case 'SET_BOOL_KEY':
      return setBoolKey(state, action.key, action.val);
    default:
      return state;
  }
}
