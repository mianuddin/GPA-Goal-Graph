function getFormAnswers() {
    var numOfQuestions = [].slice.call( theForm.querySelectorAll( 'ol.questions > li' ) ).length;
    var answers = [];
    for(var x=1; x<=numOfQuestions; x++) {
        answers.push($('#q' + x).val());
    }
    return answers;
}

function hideForm() {
    classie.addClass( theForm.querySelector( '.simform-inner' ), 'hide' );
    $('section').css('animation','fadeOut 0.6s ease-out');
    $('section').css('display', 'none');
    $('.container').css('padding', '0 0 24px 0');
}

var theForm = document.getElementById( 'theForm' );

new stepsForm( theForm, {
    onSubmit : function( form ) {
        var formAnswers = getFormAnswers();

        // Update state.
        History.Adapter.bind(window,'statechange',function(){
            var State = History.getState();
        });
        History.pushState(null, null, '?currentGPA=' + formAnswers[0] + '&credits=' + formAnswers[1] + '&goalGPA=' + formAnswers[2]);

        hideForm();

        passInput();
    }
});

function display(gradeObject) {

    if(gradeObject.isAchieveable()) {
        $('#result').html('GPA to achieve (to avg. ' + gradeObject.goalGPA + '): <strong id="target">' + gradeObject.getTargetGPA() + '</strong></br> Credits Remaining: <strong>' + gradeObject.getCreditsRemaining() + '</strong>');
    } else {
        $('#result').html('This goal is unachieveable.');
    }

    graph.fill(gradeObject);

    $('.ct-chart').css('animation','result_fadeIn 0.6s ease-in');
    $('.ct-chart').css('height', '70vh');
    $('#resultBox').css('animation','result_fadeIn 0.6s ease-in');
    $('#resultBox').css('height', 'auto');
    $('#key').css('display', 'block');
}