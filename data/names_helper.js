(function (jsonFile) {

    function loadJSON(callback) {

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', jsonFile, true);
        xobj.onreadystatechange = function() {
            if (xobj.readyState == 4 && xobj.status == "200") {

                // .open will NOT return a value but simply returns undefined in async mode so use a callback
                callback(xobj.responseText);

            }
        }
        xobj.send(null);

    }
    
    window.addEventListener("load", function(event) {
       loadJSON(function(response) {
           let data = JSON.parse(response);

           if (window.onnJsonNamesloaded != null) {
               window.onnJsonNamesloaded(data);
           }
       });
    });
})('https://raw.githubusercontent.com/p1ratrulezzz/cumberbatch/master/data/names.json');
