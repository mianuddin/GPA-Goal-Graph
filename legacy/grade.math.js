import gpaTools from './gpaTools';
import GradeObject from './GradeObject';
import ClassObject from './ClassObject';

function checkForErrors(gradeObj, classes) {
  const errorMessages = [];

  if (gradeObj.currentGPA > 5 || gradeObj.currentGPA < 0) {
    errorMessages.push('GPA must be greater than 0 and less than 5.');
  }
  if (gradeObj.goalGPA > 5 || gradeObj.goalGPA < 0) {
    errorMessages.push('Goal GPA must be greater than 0 and less than 5.');
  }

  if (classes.length === 1 && gradeObj.targetCredits <= gradeObj.currentCredits) {
    errorMessages.push('Target credits is less than or equal to current credits.');
  } else if (
    classes.length > 1
    && gradeObj.targetCredits <= gpaTools.getTotalCreditsFromClasses(classes)
  ) {
    errorMessages.push(
      'Your credit target is less than your current credit count with your classes.'
    );
  }

  for (let i; i < classes.length; i++) {
    const c = classes[i];
    if (!/^([a-fA-f][+-]?|[0-4][.]?[0-9]?)/.test(c.grade)) {
      errorMessages.push('A grade is invalid; must be a to f or numerical. Ex: B+, 3');
    }
  }

  return {
    hasErrors: !errorMessages.length,
    errorMessages,
  };
}

export default function passInput(input, sidebar) {
  const currentGPA = parseFloat(input[2].value);
  const goalGPA = parseFloat(input[3].value);
  const currentCredits = parseFloat(input[0].value);
  const targetCredits = parseFloat(input[1].value);
  const currentSemesterToggled = (
    input[4] !== undefined
    && input[4].name === 'current_semester_checkbox'
    && input[4].value === 'on'
  );

  const gradeObj = new GradeObject(
    currentGPA,
    goalGPA,
    currentCredits,
    targetCredits
  );
  const classes = [];

  // Add current grades to classes.
  classes.push(new ClassObject(currentGPA, currentCredits));

  if (currentSemesterToggled) {
    for (let i = 5; i < input.length; i += 2) {
      if (input[i].value !== null || parseFloat(input[i].value) !== 0) {
        classes.push(new ClassObject(input[i + 1].value, parseFloat(input[i].value)));
      }
    }
  }

  // Check for errors.
  const errors = checkForErrors(gradeObj, classes);

  // TODO: Do something.
}
