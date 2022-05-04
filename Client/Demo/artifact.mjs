import {
    dijkstra
} from "./dijkstra.mjs";

// import {
//     populateDefaultRoadProperties,
//     populateDefaultRoadRelativeWeightings,
//     populateDefaultJunctionProperties,
//     populateDefaultJunctionRelativeWeightings
// } from "./defaultProperties.mjs";

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

pageInit();

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

    for (const element of elements) {
        element.style.display = 'none';
    }
    getEl(elem).style.display = 'block';

    if (elem == "customPage1" || elem == "customPage2" || elem == "customPage3" || elem == "customPage4" || elem == "votingInstructions") {
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

    // const resultScreenWeightingLabel = getEl('resultScreenWeightingLabel');
    // const text = "The total weighting for your journey is: ";
    // resultScreenWeightingLabel.textContent = text.concat(Math.floor(dijkstraReturn.distance));

    const resultScreenNodesLabel = getEl('resultScreenNodesLabel');
    resultScreenResultsLabel.textContent = "The nodes you will travel through are: ";
    const text = "<pre>";
    resultScreenNodesLabel.innerHTML = text.concat(dijkstraReturn.path.join("   >   ").replace("start", "0").replace("end", "60"));
};

function defaultOrCustom() {
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

        getEl("labelDefaultExistingCustomise").textContent = "Default";
        getEl("btnUseDefaultValues").style.display = "inline-block";
        getEl("btnUseExistingValues").style.display = "none";
        getEl("btnSetDefaultValues").style.display = "none";
    } else if ((ls.customRoadProperties != ls.defaultRoadProperties ||
            ls.customJunctionProperties != ls.defaultJunctionProperties ||
            ls.customRoadRelativeWeighting != defaultRoadRelativeWeighting ||
            ls.customJunctionRelativeWeighting != defaultJunctionRelativeWeighting) &&
        !(defaultRoadPropertiesBool && defaultJunctionPropertiesBool &&
            defaultRoadRelativeWeightingBool && defaultJunctionRelativeWeightingBool)) {
        getEl("labelDefaultExistingCustomise").textContent = "Customised";
        getEl("btnSetDefaultValues").style.display = "inline-block";
        getEl("btnUseDefaultValues").style.display = "none";
        getEl("btnUseExistingValues").style.display = "inline-block";
    } else {
        getEl("labelDefaultExistingCustomise").textContent = "Default";
        getEl("btnSetDefaultValues").style.display = "none";
        getEl("btnUseDefaultValues").style.display = "inline-block";
        getEl("btnUseExistingValues").style.display = "none";
    };
};

function setDefaultValues() {
    defaultOrCustom();
    if (!defaultRoadPropertiesBool) {
        localStorage.removeItem('customRoadProperties');
    };
    if (!defaultRoadRelativeWeightingBool) {
        localStorage.removeItem('customRoadRelativeWeighting');
    };
    if (!defaultJunctionPropertiesBool) {
        localStorage.removeItem('customJunctionProperties');
    };
    if (!defaultJunctionRelativeWeightingBool) {
        localStorage.removeItem('customJunctionRelativeWeighting');
    };
    window.location.reload();
};

function setEventHandlers() {
    ls = localStorage;

    // Hook up the "Customise values" button
    const btnCustomiseValues = getEl('btnCustomiseValues');
    if (btnCustomiseValues.addEventListener) {
        // DOM2 - Modern browsers
        btnCustomiseValues.addEventListener('click', function () {
            showMe('customPage1');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
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
            showMe('customPage1');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
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
            showMe('customPage2');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
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
            showMe('customPage3');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
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
            showMe('customPage4');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } else if (btnShowS4.attachEvent) {
        // IE (IE9 supports the above)
        btnShowS4.attachEvent('onclick', showMe('customPage4'));
    } else {
        // DOM0 - Very old or non standard browser
        btnShowS4.onclick = showMe('customPage4');
    };

    // Hook up the "Instructions" button
    const btnShowInstructions = getEl('btnShowInstructions');
    if (btnShowInstructions.addEventListener) {
        // DOM2 - Modern browsers
        btnShowInstructions.addEventListener('click', function () {
            showMe('startScreen');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } else if (btnShowInstructions.attachEvent) {
        // IE (IE9 supports the above)
        btnShowInstructions.attachEvent('onclick', showMe('startScreen'));
    } else {
        // DOM0 - Very old or non standard browser
        btnShowInstructions.onclick = showMe('startScreen');
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
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } else if (id.attachEvent) {
        // IE (IE9 supports the above)
        id.attachEvent('onclick', showMe('resultScreen'));
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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

    // s4 - Junction Relative Weighting
    setupInputs('s4Q1Slider', 's4Q1Label', 's4Q1ResetBtn', 'junction', 'relative', 0);
    setupInputs('s4Q2Slider', 's4Q2Label', 's4Q2ResetBtn', 'junction', 'relative', 1);
    setupInputs('s4Q3Slider', 's4Q3Label', 's4Q3ResetBtn', 'junction', 'relative', 2);
    setupInputs('s4Q4Slider', 's4Q4Label', 's4Q4ResetBtn', 'junction', 'relative', 3);
    setupInputs('s4Q5Slider', 's4Q5Label', 's4Q5ResetBtn', 'junction', 'relative', 4);
    setupInputs('s4Q6Slider', 's4Q6Label', 's4Q6ResetBtn', 'junction', 'relative', 5);
    setupInputs('s4Q7Slider', 's4Q7Label', 's4Q7ResetBtn', 'junction', 'relative', 6);
    setupInputs('s4Q8Slider', 's4Q8Label', 's4Q8ResetBtn', 'junction', 'relative', 7);
    setupInputs('s4Q9Slider', 's4Q9Label', 's4Q9ResetBtn', 'junction', 'relative', 8);
    setupInputs('s4Q10Slider', 's4Q10Label', 's4Q10ResetBtn', 'junction', 'relative', 9);
};

function setupInputs(sliderID, labelId, resetBtn, roadOrJunction, singleOrRelative, one, two, three, four) {
    sliderEl = getEl(sliderID);
    if (sliderEl.addEventListener) {
        // DOM2 - Modern browsers
        sliderEl.addEventListener('input', function () {
            getEl(labelId).textContent = this.value;
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
        if (roadOrJunction == 'road') {
            defaultOrCustom();
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
    defaultOrCustom();
    if (singleOrRelative == 'single') {
        if (roadOrJunction == 'road') {
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
            console.log(1)
            let customisingRoadRelativeWeighting;
            if (defaultRoadRelativeWeightingBool) {
                customisingRoadRelativeWeighting = JSON.parse(localStorage.defaultRoadRelativeWeighting);
            } else {
                customisingRoadRelativeWeighting = JSON.parse(localStorage.customRoadRelativeWeighting);
            };

            customisingRoadRelativeWeighting[one] = newValue;

            localStorage.customRoadRelativeWeighting = JSON.stringify(customisingRoadRelativeWeighting);

        } else {
            console.log(2)
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
        if (roadOrJunction == 'road') {
            value = JSON.parse(ls.defaultRoadRelativeWeighting)[one];
        } else {
            value = JSON.parse(ls.defaultJunctionRelativeWeighting)[one];
        };
    };

    getEl(labelID).textContent = value;
    getEl(sliderID).value = value;

    customiseWeightings(roadOrJunction, singleOrRelative, one, two, three, four, parseInt(getEl(sliderID).value), 10);
};

function populateDefaultRoadProperties() {
    const speedLimit = [
        ['AA', 5, "10mph"],
        ['AB', 4, "20mph"],
        ['AC', 3, "30mph"],
        ['AD', 0, "40mph"],
        ['AE', -2, "50mph"],
        ['AF', -4, "60mph"],
        ['AG', -5, "70mph"]
    ];

    const noOfLanes = [
        ['BA', 5, "1 Lane"],
        ['BB', 3, "2 Lanes"],
        ['BC', 1, "3 Lanes"],
        ['BD', -1, "4 Lanes"],
        ['BE', -3, "5 Lanes"],
        ['BF', -5, "6 Lanes"]
    ];

    const trafficFlow = [
        ['CA', 0, "One way"],
        ['CB', -2, "Two way"]
    ];

    const bikeLane = [
        ['GA', 3, "Continuous, clearly marked"],
        ['GB', -4, "Interrupted"],
        ['GC', -2, "Hard to follow"],
        ['GD', 0, "No bike lane"]
    ];

    const busLane = [
        ['HA', 4, "Continuous, clearly marked"],
        ['HB', -3, "Interrupted"],
        ['HC', -1, "Hard to follow"],
        ['HD', 0, "No bus lane"]
    ];

    const trafficCalmingMeasure = [
        ['IA', 0, "None"],
        ['IB', 0, "Traffic Lights"],
        ['IC', 3, "Bicycle Priority Traffic Lights"],
        ['ID', -1, "Speed Bumps"],
        ['IE', -2, "Width Restriction Islands"],
        ['IF', -3, "Narrowing Islands"],
        ['IG', 2, "Speed Camera"]
    ];

    const noOfAdjacentRoadsCrossed = [
        ['JA', 5, "0"],
        ['JB', 4, "1"],
        ['JC', 3, "2"],
        ['JD', 2, "3"],
        ['JE', 1, "4"],
        ['JF', -1, "5"],
        ['JG', -2, "6"],
        ['JH', -3, "7"],
        ['JI', -4, "8"],
        ['JJ', -5, "9"]
    ];

    const rateOfTraffic = [
        ['KA', 0, "Low"],
        ['KB', -2, "Medium"],
        ['KC', -5, "High"]
    ];

    defaultRoadProperties = [
        [speedLimit],
        [noOfLanes],
        [trafficFlow],
        [bikeLane],
        [busLane],
        [trafficCalmingMeasure],
        [noOfAdjacentRoadsCrossed],
        [rateOfTraffic]
    ];

    defaultRoadRelativeWeighting = [5, 4, 2, 5, 4, 2, 1, 4];

    return defaultRoadProperties, defaultRoadRelativeWeighting;
};

function populateDefaultJunctionProperties() {
    const junctionType = [
        ['AA', 2, "Mini Roundabout"],
        ['AB', 4, "Roundabout"],
        ['AC', 0, "T Junction"],
        ['AD', -2, "Crossroads"],
        ['AE', -1, "Slip Road"]
    ];

    const noOfLanes = [
        ['BA', 5, "1 Lane"],
        ['BB', 3, "2 Lanes"],
        ['BC', 2, "3 Lanes"],
        ['BD', 1, "4 Lanes"],
        ['BE', -1, "5 Lanes"],
        ['BF', -3, "6 Lanes"],
        ['BG', -4, "7 Lanes"],
        ['BH', -4, "8 Lanes"],
        ['BI', -5, "9 Lanes"],
        ['BJ', -5, "10 Lanes"]
    ];

    const trafficFlow = [
        ['CA', 0, "One way"],
        ['CB', -2, "Two way"]
    ];

    const turningDirection = [
        ['DA', 0, "Left"],
        ['DB', -5, "Right"],
        ['DC', -3, "Straight"]
    ];

    const rightOfWay = [
        ['FA', 0, "Yes"],
        ['FB', -4, "No"]
    ];

    const bikeLane = [
        ['GA', 3, "Continuous, clearly marked"],
        ['GB', -3, "Interrupted"],
        ['GC', -4, "Hard to follow"],
        ['GD', 0, "No bike lane"]
    ];

    const busLane = [
        ['HA', 4, "Continuous, clearly marked"],
        ['HB', -1, "Interrupted"],
        ['HC', -3, "Hard to follow"],
        ['HD', 0, "No bus lane"]
    ];

    const trafficLights = [
        ['IA', 0, "No"],
        ['IB', 3, "Yes"],
        ['IC', 5, "Bicycle Priority"]
    ];

    const directionsOfTraffic = [
        ['JA', 5, "1"],
        ['JB', 4, "2"],
        ['JC', 3, "3"],
        ['JD', 2, "4"],
        ['JE', 0, "5"],
        ['JF', -1, "6"],
        ['JG', -2, "7"],
        ['JH', -4, "8"],
        ['JI', -5, "9"]
    ];

    const rateOfTraffic = [
        ['KA', 0, "Low"],
        ['KB', -2, "Medium"],
        ['KC', -5, "High"]
    ];

    defaultJunctionProperties = [
        [junctionType],
        [noOfLanes],
        [trafficFlow],
        [turningDirection],
        [rightOfWay],
        [bikeLane],
        [busLane],
        [trafficLights],
        [directionsOfTraffic],
        [rateOfTraffic]
    ];

    defaultJunctionRelativeWeighting = [2, 3, 4, 1, 2, 3, 4, 5, 3, 5];

    return defaultJunctionProperties, defaultJunctionRelativeWeighting;
};