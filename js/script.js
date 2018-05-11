(function() {
  function regenerate() {
    let cucumbers = buildCamberbatchName();

    let name = cucumbers.shift() + ' ' + cucumbers.shift();

    document.getElementById('box').innerHTML = name;
  }

  // Use the body of this function to write custom scripts to trigger when all JSON data is loaded.
  function dataLoaded() {
    regenerate();
  }

  document.getElementById('generate-button').addEventListener('click', regenerate);



  /***************  YOU SHAL NOT TOUUUCH!! *****************************/
  var names = {};

  // Load names.
  window.onJsonNamesloaded = function(data) {
    names = data;

    dataLoaded();
  };

  function random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  function buildCamberbatchName(firstName, lastName) {

    // @link: https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
    function pickRandomProperty(obj) {
      var result;
      var count = 0;
      for (var prop in obj)
          if (Math.random() < 1/++count)
             result = prop;
      return result;
    }


    if (firstName === undefined) {
      firstName = pickRandomProperty(names.first);
    }

    if (lastName === undefined) {
      lastName = pickRandomProperty(names.last);
    }

    // We can't build name if
    if (
      (firstName === undefined || names.first[ firstName.toLocaleLowerCase()[0] ] === undefined) ||
      (lastName === undefined || names.last[ lastName.toLocaleLowerCase()[0] ] === undefined)
    ) {
      return false;
    }

    let bNames = [];
    let firstNames = names.first[ firstName.toLocaleLowerCase()[0] ];
    let lastNames = names.last[ lastName.toLocaleLowerCase()[0] ];

    bNames.push(firstNames[ random(0, firstNames.length - 1) ]);
    bNames.push(lastNames[ random(0, lastNames.length - 1) ]);

    return bNames;
  }

})();

// Copy btn name 
function copy(event) {
  // Выборка ссылки с электронной почтой 
  var box = document.getElementById('box'); 
  var range = document.createRange();  
  range.selectNode(box);  
  window.getSelection().addRange(range);  
    
  try {  
    // Теперь, когда мы выбрали текст ссылки, выполним команду копирования
    var successful = document.execCommand('copy');  
    var msg = successful ? 'successful' : 'unsuccessful';  
    console.log('Copy email command was ' + msg);  
  } catch(err) {  
    console.log('Oops, unable to copy');  
  }  
    
  // Снятие выделения - ВНИМАНИЕ: вы должны использовать
  // removeRange(range) когда это возможно
  window.getSelection().removeAllRanges();  
}
document.getElementById('resultCopy').addEventListener('click', copy);

// End Copy btn name