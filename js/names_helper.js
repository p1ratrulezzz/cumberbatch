(function (jsonFile) {

    function loadJSON(callback) {

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', jsonFile, true);
        xobj.onerror = function(e) {
            alert("Error " + e.target.status + " occurred while receiving the document. Try to refresh the page");
        };
        
        xobj.onreadystatechange = function() {
            if (xobj.readyState == 4 && xobj.status == "200") {

                // .open will NOT return a value but simply returns undefined in async mode so use a callback
                callback(xobj.responseText);
            }
        }
        xobj.send(null);

    }
    
    window.onload = function(event) {
       loadJSON(function(response) {
           let data = JSON.parse(response);

           function triggerJsonData() {
               if (window.onJsonNamesloaded != null) {
                   window.onJsonNamesloaded(data);
               }
               else {
                   setTimeout(triggerJsonData, 100);
               }
           }
           
           triggerJsonData();
       });
    };
})('https://cdn.jsdelivr.net/gh/p1ratrulezzz/cumberbatch@0.0.1/data/names.json');
