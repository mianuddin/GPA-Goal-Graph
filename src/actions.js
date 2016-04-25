export function toggleBoolKey(key) {
  return {
    type: 'TOGGLE_BOOL_KEY',
    key,
  };
}

export function setBoolKey(key, val) {
  return {
    type: 'SET_BOOL_KEY',
    key,
    val,
  };
}
