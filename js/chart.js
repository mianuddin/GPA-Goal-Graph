var displayModule = (function () {

})();

var graphModule = (function () {
	var my = {};
    var CREDIT_INCREMENT = 5,
        X_AXIS_LENGTH = 12,
        Y_AXIS_LENGTH = 12;

    function generateXAxisBounds(gradeObject, xLength) {
        var xValues = [],
            halfXLength = xLength/2;

        if ( (gradeObject.credits - halfXLength) < 0 ) {
            xValues.push( 0 );
        } else {
            xValues.push( gradeObject.credits - 20 );
        }

        xValues.push( gradeObject.target_credits + 20 );

        console.log('== generated x bounds ==');
        console.log(xValues);

        return xValues;
    }

    function generateXAxisLabels(xAxisBounds) {
        var labelArray = [];

        for(var i=xAxisBounds[0]; i<=xAxisBounds[1]; i+=CREDIT_INCREMENT) {
            labelArray.push(i);
        }

        console.log('== generated x labels ==');
        console.log(labelArray);

        return labelArray;
    }

    function generateDataSets(gradeObject, xAxisBounds) {
        var xTicks = (xAxisBounds[1]-xAxisBounds[0])/CREDIT_INCREMENT,
            nullTicks = (gradeObject.credits-xAxisBounds[0])/CREDIT_INCREMENT,
            arrayLength = xTicks+nullTicks,
            dataArray = Array(arrayLength).fill(null),
            averageArray = Array(arrayLength).fill(null),
            apArray = Array(arrayLength+5).fill(4),
            unachieveableArray = Array(arrayLength+5).fill(5);

        var place = 0;
        for(var i=nullTicks; i<=nullTicks+((gradeObject.target_credits-gradeObject.credits)/CREDIT_INCREMENT); i++) {
            var yPos = (((gradeObject.getTargetGPA()-gradeObject.currentGPA)/(gradeObject.target_credits-gradeObject.credits))*place) + gradeObject.currentGPA;
            console.log(gradeObject.getTargetGPA() + ' ' + gradeObject.currentGPA + ' ' + place);
            place += 5;
            dataArray[i] = yPos;

            if(nullTicks+((gradeObject.target_credits-gradeObject.credits)/CREDIT_INCREMENT) == i) {
                averageArray[i] = gradeObject.goalGPA;
            } else {
                averageArray[i] = null;
            }
        }

        return {data: dataArray, average: averageArray, ap: apArray, unachieveable: unachieveableArray};
    }

    function orderedGPAArray(x, y) {
        if (x > y)
            return [x, y];
        return [y, x];
    }

    function generateYAxisValues(gradeObject) {
        var largerGPA = orderedGPAArray(gradeObject.currentGPA, gradeObject.getTargetGPA())[0],
            smallerGPA = orderedGPAArray(gradeObject.currentGPA, gradeObject.getTargetGPA())[1],
            increment = 0.1,
            ticksArray = [];

        if((largerGPA-smallerGPA) !== 0)
            increment = (largerGPA-smallerGPA)/8;

        var buffer = 2*increment;

        for(var z=(smallerGPA-buffer); z<=(largerGPA+buffer); z+=increment) {
            ticksArray.push(z.round(3));
        }

        return {array: ticksArray, increment: increment, buffer: buffer, largerGPA: largerGPA, smallerGPA: smallerGPA};
    }

    function toggleArea(yAxisValues) {
        return {unachieveable: (yAxisValues.array[yAxisValues.array.length-1] > 5),
                ap: (yAxisValues.array[yAxisValues.array.length-1] > 4) };
    }

    my.fill = function(gradeObject) {
        var xAxisValues = generateXAxisBounds(gradeObject, (X_AXIS_LENGTH * 5)),
            xStart = xAxisValues[0],
            xMax = xAxisValues[1],
            yAxisValues = generateYAxisValues(gradeObject);

        var data = {
            labels: generateXAxisLabels(xAxisValues),
            series: [ 
                {
                    name: 'unachieveableLine',
                    data: generateDataSets(gradeObject, xAxisValues).unachieveable
                },
                {
                    name: 'apLine',
                    data: generateDataSets(gradeObject, xAxisValues).ap
                },
                {
                    name: 'currentGPA',
                    data: generateDataSets(gradeObject, xAxisValues).data,
                },
                {
                    name: 'averageGPA',
                    data: generateDataSets(gradeObject, xAxisValues).average
                },
            ],
        };

        
        var responsiveOptions = [
            ['screen and (max-width: 768px)', {
                axisX: {
                    labelInterpolationFnc: function(value, index) {
                        return index % 3 === 0 ?  value : null;
                    }
                }
            }]
        ];
        
        /* global Chartist */
        new Chartist.Line('.ct-chart', data, {
            lineSmooth: false,
            axisY: {
                type: Chartist.FixedScaleAxis,
                ticks: yAxisValues.array,
                high: yAxisValues.largerGPA+yAxisValues.buffer,
                low: yAxisValues.smallerGPA-yAxisValues.buffer,
            },
            axisX: {
                position: 'start'
            },
            series: {
                'apLine': {
                    showArea: toggleArea(yAxisValues).ap,
                    areaBase: 5,
                    showLine: toggleArea(yAxisValues).ap,
                    showPoint: false
                },
                'unachieveableLine': {
                    showArea: toggleArea(yAxisValues).unachieveable,
                    areaBase: yAxisValues.array[yAxisValues.array.length-1],
                    showLine: toggleArea(yAxisValues).unachieveable,
                    showPoint: false
                }
            },
        }, responsiveOptions);  
    };

	return my;
}());