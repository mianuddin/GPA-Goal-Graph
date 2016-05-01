/* eslint-env mocha */
import { expect } from 'chai';
import * as gpaTools from '../src/controller/gpaTools';

describe('gpa tools', () => {
  describe('calculateGradeNumber', () => {
    it('parses letter grade inputs correctly', () => {
      const valueOfUppercaseA = gpaTools.calculateGradeNumber('A');
      const valueOfLowercaseA = gpaTools.calculateGradeNumber('a');
      const valueOfUppercaseAMinus = gpaTools.calculateGradeNumber('A-');
      const valueOfLowercaseAMinus = gpaTools.calculateGradeNumber('a-');

      expect(valueOfUppercaseA).to.equal(4);
      expect(valueOfLowercaseA).to.equal(4);
      expect(valueOfUppercaseAMinus).to.equal(3.6666666);
      expect(valueOfLowercaseAMinus).to.equal(3.6666666);
    });
  });

  describe('getCreditsRemaining', () => {
    it('returns the correct difference', () => {
      const randomNumber = Math.floor(Math.random() * (300 - 0));
      const defaultMaxCredits = gpaTools.getCreditsRemaining(0);
      const subtractFromDefault = gpaTools.getCreditsRemaining(randomNumber);
      const subtractFromCustom = gpaTools.getCreditsRemaining(randomNumber, 500);

      expect(subtractFromDefault).to.equal(defaultMaxCredits - randomNumber);
      expect(subtractFromCustom).to.equal(500 - randomNumber);
    });
  });
});
