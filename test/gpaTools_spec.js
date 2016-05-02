/* eslint-env mocha */
import { expect } from 'chai';
import * as gpaTools from '../src/controller/gpaTools';
import ClassObj from '../src/controller/ClassObject';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

describe('gpa tools', () => {
  describe('getCreditsRemaining', () => {
    it('returns the correct difference', () => {
      const randomNumber = getRandomInt(0, 300);
      const subtractFromCustom = gpaTools.getCreditsRemaining(randomNumber, 500);

      expect(subtractFromCustom).to.equal(500 - randomNumber);
    });
  });

  describe('calculateTargetGPA', () => {
    it('calculates the correct GPA for an incoming freshman', () => {
      const randomGPAGoal = getRandomInt(-5, 5);
      const calculatedTargetGPA = gpaTools.calculateTargetGPA(0, randomGPAGoal, 0, 30);

      expect(calculatedTargetGPA).to.equal(randomGPAGoal);
    });

    it('calculates the correct target GPA', () => {
      const fixedCalculatedTargetGPA = gpaTools.calculateTargetGPA(1, 2, 120, 150);

      expect(fixedCalculatedTargetGPA).to.equal(6);
    });
  });

  describe('calculateGradeNumber', () => {
    it('parses letter grade inputs correctly', () => {
      const valueOfUppercaseA = gpaTools.calculateGradeNumber('A');
      const valueOfLowercaseA = gpaTools.calculateGradeNumber('a');
      const valueOfUppercaseAMinus = gpaTools.calculateGradeNumber('A-');
      const valueOfLowercaseAMinus = gpaTools.calculateGradeNumber('a-');

      expect(valueOfUppercaseA).to.equal(4);
      expect(valueOfLowercaseA).to.equal(4);
      expect(valueOfUppercaseAMinus).to.equal(3.66);
      expect(valueOfLowercaseAMinus).to.equal(3.66);
    });
  });

  describe('getTotalCreditsFromClasses', () => {
    it('calculates the correct total number of credits', () => {
      const classes = [];
      let totalCredits = 0;

      for (let i = 0; i <= getRandomInt(1, 7); i++) {
        const randomCredits = getRandomInt(0, 20);
        totalCredits += randomCredits;
        classes.push(new ClassObj('', 4, randomCredits));
      }

      const calculatedTotal = gpaTools.getTotalCreditsFromClasses(classes);

      expect(calculatedTotal).to.equal(totalCredits);
    });
  });

  describe('getTotalGradePointsFromClasses', () => {
    it('calculates the correct total number of grade points', () => {
      const classes = [];
      let totalGradePoints = 0;

      for (let i = 0; i <= getRandomInt(1, 7); i++) {
        const randomCredits = getRandomInt(0, 20);
        const randomGrade = getRandomInt(0, 4);
        totalGradePoints += (randomCredits * randomGrade);
        classes.push(new ClassObj('', randomGrade, randomCredits));
      }

      const calculatedTotal = gpaTools.getTotalGradePointsFromClasses(classes);

      expect(calculatedTotal).to.equal(totalGradePoints);
    });
  });

  describe('getTotalGPAFromClasses', () => {
    it('calculates the correct total gpa', () => {
      const classes = [];
      classes.push(new ClassObj('', 3, 5));
      classes.push(new ClassObj('', 2, 5));
      classes.push(new ClassObj('', 0, 5));
      classes.push(new ClassObj('', 2, 10));
      const calculatedTotalGPA = gpaTools.getTotalGPAFromClasses(classes);

      expect(calculatedTotalGPA).to.equal(1.80);
    });

    it('behaves like original gpa calculator', () => {
      const classes = [];
      classes.push(new ClassObj('', 3, 5));
      classes.push(new ClassObj('', 'a+', 10));
      classes.push(new ClassObj('', 'F-', 5));
      classes.push(new ClassObj('', 8, 20));
      classes.push(new ClassObj('', 'b+', 6));
      const calculatedTotalGPA = gpaTools.getTotalGPAFromClasses(classes);

      expect(calculatedTotalGPA).to.equal(0.76);
    });
  });
});
