// Your code here
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(data) {
    return data.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateTimeStr) {
    let [date, hour] = dateTimeStr.split(' ');
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employeeRecord
}

function createTimeOutEvent(employeeRecord, eventDate) {
    let [date, hour] = eventDate.split(' ');
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    const inEvent = employeeRecord.timeInEvents.find(event => event.date === date)
    const outEvent = employeeRecord.timeOutEvents.find(event => event.date === date)
    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employeeRecord, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date)
    let payOwed = hoursWorked * employeeRecord.payPerHour
    return payOwed
}

function allWagesFor(employeeRecord) {
    let totalWages = 0
    for (let event of employeeRecord.timeInEvents) {
        totalWages += wagesEarnedOnDate(employeeRecord, event.date)
    }
    return totalWages
}

function calculatePayroll(employeeRecords) {
    let sumWages = 0
    for (let employeeRecord of employeeRecords) {
        sumWages += allWagesFor(employeeRecord)
    }
    return sumWages
}