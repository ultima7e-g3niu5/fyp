import {
    dijkstra
} from "./static.mjs";

const csvForm = getEl("csvForm");
const csvFile = getEl("csvFile");
let defaultRoadProperties;
let defaultJunctionProperties;
let defaultRoadRelativeWeighting;
let defaultJunctionRelativeWeighting;
let customRoadProperties;
let customJunctionProperties;
let customRoadRelativeWeighting;
let customJunctionRelativeWeighting;
let defaultRoad;
let defaultJunction;
let roadOrJunction;




csvForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = decisionMapCSVFile.files[0];
    const csvReader = new FileReader();

    csvReader.onload = function (e) {
        const text = e.target.result;
        const decisionMapArray = convertCSVToArray(text);

        if (localStorage.getItem("csvFile") == null) {
            localStorage.setItem("decisionMap", decisionMapArray);
            console.log(localStorage.getItem("decisionMap"));
        }
    };
    csvReader.readAsText(input);
});

function getEl(id) {
    return document.getElementById(id);
};

function showMe(elem) {
    const elements = document.getElementsByClassName('switchable');

    for (const element of elements) {
        element.style.display = 'none';
    }
    getEl(elem).style.display = 'block';
};
// const q = JSON.parse(localStorage.defaultRoadProperties);

pageInit();

function pageInit() {
    // Display initial elements on page load

    const ls = localStorage;

    showMe('startScreen');

    defaultOrCustom();

    if (ls.defaultRoadProperties == null &&
        ls.defaultJunctionProperties == null &&
        ls.defaultRoadRelativeWeighting == null &&
        ls.defaultJunctionRelativeWeighting == null &&
        ls.customRoadProperties == null &&
        ls.customJunctionProperties == null &&
        ls.customRoadRelativeWeighting == null &&
        ls.customJunctionRelativeWeighting == null) {
        populateDefaultRoadProperties();
        localStorage.defaultRoadProperties = JSON.stringify(defaultRoadProperties);
        localStorage.defaultRoadRelativeWeighting = JSON.stringify(defaultRoadRelativeWeighting);
        populateDefaultJunctionProperties();
        localStorage.defaultJunctionProperties = JSON.stringify(defaultJunctionProperties);
        localStorage.defaultJunctionRelativeWeighting = JSON.stringify(defaultJunctionRelativeWeighting);


        getEl("labelDefaultExistingCustomise").innerHTML = "Default weightings for roads and junctions have been loaded";
        getEl("btnUseDefaultRoadJunctionValues").style.display = "inline-block";
        getEl("btnUseExistingRoadJunctionValues").style.display = "none";
        getEl("btnSetDefaultRoadJunctionValues").style.display = "none";
    } else if ((ls.customRoadProperties != ls.defaultRoadProperties ||
            ls.customJunctionProperties != ls.defaultJunctionProperties ||
            ls.customRoadRelativeWeighting != defaultRoadRelativeWeighting ||
            ls.customJunctionRelativeWeighting != defaultJunctionRelativeWeighting) &&
        (ls.customRoadProperties != null ||
            ls.customJunctionProperties != null ||
            ls.customRoadRelativeWeighting != null ||
            ls.customJunctionRelativeWeighting != null)) {


        getEl("labelDefaultExistingCustomise").innerHTML = "Previously customised weightings for roads and junctions have been loaded";
        getEl("btnSetDefaultRoadJunctionValues").style.display = "inline-block";
        getEl("btnUseDefaultRoadJunctionValues").style.display = "none";
        getEl("btnUseExistingRoadJunctionValues").style.display = "inline-block";

    } else {
        getEl("labelDefaultExistingCustomise").innerHTML = "Default weightings for roads and junctions were previously loaded";
        getEl("btnSetDefaultRoadJunctionValues").style.display = "none";
        getEl("btnUseDefaultRoadJunctionValues").style.display = "none";
        getEl("btnUseExistingRoadJunctionValues").style.display = "none";
    };

    if (localStorage.defaultJunctionRelativeWeighting == null) {
        console.log("hi");
    };


    // Execute the algorithm with the current values
    console.log(dijkstra());





    {
        // Hook up the "Calculate with current values" button
        const btnUseExistingRoadJunctionValues = getEl('btnUseExistingRoadJunctionValues');
        if (btnUseExistingRoadJunctionValues.addEventListener) {
            // DOM2 standard
            btnUseExistingRoadJunctionValues.addEventListener('click', function () {
                showMe('resultScreen')
            });
        } else if (btnUseExistingRoadJunctionValues.attachEvent) {
            // IE (IE9 finally supports the above, though)
            btnUseExistingRoadJunctionValues.attachEvent('onclick', showMe('resultScreen'));
        } else {
            // Really old or non-standard browser, try DOM0
            btnUseExistingRoadJunctionValues.onclick = showMe('resultScreen');
        };


        // Hook up the "Customise values" button
        const btnCustomiseRoadJunctionValues = getEl('btnCustomiseRoadJunctionValues');
        if (btnCustomiseRoadJunctionValues.addEventListener) {
            // DOM2 standard
            btnCustomiseRoadJunctionValues.addEventListener('click', function () {
                showMe('customPage1')
            });
        } else if (btnCustomiseRoadJunctionValues.attachEvent) {
            // IE (IE9 finally supports the above, though)
            btnCustomiseRoadJunctionValues.attachEvent('onclick', showMe('customPage1'));
        } else {
            // Really old or non-standard browser, try DOM0
            btnCustomiseRoadJunctionValues.onclick = showMe('customPage1');
        };


        // Hook up the "Scenario 1" button
        const btnShowS1 = getEl('btnShowS1');
        if (btnShowS1.addEventListener) {
            // DOM2 standard
            btnShowS1.addEventListener('click', function () {
                showMe('customPage1')
            });
        } else if (btnShowS1.attachEvent) {
            // IE (IE9 finally supports the above, though)
            btnShowS1.attachEvent('onclick', showMe('customPage1'));
        } else {
            // Really old or non-standard browser, try DOM0
            btnShowS1.onclick = showMe('customPage1');
        };


        // Hook up the "Scenario 2" button
        const btnShowS2 = getEl('btnShowS2');
        if (btnShowS2.addEventListener) {
            // DOM2 standard
            btnShowS2.addEventListener('click', function () {
                showMe('customPage2')
            });
        } else if (btnShowS2.attachEvent) {
            // IE (IE9 finally supports the above, though)
            btnShowS2.attachEvent('onclick', showMe('customPage2'));
        } else {
            // Really old or non-standard browser, try DOM0
            btnShowS2.onclick = showMe('customPage2');
        };


        // Hook up the "Scenario 3" button
        const btnShowS3 = getEl('btnShowS3');
        if (btnShowS3.addEventListener) {
            // DOM2 standard
            btnShowS3.addEventListener('click', function () {
                showMe('customPage3')
            });
        } else if (btnShowS3.attachEvent) {
            // IE (IE9 finally supports the above, though)
            btnShowS3.attachEvent('onclick', showMe('customPage3'));
        } else {
            // Really old or non-standard browser, try DOM0
            btnShowS3.onclick = showMe('customPage3');
        };


        // Hook up the "Scenario 4" button
        const btnShowS4 = getEl('btnShowS4');
        if (btnShowS4.addEventListener) {
            // DOM2 standard
            btnShowS4.addEventListener('click', function () {
                showMe('customPage4')
            });
        } else if (btnShowS4.attachEvent) {
            // IE (IE9 finally supports the above, though)
            btnShowS4.attachEvent('onclick', showMe('customPage4'));
        } else {
            // Really old or non-standard browser, try DOM0
            btnShowS4.onclick = showMe('customPage4');
        };


        // Hook up the "Scenario 5" button
        const btnShowS5 = getEl('btnShowS5');
        if (btnShowS5.addEventListener) {
            // DOM2 standard
            btnShowS5.addEventListener('click', function () {
                showMe('customPage5')
            });
        } else if (btnShowS5.attachEvent) {
            // IE (IE9 finally supports the above, though)
            btnShowS5.attachEvent('onclick', showMe('customPage5'));
        } else {
            // Really old or non-standard browser, try DOM0
            btnShowS5.onclick = showMe('customPage5');
        };

        // Hook up the "Scenario 6" button
        const btnShowS6 = getEl('btnShowS6');
        if (btnShowS6.addEventListener) {
            // DOM2 standard
            btnShowS6.addEventListener('click', function () {
                showMe('customPage6')
            });
        } else if (btnShowS6.attachEvent) {
            // IE (IE9 finally supports the above, though)
            btnShowS6.attachEvent('onclick', showMe('customPage6'));
        } else {
            // Really old or non-standard browser, try DOM0
            btnShowS6.onclick = showMe('customPage6');
        };

        // Hook up the "Scenario 7" button
        const btnShowS7 = getEl('btnShowS7');
        if (btnShowS7.addEventListener) {
            // DOM2 standard
            btnShowS7.addEventListener('click', function () {
                showMe('customPage7')
            });
        } else if (btnShowS7.attachEvent) {
            // IE (IE9 finally supports the above, though)
            btnShowS7.attachEvent('onclick', showMe('customPage7'));
        } else {
            // Really old or non-standard browser, try DOM0
            btnShowS7.onclick = showMe('customPage7');
        };

        // Hook up the "Scenario 8" button
        const btnShowS8 = getEl('btnShowS8');
        if (btnShowS8.addEventListener) {
            // DOM2 standard
            btnShowS8.addEventListener('click', function () {
                showMe('customPage8')
            });
        } else if (btnShowS8.attachEvent) {
            // IE (IE9 finally supports the above, though)
            btnShowS8.attachEvent('onclick', showMe('customPage8'));
        } else {
            // Really old or non-standard browser, try DOM0
            btnShowS8.onclick = showMe('customPage8');
        };

        // Hook up the "Scenario 9" button
        const btnShowS9 = getEl('btnShowS9');
        if (btnShowS9.addEventListener) {
            // DOM2 standard
            btnShowS9.addEventListener('click', function () {
                showMe('customPage9')
            });
        } else if (btnShowS9.attachEvent) {
            // IE (IE9 finally supports the above, though)
            btnShowS9.attachEvent('onclick', showMe('customPage9'));
        } else {
            // Really old or non-standard browser, try DOM0
            btnShowS9.onclick = showMe('customPage9');
        }

        // Hook up the "Calculate with current values" button
        const s1Q1Slider = getEl('s1Q1Slider');
        const s1Q1Label = getEl('s1Q1Label');

        // s1Q1Slider.value = JSON.populateDefaultRoadProperties;
        // s1Q1Slider.textContent = 9;
        // console.log(s1Q1Slider);

        defaultOrCustom();
        console.log(defaultRoad);
        if (defaultRoad) {
            s1Q1Slider.value = localStorage.defaultRoadProperties[0][0][0][1];
            s1Q1Slider.textContent = localStorage.defaultRoadProperties[0][0][0][1];
            s1Q1Label.value = localStorage.defaultRoadProperties[0][0][0][1];
            s1Q1Label.textContent = localStorage.defaultRoadProperties[0][0][0][1];
        } else {
            s1Q1Slider.value = JSON.parse(localStorage.customRoadProperties)[0][0][0][1];
            s1Q1Slider.textContent = JSON.parse(localStorage.customRoadProperties)[0][0][0][1];
            s1Q1Label.value = JSON.parse(localStorage.customRoadProperties)[0][0][0][1];
            s1Q1Label.textContent = JSON.parse(localStorage.customRoadProperties)[0][0][0][1];
            console.log("Within the else")
            console.log(JSON.parse(localStorage.customRoadProperties)[0][0][0][1])
        };
    };
};


function convertCSVToArray(str, delim = ",") {
    // Start from the start of the string, slice at end of line marker
    // Use the delimeter set above to split the string
    const headers = str.slice(0, str.indexOf("\n")).split(delim);

    // Start at the index \n + 1 and slice at the end of the text
    // Create an array of each csv row, using Split
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    // Maping the rows
    // Split the values from each row into an array
    // Create an object using headers.reduce
    // Derive the object properties from headers:values
    // Construct the array using the object as an element of the whole array
    const array = rows.map(function (row) {
        const values = row.split(delim);
        const element = headers.reduce(function (object, header, index) {
            object[header] = values[index];
            return object;
        }, {});
        return element;
    });

    // return the array
    return array;
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
        if (defaultRoad) {
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
        if (defaultRoad) {
            this.value = localStorage.defaultJunctionProperties[one][two][three][four];
        } else {
            this.value = localStorage.customJunctionProperties[one][two][three][four];
        };
    };

};

function resetSliderToDefaultValue(labelID, sliderID, roadOrJunction, one, two, three, four) {
    var value = JSON.parse(localStorage.defaultRoadProperties)[one][two][three][four];

    getEl(labelID).innerHTML = value;
    getEl(sliderID).value = value;

    customiseWeightings(roadOrJunction, one, two, three, four, getEl(sliderID).value);
};

function customiseWeightings(roadOrJunction, one, two, three, four, newValue) {

    if (roadOrJunction) {
        defaultOrCustom();
        if (defaultRoad) {
            var customisingRoadProperties = JSON.parse(localStorage.defaultRoadProperties);
        } else {
            var customisingRoadProperties = JSON.parse(localStorage.customRoadProperties);
        };

        customisingRoadProperties[one][two][three][four] = newValue;

        localStorage.customRoadProperties = JSON.stringify(customisingRoadProperties);

    } else {
        if (defaultJunction) {
            var customisingJunctionProperties = JSON.parse(localStorage.defaultJunctionProperties);
        } else {
            var customisingJunctionProperties = JSON.parse(localStorage.customJunctionProperties);
        };

        customisingJunctionProperties[one][two][three][four] = newValue;

        localStorage.customJunctionProperties = JSON.stringify(customisingJunctionProperties);
    };
};

function defaultOrCustom() {
    if (localStorage.customRoadProperties == null) {
        defaultRoad = true;
    } else {
        defaultRoad = false;
    };
    if (localStorage.customRoadProperties == null) {
        defaultJunction = true;
    } else {
        defaultJunction = false;
    };
};