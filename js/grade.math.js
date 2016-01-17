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

function passInput(input) {
    var gpa = parseFloat(input[1].value),
        goal = parseFloat(input[2].value),
        credits = parseFloat(input[0].value),
        obj = new gradeObject(gpa, goal, credits);
    console.log(obj);
    display(obj);
}

function display(gradeObject) {

    if(gradeObject.isAchieveable()) {
        $('#result').html('GPA to achieve (to avg. ' + gradeObject.goalGPA + '): <strong id="target">' + gradeObject.getTargetGPA() + '</strong></br> Credits Remaining: <strong>' + gradeObject.getCreditsRemaining() + '</strong>');
    } else {
        $('#result').html('This goal is unachieveable.');
    }

    if(gradeObject.getTargetGPA() > 4 && gradeObject.getTargetGPA() <= 5) {
        $('#ap').css('display', 'block');
    } else if(gradeObject.getTargetGPA() > 5) {
        $('#unach').css('display', 'block');
    }

    graph.fill(gradeObject);

    $('.ct-chart').css('height', '70vh');
    $('#resultBox').css('height', 'auto');
    $('.hidden').css('display', 'block');
}