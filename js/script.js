(function() {
  /**
   * Fix for IE.
   *
   * @link https://stackoverflow.com/a/32589923
   * @type {HTMLScriptElement | SVGScriptElement | null | *}
   */
  document.currentScript = document.currentScript || (function() {
    let scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  window.is_mobile = document.currentScript.getAttribute('mobile') == "true" || false;

  const BTN_SPACE = '32';
  const LANGUAGE_DEFAULT = 'en';
  
  // @fixme: Move to names.json
  const LANGS_SUPPORTED = {
    'en': {
      title: 'English',
      flagimage: '' //@todo: Add flag images
    },
    'ru': {
      title: 'Русский',
      flagimage: '', //@todo: Add flag images
    }
  };
  
  function regenerate() {
    let cucumbers = buildCamberbatchName();

    let name = cucumbers.shift() + ' ' + cucumbers.shift();

    if (document.getElementById('generate-button').getAttribute('cmb:updatable') == "1") {
      document.getElementById('generate-button').innerHTML = name;
    }
    else {
      document.getElementById('box').innerHTML = name;
    }
  }

  // Use the body of this function to write custom scripts to trigger when all JSON data is loaded.
  function dataLoaded() {
    regenerate();
    if (window.is_mobile === false) {
      window.initialZoom();
    }
    else {
      window.mobileAdjustTitle();
    }
  }

  // Attach listeners
  document.getElementById('generate-button').addEventListener('click', regenerate);
  document.getElementById('resultCopy').addEventListener('click', copyTextToCB);
  
  document.addEventListener('keydown', function(e) {
    if(e.which == BTN_SPACE) {
      regenerate();
    }
  });
  
  var names = {};
  var language = LANGUAGE_DEFAULT;

  function switchLanguage(lang) {
    "use strict";

    if (lang === undefined) {
      let hash = location.hash && location.hash.substr(1) || null;

      lang = hash || navigator.language || navigator.userLanguage || LANGUAGE_DEFAULT;
      
      // Process values like 'ru-RU', we need only first part
      lang = lang.split('-').shift();
    }
    
    // Fallback to English if language is not supported
    if (LANGS_SUPPORTED[lang] == null) {
      lang = 'en';
    }

    location.hash = '#' + lang;

    language = lang;
  }

  // Load names.
  window.onJsonNamesloaded = function(data) {
    names = data;

    // Try to detect user's language
    switchLanguage();

    // Build reverse map for best matches.
    ["ru", "en"].forEach(function(langcode) {
      let map = names["best_combinations_" + langcode];
      Object.getOwnPropertyNames(map).forEach(function(prop) {
        let map_id = map[prop];
        map[map_id] = prop;
      });
    });

    // Fallback compatibility.
    names.first_ru = names.first;
    names.last_ru = names.last;

    // Main entrypoint
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
    for (let prop in obj) {
        if (Math.random() < 1/++count) {
           result = prop;
        }
    }
    
    return result;
  }

  function buildCamberbatchName(firstName, lastName) {
    let langcode = language;
    let bestMatchesMap = names["best_combinations_" + langcode] || {};
    let firstnames = names['first_' + langcode] || names.first_en;
    let lastnames = names['last_' + langcode] || names.last_en;


    console.log("best_combinations_" + langcode);
    if (firstName === undefined) {
      firstName = pickRandomProperty(firstnames);
    }

    if (lastName === undefined) {
      lastName = pickRandomProperty(lastnames);
    }

    // We can't build name if
    if (
      (firstName === undefined || firstnames[ firstName.toLocaleLowerCase()[0] ] === undefined) ||
      (lastName === undefined || lastnames[ lastName.toLocaleLowerCase()[0] ] === undefined)
    ) {
      return false;
    }

    let bNames = [];

    let firstNameLetter = firstName.toLocaleLowerCase()[0];
    let lastNameLetter = lastName.toLocaleLowerCase()[0];

    let cucubmernamesFirst = firstnames[ firstNameLetter];
    let cucubmernamesLast = lastnames[ lastNameLetter ];

    // Check if have best match
    let firstNameIndex = random(0, cucubmernamesFirst.length - 1);
    let lastNameIndex = random(0, cucubmernamesLast.length - 1);

    // Check firstname best match.
    let map_id = "firstname_" + firstNameLetter + '_' + firstNameIndex;
    if (bestMatchesMap[map_id] != null) {
      let mapDetails = bestMatchesMap[map_id].split('_');
      cucubmernamesLast = lastnames[mapDetails[1]];
      lastNameIndex = mapDetails[2];
    }

    // Check lastname best match.
    map_id = "lastname" + lastNameLetter + '_' + lastNameIndex;
    if (bestMatchesMap[map_id] != null) {
      let mapDetails = bestMatchesMap[map_id].split('_');
      cucubmernamesFirst = lastnames[mapDetails[1]];
      firstNameIndex = mapDetails[2];
    }

    bNames.push(cucubmernamesFirst[ firstNameIndex ]);
    bNames.push(cucubmernamesLast[ lastNameIndex ]);

    return bNames;
  }
  
  function copyTextToCB(event) {
    let box = document.getElementById('box'); 
    let range = document.createRange();  
    range.selectNode(box);  
    window.getSelection().addRange(range);  

    try {
      let successful = document.execCommand('copy');  
      let msg = successful ? 'successful' : 'unsuccessful';  
    }
    catch(err) {  
      // console.log('Oops, unable to copy');
    }

    window.getSelection().removeAllRanges();  
  }

  window.initialZoom = function () {
    if (window.screen.availWidth > 1024) {
      return;
    }
    
    // Initial zoom 0.28 for resolution of 304500
    let newZoom = Math.floor(((window.screen.availWidth * 0.28) / 375) * 1000) / 1000;
    document.body.style.zoom = newZoom;
    console.log("zoom adjust newzoom=", newZoom);
  }

  window.mobileAdjustTitle = function() {
    /**
     * 1366 - 60vh
     * availHeight - x
     */
    document.getElementById('result-wrapper').style["margin-top"] = (60 * window.screen.availHeight / 1366) + 'vh';
  }

  if (window.is_mobile === false) {
    window.addEventListener("load", initialZoom);
    window.addEventListener("resize", initialZoom);
  }
  
  // <!------ Rambler.Likes script start ------>
  (function() {
  var init = function() {
  RamblerShare.init('.rambler-share', {
    "style": {
      "buttonHeight": 35,
      "iconSize": 21,
      "borderRadius": 18,
      "borderWidth": 2
    },
    "utm": "utm_medium=social",
    "counters": true,
    "buttons": [
      "vkontakte",
      "facebook",
      "odnoklassniki",
      "livejournal",
      "twitter",
      "telegram",
      "viber",
      "whatsapp",
      "copy"
    ]
  });
  };
  var script = document.createElement('script');
  script.onload = init;
  script.async = true;
  script.src = 'https://developers.rambler.ru/likes/v1/widget.js';
  document.head.appendChild(script);
  })();
  
})();
