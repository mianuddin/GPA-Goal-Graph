export function toggleDialog() {
  return {
    type: 'TOGGLE_DIALOG',
  };
}

export function setBoolKey(key, val) {
  return {
    type: 'SET_BOOL_KEY',
    key,
    val,
  };
}

export function setClassSubmit(val) {
  return {
    type: 'SET_CLASS_SUBMIT',
    val,
  };
}
