const AUTH_HOST = process.env.IS_LOCAL ? "http://localhost:" + process.env.AUTH_PORT : process.env.LIVE_LINK + process.env.AUTH_PORT
const AM_HOST = process.env.IS_LOCAL ? "http://localhost:" + process.env.ACCOUNT_PORT : process.env.LIVE_LINK + process.env.ACCOUNT_PORT
//Get
const getDepartment = async () => {
  return fetch(`${AM_HOST}/getDepartment`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    return res.json();
  }).catch((err) => {
    return err
  })
}

const getFunction = async () => {
  return fetch(`${AM_HOST}/getFunction`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    return res.json();
  }).catch((err) => {
    return err
  })
}

const getRole = async () => {
  return fetch(`${AM_HOST}/getRole`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    return res.json();
  }).catch((err) => {
    return err
  })
}

const getEvent = async () => {
  return fetch(`/dummy-data/events.json`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    return res.json();
  }).catch((err) => {
    return err
  })
}

const getVenue = async () => {
  return fetch(`${AM_HOST}/getVenue`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    return res.json();
  }).catch((err) => {
    return err
  })
}

const getPosition = async () => {
  return fetch(`${AM_HOST}/getPositionsData`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    return res.json();
  }).catch((err) => {
    return err
  })
}

const getWorkforceCount = async () => {
  return fetch(`${AM_HOST}/getWorkforceCount`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    console.log(res)
    return res.json();
  }).catch((err) => {
    return err
  })
}

const getEventCount = async () => {
  return fetch(`/dummy-data/events.json`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    console.log(res)
    return res.json();
  }).catch((err) => {
    return err
  })
}

const getDepartmentCount = async () => {
  return fetch(`${AM_HOST}/getDepartmentCount`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    console.log(res)
    return res.json();
  }).catch((err) => {
    return err
  })
}

const getRoleCount = async () => {
  return fetch(`${AM_HOST}/getRoleCount`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    console.log(res)
    return res.json();
  }).catch((err) => {
    return err
  })
}

const getFunctionCount = async () => {
  return fetch(`${AM_HOST}/getFunctionCount`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    console.log(res)
    return res.json();
  }).catch((err) => {
    return err
  })
}


export {
  getDepartment,
  getFunction,
  getRole,
  getEvent,
  getVenue,
  getPosition,
  getWorkforceCount,
  getEventCount,
  getDepartmentCount,
  getRoleCount,
  getFunctionCount
}
