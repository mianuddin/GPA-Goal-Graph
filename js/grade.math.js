Number.prototype.round = function(places) {
  return +(Math.round(this + "e+" + places)  + "e-" + places);
};

function gradeObject(currentGPA, goalGPA, credits) {
    this.maxCredits = 220;

    this.currentGPA = currentGPA;
    this.goalGPA = goalGPA;
    this.credits = credits;

    this.getCreditsRemaining = function getCreditsRemaining() {
        return this.maxCredits - this.credits;
    };

    this.getTargetGPA = function calculateTargetGPA() {
        var targetGPA = ((this.goalGPA * this.maxCredits) - (this.currentGPA * this.credits)) / (this.maxCredits - this.credits);
        return targetGPA.round(2);
    };

    this.isAchieveable = function isThisAchieveable() {
        return (this.getTargetGPA() <= 5);
    };
}

function passInput() {
    var gpa = parseFloat(decodeURIComponent(getURLParameter('currentGPA'))),
        goal = parseFloat(decodeURIComponent(getURLParameter('goalGPA'))),
        credits = parseInt(decodeURIComponent(getURLParameter('credits'))),
        obj = new gradeObject(gpa, goal, credits);

    display(obj);
}