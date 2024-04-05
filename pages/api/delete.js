const AUTH_HOST = process.env.IS_LOCAL ? "http://localhost:" + process.env.AUTH_PORT : process.env.LIVE_LINK + process.env.AUTH_PORT
const AM_HOST = process.env.IS_LOCAL ? "http://localhost:" + process.env.ACCOUNT_PORT : process.env.LIVE_LINK + process.env.ACCOUNT_PORT

//DELETE
const deleteDepartment = async (departmentGUID) => {
    return fetch(`${AM_HOST}/deleteDepartment`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            departmentGUID
        })
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        return err
    })
}

const deleteFunction = async (functionGUID) => {
    return fetch(`${AM_HOST}/deleteFunction`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            functionGUID
        })
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        return err
    })
}

const deleteRole = async (roleGUID) => {
    return fetch(`${AM_HOST}/deleteRole`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            roleGUID
        })
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        return err
    })
}

const deleteEvent = async (eventGUID) => {
    return fetch(`${AM_HOST}/deleteEvent`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            eventGUID
        })
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        return err
    })
}

const deleteVenue = async (venueGUID) => {
    return fetch(`${AM_HOST}/deleteVenue`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            venueGUID
        })
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        return err
    })
}

const deletePosition = async (positionGUID) => {
    return fetch(`${AM_HOST}/deletePosition`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            positionGUID
        })
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        return err
    })
}

/**
 * The Method is used to delete all the events 
 * @returns {promise}
 */
const DeleteAllEvents = async () => {
    return fetch(`${AM_HOST}/deleteEvent/all`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        return err
    })
}

/**
 * The Method is used to delete all the departments 
 * @returns {promise}
 */
const DeleteAllDepartments = async () => {
    return fetch(`${AM_HOST}/deleteDepartment/all`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        return err
    })
}

/**
 * The Method is used to delete all the functions 
 * @returns {promise}
 */
const DeleteAllFunctions = async () => {
    return fetch(`${AM_HOST}/deleteFunction/all`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        return err
    })
}

/**
 * The Method is used to delete all the functions 
 * @returns {promise}
 */
const DeleteAllRoles = async () => {
    return fetch(`${AM_HOST}/deleteRole/all`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        return err
    })
}

/**
 * The Method is used to delete all the venues 
 * @returns {promise}
 */
const DeleteAllVenues = async () => {
    return fetch(`${AM_HOST}/deleteVenue/all`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        return err
    })
}

/**
 * The Method is used to delete all the venues 
 * @returns {promise}
 */
const DeleteAllPositions = async () => {
    return fetch(`${AM_HOST}/deletePosition/all`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        return err
    })
}

export {
    deleteDepartment,
    deleteFunction,
    deleteRole,
    deleteEvent,
    deleteVenue,
    deletePosition,
    DeleteAllEvents,
    DeleteAllDepartments,
    DeleteAllFunctions,
    DeleteAllRoles,
    DeleteAllVenues,
    DeleteAllPositions,
}
