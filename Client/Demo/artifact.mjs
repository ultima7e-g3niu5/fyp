import {
    dijkstra
} from "./dijkstra.mjs";

let defaultRoadProperties;
let defaultJunctionProperties;
let defaultRoadRelativeWeighting;
let defaultJunctionRelativeWeighting;
let customRoadProperties;
let customJunctionProperties;
let customRoadRelativeWeighting;
let customJunctionRelativeWeighting;
let defaultRoadPropertiesBool;
let defaultJunctionPropertiesBool;
let defaultRoadRelativeWeightingBool;
let defaultJunctionRelativeWeightingBool;
let roadOrJunction;
let ls;
let forDijkstra = [];

function getEl(id) {
    return document.getElementById(id);
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
    
    console.log(forDijkstra);

    const resultScreenWeightingLabel = getEl('resultScreenWeightingLabel');
    const text = "The total weighting for your journey is: ";
    resultScreenWeightingLabel.textContent = text.concat(Math.floor(dijkstra().distance));

    const resultScreenNodesLabel = getEl('resultScreenNodesLabel');
    const text2 = "The nodes you will travel through are: ";
    resultScreenNodesLabel.textContent = text2.concat(dijkstra().path);
};

pageInit();

function pageInit() {
    // Display initial elements on page load

    showMe('startScreen');

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

    ls = localStorage;

    {
        // // Hook up the "Calculate with current values" button
        // const btnUseExistingValues = getEl('btnUseExistingValues');
        // if (btnUseExistingValues.addEventListener) {
        //     // DOM2 - Modern browsers
        //     btnUseExistingValues.addEventListener('click', function () {
        //         showMe('resultScreen');
        //     });
        // } else if (btnUseExistingValues.attachEvent) {
        //     // IE (IE9 supports the above)
        //     btnUseExistingValues.attachEvent('onclick', showMe('resultScreen'));
        // } else {
        //     // DOM0 - Very old or non standard browser
        //     btnUseExistingValues.onclick = showMe('resultScreen');
        // };


        resultsBtnEventHandler(getEl('btnUseExistingValues'));
        resultsBtnEventHandler(getEl('btnUseDefaultValues'));
        resultsBtnEventHandler(getEl('btnShowResults'));

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

        // Hook up the "Customise values" button
        const btnSetDefaultValues = getEl('btnCustomiseValues');
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
        }

        // Hooking up "s1Q1Slider"
        const s1Q1SliderOnInput = getEl('s1Q1Slider');
        if (s1Q1SliderOnInput.addEventListener) {
            // DOM2 - Modern browsers
            s1Q1SliderOnInput.addEventListener('input', function () {
                getEl('s1Q1Label').innerHTML = this.value;
                customiseWeightings(true, true, 0, 0, 0, 1, this.value);
            });
        };

        // Hooking up "s1Q1ResetBtn"
        const s1Q1ResetBtn = getEl('s1Q1ResetBtn');
        if (s1Q1ResetBtn.addEventListener) {
            // DOM2 - Modern browsers
            s1Q1ResetBtn.addEventListener('click', function () {
                resetSliderToDefaultValue('s1Q1Label', 's1Q1Slider', true, true, 0, 0, 0, 1);
            });
        } else if (s1Q1ResetBtn.attachEvent) {
            // IE (IE9 supports the above)
            s1Q1ResetBtn.attachEvent('onclick', resetSliderToDefaultValue('s1Q1Label', 's1Q1Slider', true, true, 0, 0, 0, 1));
        } else {
            // DOM0 - Very old or non standard browser
            s1Q1ResetBtn.onclick = resetSliderToDefaultValue('s1Q1Label', 's1Q1Slider', true, true, 0, 0, 0, 1);
        };

        // Hook up the s1Q1Slider and s1Q1Label
        const s1Q1Slider = getEl('s1Q1Slider');
        const s1Q1Label = getEl('s1Q1Label');

        defaultOrCustom();

        if (defaultRoadPropertiesBool) {
            ls = JSON.parse(ls.defaultRoadProperties)[0][0][0][1];
        } else {
            ls = JSON.parse(ls.customRoadProperties)[0][0][0][1];
        };

        s1Q1Slider.value = ls;
        s1Q1Slider.textContent = ls;
        s1Q1Label.value = ls;
        s1Q1Label.textContent = ls;
    };
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
        ['BF', -5, "6 Lanes"],
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
        ['BC', 1, "3 Lanes"],
        ['BD', -1, "4 Lanes"],
        ['BE', -3, "5 Lanes"],
        ['BF', -5, "6 Lanes"]
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

    defaultJunctionRelativeWeighting = [2, 3, 4, 4, 1, 2, 3, 4, 5, 3, 5];

    return defaultJunctionProperties, defaultJunctionRelativeWeighting;
};

function getValue(roadOrJunction, one, two, three, four) {
    defaultOrCustom();
    if (roadOrJunction) {
        if (defaultRoadPropertiesBool) {
            document.querySelector('#s1Q1Slider').innerHTML = localStorage.defaultRoadProperties[one][two][three][four];
            document.querySelector('#s1Q1Label').innerHTML = localStorage.defaultRoadProperties[one][two][three][four];
            document.querySelector('#s1Q1Slider').value = localStorage.defaultRoadProperties[one][two][three][four];
            document.querySelector('#s1Q1Label').value = localStorage.defaultRoadProperties[one][two][three][four];

        } else {
            document.querySelector('#s1Q1Slider').innerHTML = localStorage.customRoadProperties[one][two][three][four];
            document.querySelector('#s1Q1Label').innerHTML = localStorage.customRoadProperties[one][two][three][four];
            document.querySelector('#s1Q1Slider').innerHTML = localStorage.customRoadProperties[one][two][three][four];
            document.querySelector('#s1Q1Label').innerHTML = localStorage.customRoadProperties[one][two][three][four];

        };
    } else {
        console.log("dufhsdiufhsd");
        if (defaultRoadPropertiesBool) {
            this.value = localStorage.defaultJunctionProperties[one][two][three][four];
        } else {
            this.value = localStorage.customJunctionProperties[one][two][three][four];
        };
    };

};

function resetSliderToDefaultValue(labelID, sliderID, roadOrJunction, singleOrRelative, one, two, three, four) {
    var value = JSON.parse(localStorage.defaultRoadProperties)[one][two][three][four];

    getEl(labelID).innerHTML = value;
    getEl(sliderID).value = value;

    customiseWeightings(roadOrJunction, singleOrRelative, one, two, three, four, getEl(sliderID).value);
};

function customiseWeightings(roadOrJunction, singleOrRelative, one, two, three, four, newValue) {
    if (singleOrRelative) {
        if (roadOrJunction) {
            defaultOrCustom();
            if (defaultRoadPropertiesBool) {
                var customisingRoadProperties = JSON.parse(localStorage.defaultRoadProperties);
            } else {
                var customisingRoadProperties = JSON.parse(localStorage.customRoadProperties);
            };

            customisingRoadProperties[one][two][three][four] = newValue;

            localStorage.customRoadProperties = JSON.stringify(customisingRoadProperties);

        } else {
            if (defaultJunctionPropertiesBool) {
                var customisingJunctionProperties = JSON.parse(localStorage.defaultJunctionProperties);
            } else {
                var customisingJunctionProperties = JSON.parse(localStorage.customJunctionProperties);
            };

            customisingJunctionProperties[one][two][three][four] = newValue;

            localStorage.customJunctionProperties = JSON.stringify(customisingJunctionProperties);
        };
    } else {
        if (roadOrJunction) {
            defaultOrCustom();
            if (defaultRoadPropertiesBool) {
                var customisingRoadRelativeWeighting = JSON.parse(localStorage.defaultRoadRelativeWeighting);
            } else {
                var customisingRoadRelativeWeighting = JSON.parse(localStorage.customRoadRelativeWeighting);
            };

            customisingRoadRelativeWeighting[one] = newValue;

            localStorage.customRoadRelativeWeighting = JSON.stringify(customisingRoadRelativeWeighting);

        } else {
            if (defaultJunctionPropertiesBool) {
                var customisingJunctionRelativeWeighting = JSON.parse(localStorage.defaultJunctionRelativeWeighting);
            } else {
                var customisingJunctionRelativeWeighting = JSON.parse(localStorage.customJunctionRelativeWeighting);
            };

            customisingJunctionRelativeWeighting[one] = newValue;

            localStorage.customJunctionRelativeWeighting = JSON.stringify(customisingJunctionRelativeWeighting);
        };
    };
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