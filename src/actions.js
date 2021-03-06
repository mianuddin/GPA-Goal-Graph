export function toggleDialog() {
  return {
    type: 'TOGGLE_DIALOG',
  };
}

export function toggleSubmit() {
  return {
    type: 'TOGGLE_SUBMIT',
  };
}

export function setClassSubmit(val) {
  return {
    type: 'SET_CLASS_SUBMIT',
    val,
  };
}

export function addClass(name, grade, credits) {
  return {
    type: 'ADD_CLASS',
    name,
    grade,
    credits,
  };
}

export function selectClass(index) {
  return {
    type: 'SELECT_CLASS',
    index,
  };
}

export function removeClass(index) {
  return {
    type: 'REMOVE_CLASS',
    index,
  };
}

export function toggleClasses() {
  return {
    type: 'TOGGLE_CLASSES',
  };
}
