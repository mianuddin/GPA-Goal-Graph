export function toggleDialog() {
  return {
    type: 'TOGGLE_DIALOG',
  };
}

export function changeCurrentGPA(text) {
  return {
    type: 'CHANGE_CURRENTGPA',
    text,
  };
}
