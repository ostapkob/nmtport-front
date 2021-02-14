values = {
    1: {
        1: {
            alarm: false,
          id: 1,
          filter: true
        },
        2: {
            alarm: false,
            id: 2,
          filter: true
        },
        3: {
            alarm: false,
            id: 3,
          filter: true
        },
        4: {
            alarm: true,
            id: 4,
          filter: false,
        },
        5: {
            alarm: false,
            id: 5,
          filter: true
        },
    },
    2: {
        1: {
            alarm: true,
            id: 1,
          filter: true
        },
        2: {
            alarm: true,
            id: 2,
          filter: true
        },
        3: {
            alarm: false,
            id: 3,
          filter: true
        },
        4: {
            alarm: false,
            id: 4,
          filter: false,
        },
        5: {
            alarm: false,
            id: 5,
          filter: true
        },
    },
    3: {
        1: {
            alarm: true,
            id: 1,
          filter: true
        },
        2: {
            alarm: true,
            id: 2,
          filter: true
        },
        3: {
            alarm: false,
            id: 3,
          filter: true
        },
        4: {
            alarm: true,
            id: 4,
          filter: false,
        },
        5: {
            alarm: false,
            id: 5,
          filter: true
        },
    },
    4: {
        1: {
            alarm: true,
            id: 1,
          filter: true
        },
        2: {
            alarm: true,
            id: 2,
          filter: true
        },
        3: {
            alarm: false,
            id: 3,
          filter: true
        },
        4: {
            alarm: true,
            id: 4,
          filter: false,
        },
        5: {
            alarm: false,
            id: 5,
          filter: true
        },
    },
    5: {
        1: {
            alarm: true,
            id: 1,
          filter: true
        },
        2: {
            alarm: true,
            id: 2,
          filter: true
        },
        3: {
            alarm: true,
            id: 3,
          filter: true
        },
        4: {
            alarm: false,
            id: 4,
          filter: false,
        },
        5: {
            alarm: false,
            id: 5,
          filter: true
        },
    },
    6: {
        1: {
            alarm: false,
            id: 1,
          filter: true
        },
        2: {
            alarm: false,
            id: 2,
          filter: true
        },
        3: {
            alarm: false,
            id: 3,
          filter: true
        },
        4: {
            alarm: true,
            id: 4,
          filter: false,
        },
        5: {
            alarm: false,
            id: 5,
          filter: true
        },
    },
    7: {
        1: {
            alarm: false,
            id: 1,
          filter: true
        },
        2: {
            alarm: true,
            id: 2,
          filter: true
        },
        3: {
            alarm: false,
            id: 3,
          filter: true
        },
        4: {
            alarm: false,
            id: 4,
          filter: false,
        },
        5: {
            alarm: false,
            id: 5,
          filter: true
        },
    },
    8: {
        1: {
            alarm: true,
            id: 1,
          filter: true
        },
        2: {
            alarm: true,
            id: 2,
          filter: true
        },
        3: {
            alarm: false,
            id: 3,
          filter: true
        },
        4: {
            alarm: true,
            id: 4,
          filter: false,
        },
        5: {
            alarm: false,
            id: 5,
          filter: true
        },
    },
    9: {
        1: {
            alarm: true,
            id: 1,
          filter: true
        },
        2: {
            alarm: true,
            id: 2,
          filter: true
        },
        3: {
            alarm: true,
            id: 3,
          filter: true
        },
        4: {
            alarm: false,
            id: 4,
          filter: false,
        },
        5: {
            alarm: false,
            id: 5,
          filter: true
        },
    },
    10: {
        1: {
            alarm: true,
            id: 1,
          filter: true
        },
        2: {
            alarm: false,
            id: 2,
          filter: true
        },
        3: {
            alarm: false,
            id: 3,
          filter: true
        },
        4: {
            alarm: true,
            id: 4,
          filter: false,
        },
        5: {
            alarm: false,
            id: 5,
          filter: true
        },
    },
}
let tmpSetAlarm = new Set()
for (mechanisms in values) {
    m = values[mechanisms]
    for (mech in m) {
        if (m[mech].alarm && tmpSetAlarm.has(m[mech].id) && m[mech].filter) {
            console.log(mechanisms, '->', m[mech].id)
            tmpSetAlarm.delete(m[mech].id) 
        }
        if (!m[mech].alarm) {
            tmpSetAlarm.add(m[mech].id)
        }
    }
    // console.log(mechanisms, tmpSetAlarm, tmpSetAlarm.has(2))
}
