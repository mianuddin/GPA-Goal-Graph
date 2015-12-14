var graph = (function () {
	var my = {};
    var CREDIT_INCREMENT = 5,
        X_AXIS_LENGTH = 12,
        Y_AXIS_LENGTH = 12;

    function generateXAxisBounds(credits, xLength) {
        var xValues = [],
            halfXLength = xLength/2;

        if ( (credits - halfXLength) < 0 ) {
            xValues.push( 0 );
        } else if ( (credits + halfXLength) > 220 ) {
            xValues.push( 220 - xLength );
        } else {
            xValues.push( credits - halfXLength );
        }

        xValues.push( xValues[0] + xLength );

        return xValues;
    }

    function generateXAxisLabels(xAxisBounds) {
        var labelArray = [];

        for(var i=xAxisBounds[0]; i<=xAxisBounds[1]; i+=CREDIT_INCREMENT) {
            labelArray.push(i);
        }

        return labelArray;
    }

    function generateDataSets(gradeObject, xAxisBounds) {
        var dataArray = Array(arrayLength).fill(null),
            averageArray = Array(arrayLength).fill(null),
            xTicks = (xAxisBounds[1]-xAxisBounds[0])/CREDIT_INCREMENT,
            nullTicks = (gradeObject.credits-xAxisBounds[0])/CREDIT_INCREMENT,
            arrayLength = xTicks+nullTicks;

        dataArray[nullTicks] = parseFloat(gradeObject.currentGPA);
        averageArray[nullTicks] = null;

        dataArray[nullTicks+1] = parseFloat(gradeObject.getTargetGPA());
        averageArray[nullTicks+1] = gradeObject.goalGPA;

        return {data: dataArray, average: averageArray};
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
            ticksArray.push(Math.round(10*z)/10);
        }

        return {array: ticksArray, increment: increment, buffer: buffer, largerGPA: largerGPA, smallerGPA: smallerGPA};
    }

    my.fill = function(gradeObject) {
        var xAxisValues = generateXAxisBounds(gradeObject.credits, (X_AXIS_LENGTH * 5)),
            xStart = xAxisValues[0],
            xMax = xAxisValues[1],
            yAxisValues = generateYAxisValues(gradeObject);

        var data = {
          labels: generateXAxisLabels(xAxisValues),
          series: [ {
              name: 'Current GPA',
              data: generateDataSets(gradeObject, xAxisValues).data
            },
            {
              name: 'Average GPA',
              data: generateDataSets(gradeObject, xAxisValues).average
            }
            ]
        };
        
        /* global Chartist */
        new Chartist.Line('.ct-chart', data, {
            axisY: {
                type: Chartist.FixedScaleAxis,
                ticks: yAxisValues.array,
                high: yAxisValues.largerGPA+yAxisValues.buffer,
                low: yAxisValues.smallerGPA-yAxisValues.buffer
            },
            axisX: {
                position: 'start'
            }
        });  
    };

	return my;
}());