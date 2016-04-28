import * as gpaTools from './gpaTools';

export default class ClassObject {
  constructor(name, grade, credits) {
    this.name = name;
    this.gradeInput = grade;
    this.grade = gpaTools.calculateGradeNumber(grade);
    this.credits = credits;
    this.gradePoints = credits * this.grade;
  }
}
