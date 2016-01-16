// Run on page load.

// (function () {
//     var urlParameters = window.location.search.substring(1);
//     if(urlParameters !== '' && 
//         getURLParameter('currentGPA') !== undefined && 
//         getURLParameter('credits') !== undefined && 
//         getURLParameter('goalGPA') !== undefined) {
//         passInput();
//     }
// }());

// Helper functions.

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

Number.prototype.round = function(places) {
  return +(Math.round(this + "e+" + places)  + "e-" + places);
};