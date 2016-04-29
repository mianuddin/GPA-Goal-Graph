import { Map } from 'immutable';

export default function mainForm(state, action) {
  switch (action.type) {
    case 'TOGGLE_CLASSES':
      return state.set('includeClasses', !state.get('includeClasses'));
    case 'TOGGLE_SUBMIT':
      return state.set('canSubmit', !state.get('canSubmit'));
    default:
      return state;
  }
}
