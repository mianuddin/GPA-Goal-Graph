function roundToTwo(num) {
  return +(Math.round(num + 'e+2') + 'e-2');
}

export function getCreditsRemaining(targetCredits, maxCredits = 220) {
  return maxCredits - targetCredits;
}

export function calculateTargetGPA(currentGPA, goalGPA, currentCredits, targetCredits) {
  const targetGradePoints = goalGPA * targetCredits;
  const currentGradePoints = currentGPA * currentCredits;
  const creditDifference = targetCredits - currentCredits;
  const targetGPA = (targetGradePoints - currentGradePoints) / (creditDifference);
  return roundToTwo(targetGPA);
}

export function calculateGradeNumber(input) {
  let gradenum = 0;
  const thegrade = input;
  if (/^([a-fA-f][+-]?|[0-4][.]?[0-9]?)$/.test(thegrade)) {
    if (thegrade === 'A+' || thegrade === 'a+') gradenum = 4.3333333;
    else if (thegrade === 'A' || thegrade === 'a') gradenum = 4.0000000;
    else if (thegrade === 'A-' || thegrade === 'a-') gradenum = 3.6666666;
    else if (thegrade === 'B+' || thegrade === 'b+') gradenum = 3.3333333;
    else if (thegrade === 'B' || thegrade === 'b') gradenum = 3.0000000;
    else if (thegrade === 'B-' || thegrade === 'b-') gradenum = 2.6666666;
    else if (thegrade === 'C+' || thegrade === 'c+') gradenum = 2.3333333;
    else if (thegrade === 'C' || thegrade === 'c') gradenum = 2.0000000;
    else if (thegrade === 'C-' || thegrade === 'c-') gradenum = 1.6666666;
    else if (thegrade === 'D+' || thegrade === 'd+') gradenum = 1.3333333;
    else if (thegrade === 'D' || thegrade === 'd') gradenum = 1.0000000;
    else if (thegrade === 'D-' || thegrade === 'd-') gradenum = 0.6666666;
    else if (thegrade === 'F+' || thegrade === 'f+') gradenum = 0.0000000;
    else if (thegrade === 'F' || thegrade === 'f') gradenum = 0.0000000;
    else if (thegrade === 'F-' || thegrade === 'f-') gradenum = 0.0000000;
    else gradenum = parseFloat(thegrade);
  }
  return gradenum;
}

export function getTotalCreditsFromClasses(classes) {
  return classes.reduce((previousValue, currentValue) => (
    previousValue + currentValue.credits
  ), 0);
}

export function getTotalGradePointsFromClasses(classes) {
  return classes.reduce((previousValue, currentValue) => (
    previousValue + currentValue.gradePoints
  ), 0);
}

export function getTotalGPAFromClasses(classes) {
  return getTotalGradePointsFromClasses(classes) / getTotalCreditsFromClasses(classes);
}
