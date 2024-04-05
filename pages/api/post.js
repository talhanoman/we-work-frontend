const AUTH_HOST = process.env.IS_LOCAL ? "http://localhost:" + process.env.AUTH_PORT : process.env.LIVE_LINK + process.env.AUTH_PORT
const AM_HOST = process.env.IS_LOCAL ? "http://localhost:" + process.env.ACCOUNT_PORT : process.env.LIVE_LINK + process.env.ACCOUNT_PORT
// Post
const signup = async (email, password) => {
  try {
    const res = await fetch(`${AUTH_HOST}/user/add`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    return res.json()
  } catch (err) {
    return err;
  }
}

const login = async (email, password) => {
  try {
    const res = await fetch(`${AUTH_HOST}/Authentication`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    return res.json()
  } catch (err) {
    return err;
  }
}

const addDepartment = async (token, departmentName, departmentCode, eventGuid) => {
  try {
    const res = await fetch(`${AM_HOST}/addDepartment`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        department_name: departmentName,
        department_code: departmentCode,
        event_guid: eventGuid
      })
    })
    return res.json()
  } catch (err) {
    return err;
  }
}

const addFunction = async (token, functionName, functionCode, functionDescription, event_guid, department_guid) => {
  try {
    const res = await fetch(`${AM_HOST}/addFunction`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        function_name: functionName,
        function_code: functionCode,
        function_description: functionDescription,
        event_guid,
        department_guid
      })
    })
    return res.json()
  } catch (err) {
    return err;
  }
}

const addRole = async (token, roleName, functionGuid, roleDescription, workforceType) => {
  try {
    const res = await fetch(`${AM_HOST}/addRole`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        role_name: roleName,
        function_guid: functionGuid,
        role_description: roleDescription,
        workforce_type: workforceType,
      })
    })
    return res.json()
  } catch (err) {
    return err;
  }
}

const addEvent = async (token, eventName, venueGuid, startDate, endDate, eventDescription, maxShifts) => {
  try {
    const res = await fetch(`${AM_HOST}/addEvent`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        event_name: eventName,
        venue_guid: venueGuid,
        start_date: startDate,
        end_date: endDate,
        event_description: eventDescription,
        max_shift: maxShifts
      })
    })
    return res.json()
  } catch (err) {
    return err;
  }
}

const addVenue = async (token, venueName, venueCode, venueAddress, venueDescription) => {
  try {
    const res = await fetch(`${AM_HOST}/addVenue`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        venue_name: venueName,
        venue_code: venueCode,
        venue_address: venueAddress,
        venue_description: venueDescription,
      })
    })
    return res.json()
  } catch (err) {
    return err;
  }
}

const addPosition = async (token, role_guid, venue_guid, event_guid, department_guid, report_to_guid, work_force_type, shifts_per_day, demand, peak_shift, start_date, end_date, peak_day, multiplier) => {
  try {
    const res = await fetch(`${AM_HOST}/addPosition`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        role_guid,
        venue_guid,
        event_guid,
        department_guid,
        report_to_guid,
        work_force_type,
        peak_shift,
        demand,
        shifts_per_day,
        start_date,
        end_date,
        peak_day,
        multiplier
      })
    })
    return res.json()
  } catch (err) {
    return err;
  }
}


const addPositionFile = async (formData) => {
  try {
    const res = await fetch(`${AM_HOST}/addPositionFile`, {
      method: 'POST',
      headers: {
      },
      body: formData
    })
    return res.json()
  } catch (err) {
    return err;
  }
}

const addVenueFile = async (formData) => {
  try {
    const res = await fetch(`${AM_HOST}/addVenueFile`, {
      method: 'POST',
      headers: {
      },
      body: formData
    })
    return res.json()
  } catch (err) {
    return err;
  }
}

const addEventFile = async (formData) => {
  try {
    const res = await fetch(`${AM_HOST}/addEventFile`, {
      method: 'POST',
      headers: {
      },
      body: formData
    })
    return res.json()
  } catch (err) {
    return err;
  }
}

const addRoleFile = async (formData) => {
  try {
    const res = await fetch(`${AM_HOST}/addRoleFile`, {
      method: 'POST',
      headers: {
      },
      body: formData
    })
    return res.json()
  } catch (err) {
    return err;
  }
}

const addDepartmentFile = async (formData) => {
  try {
    const res = await fetch(`${AM_HOST}/addDepartmentFile`, {
      method: 'POST',
      headers: {
      },
      body: formData
    })
    return res.json()
  } catch (err) {
    return err;
  }
}

const addFunctionFile = async (formData) => {
  try {
    const res = await fetch(`${AM_HOST}/addFunctionFile`, {
      method: 'POST',
      headers: {
      },
      body: formData
    })
    return res.json()
  } catch (err) {
    return err;
  }
}

const addForm = async (event_guid, workforce_type, start_date, end_date, questions) => {
  try {
    const res = await fetch(`${AM_HOST}/form/create`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_guid,
        workforce_type,
        start_date,
        end_date,
        questions
      })
    })
    return res.json()
  } catch (err) {
    return err;
  }
}

export {
  signup,
  login,
  addDepartment,
  addFunction,
  addRole,
  addEvent,
  addVenue,
  addPosition,
  addPositionFile,
  addVenueFile,
  addEventFile,
  addRoleFile,
  addDepartmentFile,
  addFunctionFile,
  addForm
}
