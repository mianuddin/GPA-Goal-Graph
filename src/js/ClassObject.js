export default class ClassObject {
  constructor(currentGPA, currentCredits) {
    this.grade = currentGPA;
    this.credits = currentCredits;
    this.gradePoints = currentCredits * currentGPA;
  }
}
