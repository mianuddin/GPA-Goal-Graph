var graph = (function () {
    var          my = {},
             maxGPA = 2.2,
         maxCredits = 220,
       gpaIncrement = 0.1,
    creditIncrement = 5;

    function generateXAxis(credits) {
        var xValues = [],
            xLength = 60,
            halfXLength = xLength/2;

        // Find find start.
        if ( (credits - halfXLength) < 0 ) {
            xValues.push( 0 );
        } else if ( (credits + halfXLength) > 220 ) {
            xValues.push( 220 - xLength );
        } else {
            xValues.push( credits - halfXLength );
        }

        // Find max.
        xValues.push( xValues[0] + xLength );

        console.log("Input: " + credits + "; xValues: " + xValues);
        return xValues;
    }

    function generateYAxis(gpa) {
        var xValues = [],
            xLength = 60,
            halfXLength = xLength/2;

        // Find find start.
        if ( (credits - halfXLength) < 0 ) {
            xValues.push( 0 );
        } else if ( (credits + halfXLength) > 220 ) {
            xValues.push( 220 - xLength );
        } else {
            xValues.push( credits - halfXLength );
        }

        // Find max.
        xValues.push( xValues[0] + xLength );

        console.log("Input: " + credits + "; xValues: " + xValues);
        return xValues;
    }

    my.fill = function (gpaInput, credits, goal, targetGPA) {
        var labelArray = [],
            xAxisValues = generateXAxis(credits),
            xStart = xAxisValues[0],
            xMax = xAxisValues[1];

        for(var i=xStart; i<=xMax; i+=creditIncrement) {
            labelArray.push(i);
        }
        
        var dataArray = [],
            averageArray = [];
        var xTicks = (xMax-xStart)/creditIncrement;
        var nullTicks = (credits-xStart)/creditIncrement;
        for(var x=0; x<nullTicks; x++) {
            dataArray.push(null);
            averageArray.push(null);
        }
        dataArray.push(parseFloat(gpaInput));
        averageArray.push(null);
        dataArray.push(parseFloat(targetGPA));
        averageArray.push(parseFloat(goal));
        for(var y=nullTicks; y<=xTicks-1; y++) {
            dataArray.push(null);
            averageArray.push(null);
        }
        console.log(dataArray);

        var largerGPA = 0,
            smallerGPA = 0;

        if (gpaInput > targetGPA) {
            largerGPA = gpaInput;
            smallerGPA = targetGPA;
        } else {
            largerGPA = targetGPA;
            smallerGPA = gpaInput;
        }
        
        var ticksArray = [];

        console.log(((largerGPA+0.2)-(smallerGPA-0.2))/gpaIncrement );

        if (((largerGPA+0.2)-(smallerGPA-0.2))/gpaIncrement > 12) {
            gpaIncrement = 0.2;
        }

        for(var z=(smallerGPA-0.2); z<=(largerGPA+0.2); z+=gpaIncrement) {
            ticksArray.push(Math.round(10*z)/10);
        }
        console.log(ticksArray);
        console.log(labelArray.length + ' ' + dataArray.length);
        // Data for the chart library.
        var data = {
          labels: labelArray,
          series: [ {
              name: 'Current GPA',
              data: dataArray
            },
            {
              name: 'Average GPA',
              data: averageArray
            }
            ]
        };
        
        // Create the chart using the data.
        /* global Chartist */
        new Chartist.Line('.ct-chart', data, {
            axisY: {
                type: Chartist.FixedScaleAxis,
                ticks: ticksArray,
                high: largerGPA+0.2,
                low: smallerGPA-0.2
            },
            axisX: {
                // On the x-axis start means top and end means bottom
                position: 'start'
            }
        });  
    };

    return my;
}());

function roundTwoPlaces(num) {
    return Math.round(num * 100) / 100;
}

function calculate() {
    var gpa = parseFloat(decodeURIComponent(getURLParameter('currentGPA')));
    var goal = parseFloat(decodeURIComponent(getURLParameter('goalGPA')));
    var credits = parseInt(decodeURIComponent(getURLParameter('credits')));
    var creditsRemaining = 220-credits;
    var targetGPA = roundTwoPlaces(((goal*220)-(gpa*credits))/(220-credits));
    if(targetGPA < 5.0) {
        $('#result').html('GPA to achieve (to avg. ' + goal +'): <strong id="target">' + targetGPA + '</strong></br> Credits Remaining: <strong>' + creditsRemaining + '</strong>');
    } else {
        $('#result').html('This goal is unachieveable.');
    }
    graph.fill(gpa, credits, goal, targetGPA);
    $('.ct-chart').css('animation','result_fadeIn 0.6s ease-in');
    $('.ct-chart').css('height', '70vh');
    $('#resultBox').css('animation','result_fadeIn 0.6s ease-in');
    $('#resultBox').css('height', 'auto');
    $('#key').css('display', 'block');
}

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
        // update state
        // Bind to StateChange Event
        History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
            var State = History.getState(); // Note: We are using History.getState() instead of event.state
        });
        History.pushState(null, null, '?currentGPA=' + formAnswers[0] + '&credits=' + formAnswers[1] + '&goalGPA=' + formAnswers[2]);

        hideForm();

        calculate();
    }
});

function getURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}


// On Page Load
(function () {
    var urlParameters = window.location.search.substring(1);
    if(urlParameters !== '' && 
        getURLParameter('currentGPA') !== undefined && 
        getURLParameter('credits') !== undefined && 
        getURLParameter('goalGPA') !== undefined) {
        hideForm();
        calculate();
    }
}());