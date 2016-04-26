import { Map, fromJS } from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function toggleDialog(state) {
  return state.setIn(['classForm', 'dialogOpen'], !state.getIn(['classForm', 'dialogOpen']));
}

function setClassSubmit(state, val) {
  return state.setIn(['classForm', 'canSubmit'], val);
}

function setBoolKey(state, key, val = !state.get(key)) {
  return state.set(key, val);
}

function addClass(state, name, grade, credits) {
  return state.set('classes', state.get('classes').push(fromJS({
    name,
    grade,
    credits,
  })));
}

function selectClass(state, index) {
  return state.setIn(['classForm', 'selectedClass'], index);
}

function removeClass(state, index) {
  return state.set('classes', state.get('classes').delete(index));
}

function toggleClasses(state) {
  return state.setIn(['inputs', 'includeClasses'], !state.getIn(['inputs', 'includeClasses']));
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
    case 'ADD_CLASS': {
      return addClass(state, action.name, action.grade, action.credits);
    }
    case 'SELECT_CLASS': {
      return selectClass(state, action.index);
    }
    case 'REMOVE_CLASS': {
      return removeClass(state, action.index);
    }
    case 'TOGGLE_CLASSES': {
      return toggleClasses(state);
    }
    default:
      return state;
  }
}
