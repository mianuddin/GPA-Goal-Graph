import ClassObject from './controller/ClassObject';

export function mainForm(state, action) {
  switch (action.type) {
    case 'TOGGLE_CLASSES':
      return state.set('includeClasses', !state.get('includeClasses'));
    case 'TOGGLE_SUBMIT':
      return state.set('canSubmit', !state.get('canSubmit'));
    default:
      return state;
  }
}

export function classForm(state, action) {
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

export function classes(state, action) {
  switch (action.type) {
    case 'ADD_CLASS':
      return state.push(new ClassObject(
        action.name,
        action.grade,
        action.credits
      ));
    case 'REMOVE_CLASS':
      return state.delete(action.index);
    default:
      return state;
  }
}
