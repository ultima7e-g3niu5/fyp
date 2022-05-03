export function populateDefaultRoadProperties() {
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

export function populateDefaultJunctionProperties() {
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

    defaultJunctionRelativeWeighting = [2, 3, 4, 4, 1, 2, 3, 4, 5, 3, 5];

    return defaultJunctionProperties, defaultJunctionRelativeWeighting;
};