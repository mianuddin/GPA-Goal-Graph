import ClassObject from '../controller/ClassObject';

export default function classes(state, action) {
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
