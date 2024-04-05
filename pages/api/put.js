const AUTH_HOST = process.env.IS_LOCAL ? "http://localhost:" + process.env.AUTH_PORT : process.env.LIVE_LINK + process.env.AUTH_PORT
const AM_HOST = process.env.IS_LOCAL ? "http://localhost:" + process.env.ACCOUNT_PORT : process.env.LIVE_LINK + process.env.ACCOUNT_PORT

//UPDATE
const updateDepartment = async (departmentGUID, departmentName, departmentCode, event_guid) => {
  return fetch(`${AM_HOST}/updateDepartment`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      departmentGUID,
      departmentName,
      departmentCode,
      event_guid
    })
  }).then((res) => {
    return res.json()
  }).catch((err) => {
    return err
  })
}

const updateFunction = async (functionGUID, functionName, functionCode, functionDescription, event_guid, department_guid) => {
  return fetch(`${AM_HOST}/updateFunction`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      functionGUID,
      functionName,
      functionCode,
      functionDescription,
      event_guid,
      department_guid
    })
  }).then((res) => {
    return res.json()
  }).catch((err) => {
    return err
  })
}

const updateRole = async (roleGUID, roleName, roleCode, roleDescription, workforceType, function_guid) => {
  return fetch(`${AM_HOST}/updateRole`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      roleGUID,
      roleName,
      roleCode,
      roleDescription,
      workforceType,
      function_guid
    })
  }).then((res) => {
    return res.json()
  }).catch((err) => {
    return err
  })
}

const updateEvent = async (eventGUID, eventName, eventCode, startDate, endDate, event_description, max_shift, venueGUID) => {
  return fetch(`${AM_HOST}/updateEvent`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      eventGUID,
      eventName,
      venueGUID,
      eventCode,
      startDate,
      endDate,
      event_description,
      max_shift
    })
  }).then((res) => {
    return res.json()
  }).catch((err) => {
    return err
  })
}

const updateVenue = async (venueGUID, venueName, venueCode, venueAddress, venueDescription) => {
  return fetch(`${AM_HOST}/updateVenue`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      venueGUID,
      venueName,
      venueCode,
      venueAddress,
      venueDescription
    })
  }).then((res) => {
    return res.json()
  }).catch((err) => {
    return err
  })
}

const updatePosition = async (position_guid, role_guid, venue_guid, event_guid, department_guid, report_to_guid, work_force_type, shifts_per_day, demand, peak_shift, start_date, end_date, peak_day, multiplier) => {
  return fetch(`${AM_HOST}/updatePosition`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      position_guid,
      role_guid,
      venue_guid,
      event_guid,
      department_guid,
      report_to_guid,
      work_force_type,
      shifts_per_day,
      demand,
      peak_shift,
      start_date,
      end_date,
      peak_day,
      multiplier
    })
  }).then((res) => {
    return res.json()
  }).catch((err) => {
    return err
  })
}

export {
  updateDepartment,
  updateFunction,
  updateRole,
  updateEvent,
  updateVenue,
  updatePosition
}
