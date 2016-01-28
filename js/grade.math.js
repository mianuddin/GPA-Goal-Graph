// Helper function
Number.prototype.round = function(places) {
  return +(Math.round(this + 'e+' + places)  + 'e-' + places);
};

var mathModule = (function () {
    var my = {};
    function gradeObject(currentGPA, goalGPA, credits, target_credits) {
        this.maxCredits = 220;

        this.currentGPA = currentGPA;
        this.goalGPA = goalGPA;
        this.credits = credits;
        this.target_credits = target_credits;

        this.getCreditsRemaining = function getCreditsRemaining() {
            return this.maxCredits - this.credits;
        };

        this.getTargetGPA = function calculateTargetGPA() {
            var targetGPA = ((this.goalGPA * this.target_credits) - (this.currentGPA * this.credits)) / (this.target_credits - this.credits);
            return targetGPA.round(2);
        };

        this.isAchieveable = function isThisAchieveable() {
            return (this.getTargetGPA() <= 5);
        };
    }

    function computeGradenum(input) {
        var gradenum = 0;
        var thegrade = input;
        if (thegrade == 'A' || thegrade == 'a') gradenum = 4.0000000;
        else if (thegrade == 'A-' || thegrade == 'a-') gradenum = 3.6666666;
        else if (thegrade == 'B+' || thegrade == 'b+') gradenum = 3.3333333;
        else if (thegrade == 'B' || thegrade == 'b') gradenum = 3.0000000;
        else if (thegrade == 'B-' || thegrade == 'b-') gradenum = 2.6666666;
        else if (thegrade == 'C+' || thegrade == 'c+') gradenum = 2.3333333;
        else if (thegrade == 'C' || thegrade == 'c') gradenum = 2.0000000;
        else if (thegrade == 'C-' || thegrade == 'c-') gradenum = 1.6666666;
        else if (thegrade == 'D+' || thegrade == 'd+') gradenum = 1.3333333;
        else if (thegrade == 'D' || thegrade == 'd') gradenum = 1.0000000;
        else if (thegrade == 'D-' || thegrade == 'd-') gradenum = 0.6666666;
        else if (thegrade == 'F' || thegrade == 'f') gradenum = 0.0000000;
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

    my.passInput = function(input, sidebar) {
        var gpa = parseFloat(input[2].value),
            goal = parseFloat(input[3].value),
            credits = parseFloat(input[0].value),
            target_credits = parseFloat(input[1].value);

        if(input[4] !== undefined) {
            if(input[4].name === 'current_semester_checkbox' && input[4].value === 'on') {
                var classes = [];

                classes.push({units: credits, grade: gpa, grade_points: credits*gpa});

                for(var i=5; i<input.length; i+=2) {
                    if(input[i].value !== null || parseFloat(input[i].value) !== 0) {
                        var classObj = { units: parseFloat(input[i].value), grade: computeGradenum(input[i+1].value), grade_points: parseFloat(input[i].value)*computeGradenum(input[i+1].value) };
                        classes.push(classObj);
                    }
                }

                gpa = totalGPA(classes);
                credits = totalCredits(classes);
            }
        }

        var obj = new gradeObject(gpa, goal, credits, target_credits);
        display(obj, sidebar);
    };

    function showStaggered(selector, sidebar) {
        $(selector).css('opacity', '0');
        var time = 0;
        if(sidebar == 1) time = 400;
        $(selector).velocity(
            { translateX: "-100px"},
            { duration: 0 });

        $(selector).each(function() {
            $(this).velocity(
                { opacity: "1", translateX: "0"},
                { duration: 800, delay: time, easing: [60, 10] });
            time += 120;
        });
    }

    function display(gradeObject, sidebar) {

        if(sidebar == 1) {

            $('#formContainer').velocity( { width: '70%', position: 'absolute', marginLeft: 'auto', marginRight: 'auto', left: '0', right: '0'}, { duration: 0 });
            $('#formContainer').velocity( { width: '25%', position: 'absolute', marginLeft: '0', marginRight: '0', right: '100%', height: '100vh' }, { duration: 800, delay: 0, easing: [60, 10] });
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
            $('#resultBox>span').html("<div class='col s6'> <h2>GPA to achieve (to avg. <span id='gpa_goal'></span>): <span id='gpa_achieve'></span></h2> </div> <div class='col s6'> <h2>Required Credits Left: <span id='credits_remaining'></span></h2> </div>");
            $('#result').html('GPA to achieve (to avg. ' + gradeObject.goalGPA + '): <strong id="target">' + gradeObject.getTargetGPA() + '</strong></br> Required Credits Left: <strong>' + gradeObject.getCreditsRemaining() + '</strong>');
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

        graphModule.fill(gradeObject);

        $('.ct-chart').css('height', '70vh');
        $('.hide').removeClass('hide');
        showStaggered('body>.row>div', sidebar);
    }

    return my;
})();