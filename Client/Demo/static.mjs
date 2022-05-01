export function hello(){
    console.log('hello');
};

export function dijkstra() {
    const problem = {
        start: {
            1: JSON.parse(localStorage.defaultRoadProperties)[0][0][0][1],
            2: 2
        },
        1: {
            9: 4
        },
        2: {
            3: 8
        },
        3: {
            4: 6,
            7: 3
        },
        4: {
            5: 1
        },
        5: {
            6: 2
        },
        6: {
            10: 2
        },
        7: {
            8: 4
        },
        8: {
            10: 1
        },
        9: {
            7: 3,
            13: 2,
            12: 7
        },
        10: {
            21: 2,
            11: 4
        },
        11: {
            15: 2
        },
        12: {
            13: 4,
            16: 2
        },
        13: {
            14: 3
        },
        14: {
            18: 3,
            24: 5
        },
        15: {
            19: 5,
            17: 2
        },
        16: {
            22: 5
        },
        17: {
            21: 4
        },
        18: {
            20: 3,
            28: 1
        },
        19: {
            21: 4
        },
        20: {
            21: 3
        },
        21: {
            36: 7
        },
        22: {
            26: 1
        },
        23: {
            25: 3,
            29: 7
        },
        24: {
            27: 6,
            31: 1
        },
        25: {
            27: 1,
            31: 6
        },
        26: {
            23: 2,
            34: 7
        },
        27: {
            33: 1
        },
        28: {
            39: 8,
            35: 2
        },
        29: {
            31: 4
        },
        30: {
            31: 8
        },
        31: {
            32: 2
        },
        32: {
            40: 8
        },
        33: {
            32: 5
        },
        34: {
            30: 9,
            38: 1
        },
        35: {
            37: 1
        },
        36: {
            45: 1
        },
        37: {
            45: 7
        },
        38: {
            41: 8
        },
        39: {
            35: 4
        },
        40: {
            42: 1
        },
        41: {
            59: 6
        },
        42: {
            60: 9
        },
        43: {
            55: 3,
            42: 1
        },
        44: {
            43: 7
        },
        45: {
            44: 3
        },
        46: {
            47: 1,
            48: 5
        },
        47: {
            49: 1
        },
        48: {
            49: 2
        },
        49: {
            50: 3
        },
        50: {
            51: 6
        },
        51: {
            58: 2,
            52: 3
        },
        52: {
            57: 8
        },
        53: {
            54: 8
        },
        54: {
            55: 2,
            52: 3
        },
        55: {
            56: 3
        },
        56: {
            finish: 1
        },
        57: {
            finish: 2
        },
        58: {
            59: 7
        },
        59: {
            finish: 3
        },
        finish: {}
    };

    console.log(problem);

    const lowestCostNode = (costs, processed) => {
        return Object.keys(costs).reduce((lowest, node) => {
            if (lowest === null || costs[node] < costs[lowest]) {
                if (!processed.includes(node)) {
                    lowest = node;
                }
            }
            return lowest;
        }, null);
    };

    // function that returns the minimum cost and path to reach Finish
    const computeShortestPath = (graph) => {

        // track lowest cost to reach each node
        const costs = Object.assign({
            finish: Infinity
        }, graph.start);

        // track paths
        const parents = {
            finish: null
        };
        for (let child in graph.start) {
            parents[child] = 'start';
        }

        // track nodes that have already been processed
        const processed = [];

        let node = lowestCostNode(costs, processed);

        while (node) {
            let cost = costs[node];
            let children = graph[node];
            for (let n in children) {
                let newCost = cost + children[n];
                if (!costs[n]) {
                    costs[n] = newCost;
                    parents[n] = node;
                }
                if (costs[n] > newCost) {
                    costs[n] = newCost;
                    parents[n] = node;
                }
            }
            processed.push(node);
            node = lowestCostNode(costs, processed);
        }

        let optimalPath = ['finish'];
        let parent = parents.finish;
        while (parent) {
            optimalPath.push(parent);
            parent = parents[parent];
        }
        optimalPath.reverse();

        const results = {
            distance: costs.finish,
            path: optimalPath
        };

        return results;
    };

    return computeShortestPath(problem);
};