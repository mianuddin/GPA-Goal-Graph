/* eslint-env mocha */
import { expect } from 'chai';
import { calculateGradeNumber } from '../src/controller/gpaTools';

describe('gpa tools', () => {
  describe('calculateGradeNumber', () => {
    it('parses letter grade inputs correctly', () => {
      const valueofUppercaseA = calculateGradeNumber('A');
      const valueofLowercaseA = calculateGradeNumber('a');
      expect(valueofUppercaseA).to.equal(4);
      expect(valueofLowercaseA).to.equal(4);
    });
  });
});
