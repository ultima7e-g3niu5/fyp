export function dijkstra() {
    const decisionTree = {
        start: {
            1: JSON.parse(localStorage.defaultRoadProperties)[0][0][0][1],
            2: calculateNodeWeighting()
        },
        1: {
            9: calculateNodeWeighting(9)
        },
        2: {
            3: calculateNodeWeighting(3)
        },
        3: {
            4: calculateNodeWeighting(4),
            7: calculateNodeWeighting(7)
        },
        4: {
            5: calculateNodeWeighting(5)
        },
        5: {
            6: calculateNodeWeighting(6)
        },
        6: {
            10: calculateNodeWeighting(10)
        },
        7: {
            8: calculateNodeWeighting(8)
        },
        8: {
            10: calculateNodeWeighting(10)
        },
        9: {
            7: calculateNodeWeighting(7),
            13: calculateNodeWeighting(13),
            12: calculateNodeWeighting(12)
        },
        10: {
            21: calculateNodeWeighting(21),
            11: calculateNodeWeighting(11)
        },
        11: {
            15: calculateNodeWeighting(15)
        },
        12: {
            13: calculateNodeWeighting(13),
            16: calculateNodeWeighting(16)
        },
        13: {
            14: calculateNodeWeighting(14)
        },
        14: {
            18: calculateNodeWeighting(18),
            24: calculateNodeWeighting(24)
        },
        15: {
            19: calculateNodeWeighting(19),
            17: calculateNodeWeighting(17)
        },
        16: {
            22: calculateNodeWeighting(22)
        },
        17: {
            21: calculateNodeWeighting(21)
        },
        18: {
            20: calculateNodeWeighting(20),
            28: calculateNodeWeighting(28)
        },
        19: {
            21: calculateNodeWeighting(21)
        },
        20: {
            21: calculateNodeWeighting(21)
        },
        21: {
            36: calculateNodeWeighting(36)
        },
        22: {
            26: calculateNodeWeighting(26)
        },
        23: {
            25: calculateNodeWeighting(25),
            29: calculateNodeWeighting(29)
        },
        24: {
            27: calculateNodeWeighting(27),
            31: calculateNodeWeighting(31)
        },
        25: {
            27: calculateNodeWeighting(27),
            31: calculateNodeWeighting(31)
        },
        26: {
            23: calculateNodeWeighting(23),
            34: calculateNodeWeighting(34)
        },
        27: {
            33: calculateNodeWeighting(33)
        },
        28: {
            39: calculateNodeWeighting(39),
            35: calculateNodeWeighting(35)
        },
        29: {
            31: calculateNodeWeighting(31)
        },
        30: {
            31: calculateNodeWeighting(31)
        },
        31: {
            32: calculateNodeWeighting(32)
        },
        32: {
            40: calculateNodeWeighting(40)
        },
        33: {
            32: calculateNodeWeighting(32)
        },
        34: {
            30: calculateNodeWeighting(30),
            38: calculateNodeWeighting(38)
        },
        35: {
            37: calculateNodeWeighting(37)
        },
        36: {
            45: calculateNodeWeighting(45)
        },
        37: {
            45: calculateNodeWeighting(45)
        },
        38: {
            41: calculateNodeWeighting(41)
        },
        39: {
            35: calculateNodeWeighting(35)
        },
        40: {
            42: calculateNodeWeighting(42)
        },
        41: {
            59: calculateNodeWeighting(59)
        },
        42: {
            60: calculateNodeWeighting(60)
        },
        43: {
            55: calculateNodeWeighting(55),
            42: calculateNodeWeighting(42)
        },
        44: {
            43: calculateNodeWeighting(43)
        },
        45: {
            44: calculateNodeWeighting(44)
        },
        46: {
            47: calculateNodeWeighting(47),
            48: calculateNodeWeighting(48)
        },
        47: {
            49: calculateNodeWeighting(49)
        },
        48: {
            49: calculateNodeWeighting(49)
        },
        49: {
            50: calculateNodeWeighting(50)
        },
        50: {
            51: calculateNodeWeighting(51)
        },
        51: {
            58: calculateNodeWeighting(58),
            52: calculateNodeWeighting(52)
        },
        52: {
            57: calculateNodeWeighting(57)
        },
        53: {
            54: calculateNodeWeighting(54)
        },
        54: {
            55: calculateNodeWeighting(55),
            52: calculateNodeWeighting(52)
        },
        55: {
            56: calculateNodeWeighting(56)
        },
        56: {
            end: calculateNodeWeighting(60)
        },
        57: {
            end: calculateNodeWeighting(60)
        },
        58: {
            59: calculateNodeWeighting(59)
        },
        59: {
            end: calculateNodeWeighting(60)
        },
        end: {}
    };

    function calculateNodeWeighting(nodeID) {
        const nodeWeighting = Math.random() * 100;
        return nodeWeighting;
    };

    const lowestNode = (weightings, completedNodes) => {
        return Object.keys(weightings).reduce((lowest, node) => {
            if (lowest === null || weightings[node] < weightings[lowest]) {
                if (!completedNodes.includes(node)) {
                    lowest = node;
                }
            }
            return lowest;
        }, null);
    };

    // function that returns the minimum cost and path to reach end
    const computeShortestPath = (graph) => {

        // track lowest cost to reach each node
        const weightings = Object.assign({
            end: Infinity
        }, graph.start);

        // track paths
        const parentNodes = {
            end: null
        };
        for (let child in graph.start) {
            parentNodes[child] = 'start';
        }

        // track nodes that have already been completedNodes
        const completedNodes = [];

        let node = lowestNode(weightings, completedNodes);

        while (node) {
            let cost = weightings[node];
            let children = graph[node];
            for (let n in children) {
                let newCost = cost + children[n];
                if (!weightings[n]) {
                    weightings[n] = newCost;
                    parentNodes[n] = node;
                }
                if (weightings[n] > newCost) {
                    weightings[n] = newCost;
                    parentNodes[n] = node;
                }
            }
            completedNodes.push(node);
            node = lowestNode(weightings, completedNodes);
        }

        let shortestPath = ['end'];
        let parentNode = parentNodes.end;
        while (parentNode) {
            shortestPath.push(parentNode);
            parentNode = parentNodes[parentNode];
        }
        shortestPath.reverse();

        const results = {
            distance: weightings.end,
            path: shortestPath
        };

        return results;
    };

    return computeShortestPath(decisionTree);
};