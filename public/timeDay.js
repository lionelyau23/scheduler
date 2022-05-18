const dayMap = {
    "0": "sun",
    "1": "mon",
    "2": "tue",
    "3": "wed",
    "4": "thu",
    "5": "fri",
    "6": "sat",
}

const initializeDayTime = () => {
    // const now = new Date('2022-05-09T03:04:00')
    const now = new Date()

    const hour = now.getHours().toString().padStart(2, "0")
    const minute = now.getMinutes().toString().padStart(2, "0")

    time.value = `${hour}:${minute}`    
    
    day.value = dayMap[now.getDay()]

    const phDates = phData.vcalendar[0].vevent.map(d => d.dtstart[0])

    const todayDateAsString = `${now.getFullYear().toString()}${(now.getMonth()+1).toString().padStart(2,"0")}${(now.getDate()).toString().padStart(2,"0")}`

    if (phDates.includes(todayDateAsString)) {
        day.value = "ph"
    }
}

const time = document.querySelector('input[type="time"]')
const day = document.querySelector('select[name="day"]')

initializeDayTime()

// set time to now
document.querySelector('#setNow').addEventListener('click', (event) => {
    const now = new Date()

    const hour = now.getHours().toString().padStart(2, "0")
    const minute = now.getMinutes().toString().padStart(2, "0")

    time.value = `${hour}:${minute}`    
    time.dispatchEvent(new Event('change'))
})

// set day to today
document.querySelector('#setToday').addEventListener('click', (event) => {
    const now = new Date()

    day.value = dayMap[now.getDay()]

    const phDates = phData.vcalendar[0].vevent.map(d => d.dtstart[0])

    const todayDateAsString = `${now.getFullYear().toString()}${(now.getMonth()+1).toString().padStart(2,"0")}${(now.getDate()).toString().padStart(2,"0")}`

    if (phDates.includes(todayDateAsString)) {
        day.value = "ph"
    }

    day.dispatchEvent(new Event('change'))
})