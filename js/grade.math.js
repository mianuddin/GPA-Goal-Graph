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

function computeGradenum(input) {
    var gradenum = 0;
    var thegrade = input;
    if (thegrade == "A" || thegrade == "a") gradenum = 4.0000000;
    else if (thegrade == "A-" || thegrade == "a-") gradenum = 3.6666666;
    else if (thegrade == "B+" || thegrade == "b+") gradenum = 3.3333333;
    else if (thegrade == "B" || thegrade == "b") gradenum = 3.0000000;
    else if (thegrade == "B-" || thegrade == "b-") gradenum = 2.6666666;
    else if (thegrade == "C+" || thegrade == "c+") gradenum = 2.3333333;
    else if (thegrade == "C" || thegrade == "c") gradenum = 2.0000000;
    else if (thegrade == "C-" || thegrade == "c-") gradenum = 1.6666666;
    else if (thegrade == "D+" || thegrade == "d+") gradenum = 1.3333333;
    else if (thegrade == "D" || thegrade == "d") gradenum = 1.0000000;
    else if (thegrade == "D-" || thegrade == "d-") gradenum = 0.6666666;
    else if (thegrade == "F" || thegrade == "f") gradenum = 0.0000000;
    else gradenum = parseFloat(thegrade);
    return gradenum;
}

function totalCredits(classes) {
    var total = 0;
    for(var i=0; i<classes.length; i++) {
        total += classes[i].units;
    }
    return total;
}

function totalGradePoints(classes) {
    var total = 0;
    for(var i=0; i<classes.length; i++) {
        total += classes[i].grade_points;
    }
    return total;
}

function totalGPA(classes) {
    return totalGradePoints(classes)/totalCredits(classes);
}

function passInput(input, sidebar) {
    var gpa = parseFloat(input[1].value),
        goal = parseFloat(input[2].value),
        credits = parseFloat(input[0].value);

    if(input[3] !== undefined) {
        if(input[3].name === 'current_semester_checkbox' && input[3].value === 'on') {
            var classes = [];

            classes.push({units: credits, grade: gpa, grade_points: credits*gpa});

            for(var i=4; i<input.length; i+=2) {
                if(input[i].value !== null || parseFloat(input[i].value) !== 0) {
                    var classObj = { units: parseFloat(input[i].value), grade: computeGradenum(input[i+1].value), grade_points: parseFloat(input[i].value)*computeGradenum(input[i+1].value) };
                    classes.push(classObj);
                }
            }

            gpa = totalGPA(classes);
            credits = totalCredits(classes);
        }
    }

    var obj = new gradeObject(gpa, goal, credits);
    console.log(obj);
    display(obj, sidebar);
}

function display(gradeObject, sidebar) {

    if(sidebar == 1) {
        $('#formContainer').removeClass('container');
        $('#formContainer').addClass('sidebar');
        $('#formContainer').addClass('col');
        $('#formContainer').addClass('s3');
        $('form>.row>.input-field').removeClass('m6');
        $('#classlist li').removeClass('m6');
        $('.card .input-field').removeClass('s6');
        $('.card .input-field').addClass('s12');
    }

    if(gradeObject.isAchieveable()) {
        $('#resultBox>span').html("<div class='col s6'> <h2>GPA to achieve (to avg. <span id='gpa_goal'></span>): <span id='gpa_achieve'></span></h2> </div> <div class='col s6'> <h2>Credits Remaining: <span id='credits_remaining'></span></h2> </div>");
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