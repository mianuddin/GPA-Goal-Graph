import { Map } from 'immutable';

export default function classForm(state, action) {
  switch (action.type) {
    case 'TOGGLE_DIALOG':
      return state.set('dialogOpen', !state.get('dialogOpen'));
    case 'SET_CLASS_SUBMIT':
      return state.set('canSubmit', action.val);
    case 'SELECT_CLASS':
      return state.set('selectedClass', action.index);
    default:
      return state;
  }
}
