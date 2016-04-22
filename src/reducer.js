import { Map, fromJS } from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function updateCurrentGPA(state, text) {
  console.log(text);
  return state.merge(fromJS({
    controlledInputs: {
      currentGPA: [text],
    },
  }));
}

export default function (state = new Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    case 'CHANGE_CURRENTGPA':
      return updateCurrentGPA(state, action.text);
    default:
      return state;
  }
}
