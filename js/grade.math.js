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
            return this.maxCredits - this.target_credits;
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
        displayModule.display(obj, sidebar);
    };

    return my;
})();