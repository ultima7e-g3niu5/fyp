import {
    dijkstra
} from "./dijkstra.mjs";

import {
    populateDefaultRoadProperties,
    populateDefaultJunctionProperties
} from "./defaultProperties.mjs";

let sliderEl;
let resetBtnEl;
let labelEl;
let defaultRoadProperties;
let defaultJunctionProperties;
let defaultRoadRelativeWeighting;
let defaultJunctionRelativeWeighting;
let defaultRoadPropertiesBool;
let defaultJunctionPropertiesBool;
let defaultRoadRelativeWeightingBool;
let defaultJunctionRelativeWeightingBool;
let ls;
let forDijkstra = [];

function pageInit() {
    // Display initial elements on page load
    showMe('startScreen');
    setStartScreenButtons();
    setEventHandlers();
    setupInteractiveEventHandlers();
};

function showMe(elem) {
    const elements = document.getElementsByClassName('switchable');
    if (elem == 'resultScreen') {
        displayResultScreenValues();
    };


    if (elem == "customPage1" || elem == "customPage2") {
        console.log(23);
    };
    
    for (const element of elements) {
        element.style.display = 'none';
    }
    getEl(elem).style.display = 'block';

    if (elem == "customPage1" || elem == "customPage2") {
        getEl('bottomNavigation').style.display = 'block';
    };
};

function getEl(id) {
    return document.getElementById(id);
};

function displayResultScreenValues() {
    defaultOrCustom();
    if (defaultRoadPropertiesBool) {
        forDijkstra[0] = JSON.parse(ls.defaultRoadProperties);
    } else {
        forDijkstra[0] = JSON.parse(ls.customRoadProperties);
    };

    if (defaultRoadRelativeWeightingBool) {
        forDijkstra[1] = JSON.parse(ls.defaultRoadRelativeWeighting);
    } else {
        forDijkstra[1] = JSON.parse(ls.customRoadRelativeWeighting);
    };

    if (defaultJunctionPropertiesBool) {
        forDijkstra[2] = JSON.parse(ls.defaultJunctionProperties);
    } else {
        forDijkstra[2] = JSON.parse(ls.customJunctionProperties);
    };

    if (defaultJunctionRelativeWeightingBool) {
        forDijkstra[3] = JSON.parse(ls.defaultJunctionRelativeWeighting);
    } else {
        forDijkstra[3] = JSON.parse(ls.customJunctionRelativeWeighting);
    };

    const dijkstraReturn = dijkstra(forDijkstra);

    const resultScreenWeightingLabel = getEl('resultScreenWeightingLabel');
    const text = "The total weighting for your journey is: ";
    resultScreenWeightingLabel.textContent = text.concat(Math.floor(dijkstraReturn.distance));

    const resultScreenNodesLabel = getEl('resultScreenNodesLabel');
    const text2 = "The nodes you will travel through are: ";
    resultScreenNodesLabel.textContent = text2.concat(dijkstraReturn.path);
};

function defaultOrCustom(singleOrRelative) {
    ls = localStorage;
    if (ls.customRoadProperties == null) {
        defaultRoadPropertiesBool = true;
    } else {
        defaultRoadPropertiesBool = false;
    };

    if (ls.customRoadRelativeWeighting == null) {
        defaultRoadRelativeWeightingBool = true;
    } else {
        defaultRoadRelativeWeightingBool = false;
    };

    if (ls.customJunctionProperties == null) {
        defaultJunctionPropertiesBool = true;
    } else {
        defaultJunctionPropertiesBool = false;
    };

    if (ls.customJunctionRelativeWeighting == null) {
        defaultJunctionRelativeWeightingBool = true;
    } else {
        defaultJunctionRelativeWeightingBool = false;
    };
};

function setStartScreenButtons() {
    defaultOrCustom();
    if (defaultRoadPropertiesBool && ls.defaultRoadProperties == null) {
        populateDefaultRoadProperties();
        localStorage.defaultRoadProperties = JSON.stringify(defaultRoadProperties);
        localStorage.defaultRoadRelativeWeighting = JSON.stringify(defaultRoadRelativeWeighting);
        populateDefaultJunctionProperties();
        localStorage.defaultJunctionProperties = JSON.stringify(defaultJunctionProperties);
        localStorage.defaultJunctionRelativeWeighting = JSON.stringify(defaultJunctionRelativeWeighting);

        getEl("labelDefaultExistingCustomise").innerHTML = "Default weightings for roads and junctions have been loaded";
        getEl("btnUseDefaultValues").style.display = "inline-block";
        getEl("btnUseExistingValues").style.display = "none";
        getEl("btnSetDefaultValues").style.display = "none";
    } else if ((ls.customRoadProperties != ls.defaultRoadProperties ||
            ls.customJunctionProperties != ls.defaultJunctionProperties ||
            ls.customRoadRelativeWeighting != defaultRoadRelativeWeighting ||
            ls.customJunctionRelativeWeighting != defaultJunctionRelativeWeighting) &&
        !(defaultRoadPropertiesBool && defaultJunctionPropertiesBool &&
            defaultRoadRelativeWeightingBool && defaultJunctionRelativeWeightingBool)) {
        getEl("labelDefaultExistingCustomise").innerHTML = "Previously customised weightings for roads and junctions have been loaded";
        getEl("btnSetDefaultValues").style.display = "inline-block";
        getEl("btnUseDefaultValues").style.display = "none";
        getEl("btnUseExistingValues").style.display = "inline-block";
    } else {
        getEl("labelDefaultExistingCustomise").innerHTML = "Default weightings for roads and junctions were previously loaded but not customised";
        getEl("btnSetDefaultValues").style.display = "none";
        getEl("btnUseDefaultValues").style.display = "inline-block";
        getEl("btnUseExistingValues").style.display = "none";
    };
};

function setDefaultValues() {
    defaultOrCustom();
    if (!defaultRoadPropertiesBool) {
        localStorage.removeItem('customRoadProperties');
    } else if (!defaultRoadRelativeWeightingBool) {
        localStorage.removeItem('customRoadRelativeWeighting');
    } else if (!defaultJunctionPropertiesBool) {
        localStorage.removeItem('customJunctionProperties');
    } else if (!defaultJunctionRelativeWeightingBool) {
        localStorage.removeItem('customJunctionRelativeWeighting');
    };
    window.location.href = window.location.href;
};

function setEventHandlers() {
    ls = localStorage;

    // Hook up the "Customise values" button
    const btnCustomiseValues = getEl('btnCustomiseValues');
    if (btnCustomiseValues.addEventListener) {
        // DOM2 - Modern browsers
        btnCustomiseValues.addEventListener('click', function () {
            showMe('customPage1')
        });
    } else if (btnCustomiseValues.attachEvent) {
        // IE (IE9 supports the above)
        btnCustomiseValues.attachEvent('onclick', showMe('customPage1'));
    } else {
        // DOM0 - Very old or non standard browser
        btnCustomiseValues.onclick = showMe('customPage1');
    };

    // Hook up the "Set default Road and Junction Weightings" button
    const btnSetDefaultValues = getEl('btnSetDefaultValues');
    if (btnSetDefaultValues.addEventListener) {
        // DOM2 - Modern browsers
        btnSetDefaultValues.addEventListener('click', function () {
            setDefaultValues();
        });
    } else if (btnSetDefaultValues.attachEvent) {
        // IE (IE9 supports the above)
        btnSetDefaultValues.attachEvent('onclick', setDefaultValues());
    } else {
        // DOM0 - Very old or non standard browser
        btnSetDefaultValues.onclick = setDefaultValues();
    };

    // Hook up the "Scenario 1" button
    const btnShowS1 = getEl('btnShowS1');
    if (btnShowS1.addEventListener) {
        // DOM2 - Modern browsers
        btnShowS1.addEventListener('click', function () {
            showMe('customPage1')
        });
    } else if (btnShowS1.attachEvent) {
        // IE (IE9 supports the above)
        btnShowS1.attachEvent('onclick', showMe('customPage1'));
    } else {
        // DOM0 - Very old or non standard browser
        btnShowS1.onclick = showMe('customPage1');
    };

    // Hook up the "Scenario 2" button
    const btnShowS2 = getEl('btnShowS2');
    if (btnShowS2.addEventListener) {
        // DOM2 - Modern browsers
        btnShowS2.addEventListener('click', function () {
            showMe('customPage2')
        });
    } else if (btnShowS2.attachEvent) {
        // IE (IE9 supports the above)
        btnShowS2.attachEvent('onclick', showMe('customPage2'));
    } else {
        // DOM0 - Very old or non standard browser
        btnShowS2.onclick = showMe('customPage2');
    };

    // Hook up the "Scenario 3" button
    const btnShowS3 = getEl('btnShowS3');
    if (btnShowS3.addEventListener) {
        // DOM2 - Modern browsers
        btnShowS3.addEventListener('click', function () {
            showMe('customPage3')
        });
    } else if (btnShowS3.attachEvent) {
        // IE (IE9 supports the above)
        btnShowS3.attachEvent('onclick', showMe('customPage3'));
    } else {
        // DOM0 - Very old or non standard browser
        btnShowS3.onclick = showMe('customPage3');
    };

    // Hook up the "Scenario 4" button
    const btnShowS4 = getEl('btnShowS4');
    if (btnShowS4.addEventListener) {
        // DOM2 - Modern browsers
        btnShowS4.addEventListener('click', function () {
            showMe('customPage4')
        });
    } else if (btnShowS4.attachEvent) {
        // IE (IE9 supports the above)
        btnShowS4.attachEvent('onclick', showMe('customPage4'));
    } else {
        // DOM0 - Very old or non standard browser
        btnShowS4.onclick = showMe('customPage4');
    };

    // Hook up the "Scenario 5" button
    const btnShowS5 = getEl('btnShowS5');
    if (btnShowS5.addEventListener) {
        // DOM2 - Modern browsers
        btnShowS5.addEventListener('click', function () {
            showMe('customPage5')
        });
    } else if (btnShowS5.attachEvent) {
        // IE (IE9 supports the above)
        btnShowS5.attachEvent('onclick', showMe('customPage5'));
    } else {
        // DOM0 - Very old or non standard browser
        btnShowS5.onclick = showMe('customPage5');
    };

    // Hook up the "Scenario 6" button
    const btnShowS6 = getEl('btnShowS6');
    if (btnShowS6.addEventListener) {
        // DOM2 - Modern browsers
        btnShowS6.addEventListener('click', function () {
            showMe('customPage6')
        });
    } else if (btnShowS6.attachEvent) {
        // IE (IE9 supports the above)
        btnShowS6.attachEvent('onclick', showMe('customPage6'));
    } else {
        // DOM0 - Very old or non standard browser
        btnShowS6.onclick = showMe('customPage6');
    };

    // Hook up the "Scenario 7" button
    const btnShowS7 = getEl('btnShowS7');
    if (btnShowS7.addEventListener) {
        // DOM2 - Modern browsers
        btnShowS7.addEventListener('click', function () {
            showMe('customPage7')
        });
    } else if (btnShowS7.attachEvent) {
        // IE (IE9 supports the above)
        btnShowS7.attachEvent('onclick', showMe('customPage7'));
    } else {
        // DOM0 - Very old or non standard browser
        btnShowS7.onclick = showMe('customPage7');
    };

    // Hook up the "Scenario 8" button
    const btnShowS8 = getEl('btnShowS8');
    if (btnShowS8.addEventListener) {
        // DOM2 - Modern browsers
        btnShowS8.addEventListener('click', function () {
            showMe('customPage8')
        });
    } else if (btnShowS8.attachEvent) {
        // IE (IE9 supports the above)
        btnShowS8.attachEvent('onclick', showMe('customPage8'));
    } else {
        // DOM0 - Very old or non standard browser
        btnShowS8.onclick = showMe('customPage8');
    };

    // Hook up the "Scenario 9" button
    const btnShowS9 = getEl('btnShowS9');
    if (btnShowS9.addEventListener) {
        // DOM2 - Modern browsers
        btnShowS9.addEventListener('click', function () {
            showMe('customPage9')
        });
    } else if (btnShowS9.attachEvent) {
        // IE (IE9 supports the above)
        btnShowS9.attachEvent('onclick', showMe('customPage9'));
    } else {
        // DOM0 - Very old or non standard browser
        btnShowS9.onclick = showMe('customPage9');
    };

    resultsBtnEventHandler(getEl('btnUseExistingValues'));
    resultsBtnEventHandler(getEl('btnUseDefaultValues'));
    resultsBtnEventHandler(getEl('btnShowResults'));
};

function resultsBtnEventHandler(id) {
    if (id.addEventListener) {
        // DOM2 - Modern browsers
        id.addEventListener('click', function () {
            showMe('resultScreen');
        });
    } else if (id.attachEvent) {
        // IE (IE9 supports the above)
        id.attachEvent('onclick', showMe('resultScreen'));
    } else {
        // DOM0 - Very old or non standard browser
        id.onclick = showMe('resultScreen');
    };
};

function setupInteractiveEventHandlers() {
    // s1 - Road Bicycle Lanes
    setupInputs('s1Q1Slider', 's1Q1Label', 's1Q1ResetBtn', 'road', 'single', 3, 0, 3, 1);
    setupInputs('s1Q2Slider', 's1Q2Label', 's1Q2ResetBtn', 'road', 'single', 3, 0, 1, 1);
    setupInputs('s1Q3Slider', 's1Q3Label', 's1Q3ResetBtn', 'road', 'single', 3, 0, 0, 1);
    setupInputs('s1Q4Slider', 's1Q4Label', 's1Q4ResetBtn', 'road', 'single', 3, 0, 2, 1);

    // s2 - Junction Right of Way
    setupInputs('s2Q1Slider', 's2Q1Label', 's2Q1ResetBtn', 'junction', 'single', 4, 0, 0, 1);
    setupInputs('s2Q2Slider', 's2Q2Label', 's2Q2ResetBtn', 'junction', 'single', 4, 0, 1, 1);

    // s3 - Road Relative Weighting
    setupInputs('s3Q1Slider', 's3Q1Label', 's3Q1ResetBtn', 'road', 'relative', 0);
    setupInputs('s3Q2Slider', 's3Q2Label', 's3Q2ResetBtn', 'road', 'relative', 1);
    setupInputs('s3Q3Slider', 's3Q3Label', 's3Q3ResetBtn', 'road', 'relative', 2);
    setupInputs('s3Q4Slider', 's3Q4Label', 's3Q4ResetBtn', 'road', 'relative', 3);
    setupInputs('s3Q5Slider', 's3Q5Label', 's3Q5ResetBtn', 'road', 'relative', 4);
    setupInputs('s3Q6Slider', 's3Q6Label', 's3Q6ResetBtn', 'road', 'relative', 5);
    setupInputs('s3Q7Slider', 's3Q7Label', 's3Q7ResetBtn', 'road', 'relative', 6);
    setupInputs('s3Q8Slider', 's3Q8Label', 's3Q8ResetBtn', 'road', 'relative', 7);
};

function setupInputs(sliderID, labelId, resetBtn, roadOrJunction, singleOrRelative, one, two, three, four) {
    sliderEl = getEl(sliderID);
    if (sliderEl.addEventListener) {
        // DOM2 - Modern browsers
        sliderEl.addEventListener('input', function () {
            getEl(labelId).innerHTML = this.value;
            customiseWeightings(roadOrJunction, singleOrRelative, one, two, three, four, parseInt(this.value, 10));
        });
    };

    // Hooking up "resetBtn"
    resetBtnEl = getEl(resetBtn);
    if (resetBtnEl.addEventListener) {
        // DOM2 - Modern browsers
        resetBtnEl.addEventListener('click', function () {
            resetSliderToDefaultValue(labelId, sliderID, roadOrJunction, singleOrRelative, one, two, three, four);
        });
    } else if (resetBtnEl.attachEvent) {
        // IE (IE9 supports the above)
        resetBtnEl.attachEvent('onclick', resetSliderToDefaultValue(labelId, sliderID, roadOrJunction, singleOrRelative, one, two, three, four));
    } else {
        // DOM0 - Very old or non standard browser
        resetBtnEl.onclick = resetSliderToDefaultValue(labelId, sliderID, roadOrJunction, singleOrRelative, one, two, three, four);
    };

    // Hook up the sliderEl and labelEl
    // const sliderEl = getEl(sliderEl);
    labelEl = getEl(labelId);

    defaultOrCustom();
    if (singleOrRelative == 'single') {
        if (roadOrJunction == 'road') {
            defaultOrCustom();
            if (defaultRoadPropertiesBool) {
                ls = JSON.parse(ls.defaultRoadProperties)[one][two][three][four];
            } else {
                ls = JSON.parse(ls.customRoadProperties)[one][two][three][four];
            };
        } else {
            if (defaultJunctionPropertiesBool) {
                ls = JSON.parse(ls.defaultJunctionProperties)[one][two][three][four];
            } else {
                ls = JSON.parse(ls.customJunctionProperties)[one][two][three][four];
            };
        };
    } else {
        if (roadOrJunction = 'road') {
            defaultOrCustom();
                console.log(JSON.parse(ls.defaultRoadRelativeWeighting)[one]);
            if (defaultRoadRelativeWeightingBool) {
                ls = JSON.parse(ls.defaultRoadRelativeWeighting)[one];
            } else {
                ls = JSON.parse(ls.customRoadRelativeWeighting)[one];
            };
        } else {
            if (defaultJunctionRelativeWeightingBool) {
                ls = JSON.parse(ls.defaultJunctionRelativeWeighting)[one];
            } else {
                ls = JSON.parse(ls.customJunctionRelativeWeighting)[one];
            };
        };
    };

    sliderEl.value = ls;
    sliderEl.textContent = ls;
    labelEl.value = ls;
    labelEl.textContent = ls;
};

function customiseWeightings(roadOrJunction, singleOrRelative, one, two, three, four, newValue) {
    if (singleOrRelative == 'single') {
        if (roadOrJunction == 'road') {
            defaultOrCustom();
            let customisingRoadProperties;
            if (defaultRoadPropertiesBool) {
                customisingRoadProperties = JSON.parse(localStorage.defaultRoadProperties);
            } else {
                customisingRoadProperties = JSON.parse(localStorage.customRoadProperties);
            };

            customisingRoadProperties[one][two][three][four] = newValue;

            localStorage.customRoadProperties = JSON.stringify(customisingRoadProperties);

        } else {
            let customisingJunctionProperties;
            if (defaultJunctionPropertiesBool) {
                customisingJunctionProperties = JSON.parse(localStorage.defaultJunctionProperties);
            } else {
                customisingJunctionProperties = JSON.parse(localStorage.customJunctionProperties);
            };

            customisingJunctionProperties[one][two][three][four] = newValue;

            localStorage.customJunctionProperties = JSON.stringify(customisingJunctionProperties);
        };
    } else {
        if (roadOrJunction == 'road') {
            defaultOrCustom();
            let customisingRoadRelativeWeighting;
            if (defaultRoadRelativeWeightingBool) {
                customisingRoadRelativeWeighting = JSON.parse(localStorage.defaultRoadRelativeWeighting);
            } else {
                customisingRoadRelativeWeighting = JSON.parse(localStorage.customRoadRelativeWeighting);
            };

            customisingRoadRelativeWeighting[one] = newValue;

            localStorage.customRoadRelativeWeighting = JSON.stringify(customisingRoadRelativeWeighting);

        } else {
            let customisingJunctionRelativeWeighting;
            if (defaultJunctionRelativeWeightingBool) {
                customisingJunctionRelativeWeighting = JSON.parse(localStorage.defaultJunctionRelativeWeighting);
            } else {
                customisingJunctionRelativeWeighting = JSON.parse(localStorage.customJunctionRelativeWeighting);
            };

            customisingJunctionRelativeWeighting[one] = newValue;

            localStorage.customJunctionRelativeWeighting = JSON.stringify(customisingJunctionRelativeWeighting);
        };
    };
};

function resetSliderToDefaultValue(labelID, sliderID, roadOrJunction, singleOrRelative, one, two, three, four) {
    defaultOrCustom();
    let value = 0
    if (singleOrRelative == 'single') {
        if (roadOrJunction == 'road') {
            value = JSON.parse(ls.defaultRoadProperties)[one][two][three][four];
        } else {
            value = JSON.parse(ls.defaultJunctionProperties)[one][two][three][four];
        };
    } else {
        if (roadOrJunction = 'road') {
            value = JSON.parse(ls.defaultRoadRelativeWeighting)[one];
        } else {
            value = JSON.parse(ls.defaultJunctionRelativeWeighting)[one];
        };
    };

    getEl(labelID).innerHTML = value;
    getEl(sliderID).value = value;

    customiseWeightings(roadOrJunction, singleOrRelative, one, two, three, four, getEl(sliderID).value);
};

pageInit();