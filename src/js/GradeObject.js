import gpaTools from './gpaTools';

export default class GradeObject {
  constructor(currentGPA, goalGPA, currentCredits, targetCredits) {
    this.maxCredits = 220;
    this.currentGPA = currentGPA;
    this.goalGPA = goalGPA;
    this.currentCredits = currentCredits;
    this.targetCredits = targetCredits;
    this.getCreditsRemaining = gpaTools.getCreditsRemaining(targetCredits);
    this.getTargetGPA = gpaTools.calculateTargetGPA(
      this.currentGPA,
      this.goalGPA,
      this.currentCredits,
      this.goalGPA
    );
    this.isAchieveable = (this.getTargetGPA <= 5);
  }
}
