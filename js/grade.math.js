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

    $('#formContainer').removeClass('container');
    $('#formContainer').addClass('sidebar');
    $('#formContainer').addClass('col');
    $('#formContainer').addClass('s3');
    $('form>.row>.input-field').removeClass('m6');
    $('#classlist li').removeClass('m6');
    $('.card .input-field').removeClass('s6');
    $('.card .input-field').addClass('s12');

    if(gradeObject.isAchieveable()) {
        $('#result').html('GPA to achieve (to avg. ' + gradeObject.goalGPA + '): <strong id="target">' + gradeObject.getTargetGPA() + '</strong></br> Credits Remaining: <strong>' + gradeObject.getCreditsRemaining() + '</strong>');
        $('#gpa_goal').html(gradeObject.goalGPA);
        $('#gpa_achieve').html(gradeObject.getTargetGPA());
        $('#credits_remaining').html(gradeObject.getCreditsRemaining());
    } else {
        $('#resultBox>span').html('<h2>This goal is unachieveable.</h2>');
    }

    if(gradeObject.getTargetGPA() > 4 && gradeObject.getTargetGPA() <= 5) {
        $('#graphKey>div:first-child').removeClass('s7');
        $('#graphKey>div:first-child').addClass('s3');
        $('#graphKey>div:first-child').css('padding', '0 20px 0 0');
        $('#conditional').css('display', 'block');
        $('#ap').css('display', 'block');
        $('#unach').css('display', 'none');
    } else if(gradeObject.getTargetGPA() > 5) {
        $('#graphKey>div:first-child').removeClass('s7');
        $('#graphKey>div:first-child').addClass('s3');
        $('#graphKey>div:first-child').css('padding', '0 20px 0 0');
        $('#conditional').css('display', 'block');
        $('#unach').css('display', 'block');
        $('#ap').css('display', 'none');
    } else {
        $('#graphKey>div:first-child').addClass('s7');
        $('#graphKey>div:first-child').removeClass('s3');
        $('#graphKey>div:first-child').css('padding', '0');
        $('#conditional').css('display', 'none');
        $('#unach').css('display', 'none');
        $('#ap').css('display', 'none');
    }

    graph.fill(gradeObject);

    $('.ct-chart').css('height', '70vh');
    $('#resultBox').css('height', 'auto');
    $('.hide').removeClass('hide');
}