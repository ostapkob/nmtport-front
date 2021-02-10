values = {
    1: {
        1: {
            alarm: false,
            id: 1
        },
        2: {
            alarm: false,
            id: 2
        },
        3: {
            alarm: false,
            id: 3
        },
        4: {
            alarm: true,
            id: 4
        },
        5: {
            alarm: false,
            id: 5
        },
    },
    2: {
        1: {
            alarm: true,
            id: 1
        },
        2: {
            alarm: true,
            id: 2
        },
        3: {
            alarm: false,
            id: 3
        },
        4: {
            alarm: false,
            id: 4
        },
        5: {
            alarm: false,
            id: 5
        },
    },
    3: {
        1: {
            alarm: true,
            id: 1
        },
        2: {
            alarm: true,
            id: 2
        },
        3: {
            alarm: false,
            id: 3
        },
        4: {
            alarm: true,
            id: 4
        },
        5: {
            alarm: false,
            id: 5
        },
    },
    4: {
        1: {
            alarm: true,
            id: 1
        },
        2: {
            alarm: true,
            id: 2
        },
        3: {
            alarm: false,
            id: 3
        },
        4: {
            alarm: true,
            id: 4
        },
        5: {
            alarm: false,
            id: 5
        },
    },
    5: {
        1: {
            alarm: true,
            id: 1
        },
        2: {
            alarm: true,
            id: 2
        },
        3: {
            alarm: true,
            id: 3
        },
        4: {
            alarm: false,
            id: 4
        },
        5: {
            alarm: false,
            id: 5
        },
    },
    6: {
        1: {
            alarm: false,
            id: 1
        },
        2: {
            alarm: false,
            id: 2
        },
        3: {
            alarm: false,
            id: 3
        },
        4: {
            alarm: true,
            id: 4
        },
        5: {
            alarm: false,
            id: 5
        },
    },
    7: {
        1: {
            alarm: false,
            id: 1
        },
        2: {
            alarm: true,
            id: 2
        },
        3: {
            alarm: false,
            id: 3
        },
        4: {
            alarm: false,
            id: 4
        },
        5: {
            alarm: false,
            id: 5
        },
    },
    8: {
        1: {
            alarm: true,
            id: 1
        },
        2: {
            alarm: true,
            id: 2
        },
        3: {
            alarm: false,
            id: 3
        },
        4: {
            alarm: true,
            id: 4
        },
        5: {
            alarm: false,
            id: 5
        },
    },
    9: {
        1: {
            alarm: true,
            id: 1
        },
        2: {
            alarm: true,
            id: 2
        },
        3: {
            alarm: true,
            id: 3
        },
        4: {
            alarm: false,
            id: 4
        },
        5: {
            alarm: false,
            id: 5
        },
    },
    10: {
        1: {
            alarm: true,
            id: 1
        },
        2: {
            alarm: false,
            id: 2
        },
        3: {
            alarm: false,
            id: 3
        },
        4: {
            alarm: true,
            id: 4
        },
        5: {
            alarm: false,
            id: 5
        },
    },
}
let tmpSetAlarm = new Set()
for (mechanisms in values) {
    m = values[mechanisms]
    for (mech in m) {
        if (m[mech].alarm && tmpSetAlarm.has(m[mech].id)) {
            console.log(mechanisms, '->', m[mech].id)
        }
        if (!m[mech].alarm) {
            tmpSetAlarm.add(m[mech].id)
        }
        else {
            tmpSetAlarm.delete(m[mech].id) 
        }
    }
    // console.log(mechanisms, tmpSetAlarm, tmpSetAlarm.has(2))
}
