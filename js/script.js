(function() {
  const CONST_BTN_SPACE = '32';
  
  function regenerate() {
    let cucumbers = buildCamberbatchName();

    let name = cucumbers.shift() + ' ' + cucumbers.shift();

    document.getElementById('box').innerHTML = name;
  }

  // Use the body of this function to write custom scripts to trigger when all JSON data is loaded.
  function dataLoaded() {
    regenerate();
  }

  // Attach listeners
  document.getElementById('generate-button').addEventListener('click', regenerate);
  document.getElementById('resultCopy').addEventListener('click', copyTextToCB);
  
  document.addEventListener('keydown', function(e) {
    if(e.which == CONST_BTN_SPACE) {
      regenerate();
    }
  });
  
  var names = {};

  // Load names.
  window.onJsonNamesloaded = function(data) {
    names = data;

    dataLoaded();
  };

  function random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  }
  
  /**
   *  @link: https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
   */
  function pickRandomProperty(obj) {
    let result;
    let count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
  }

  function buildCamberbatchName(firstName, lastName) {
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
  
  function copyTextToCB(event) {
    let box = document.getElementById('box'); 
    let range = document.createRange();  
    range.selectNode(box);  
    window.getSelection().addRange(range);  

    try {  
      // Теперь, когда мы выбрали текст ссылки, выполним команду копирования
      let successful = document.execCommand('copy');  
      let msg = successful ? 'successful' : 'unsuccessful';  
      console.log('Copy email command was ' + msg);  
    }
    catch(err) {  
      console.log('Oops, unable to copy');  
    }  

    // Снятие выделения - ВНИМАНИЕ: вы должны использовать
    // removeRange(range) когда это возможно
    window.getSelection().removeAllRanges();  
  }
  
})();
