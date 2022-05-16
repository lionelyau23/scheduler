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
    const selectedHour = document.querySelector('input[type="time"]')
    const selectedDay = document.querySelector('select[name="day"]')

    // const now = new Date('2022-05-09T03:04:00')
    const now = new Date()

    const hour = now.getHours().toString().padStart(2, "0")
    const minute = now.getMinutes().toString().padStart(2, "0")

    selectedHour.value = `${hour}:${minute}`    
    
    selectedDay.value = dayMap[now.getDay()]

    const phDates = phData.vcalendar[0].vevent.map(d => d.dtstart[0])

    const todayDateAsString = `${now.getFullYear().toString()}${(now.getMonth()+1).toString().padStart(2,"0")}${(now.getDate()).toString().padStart(2,"0")}`

    if (phDates.includes(todayDateAsString)) {
        selectedDay.value = "ph"
    }
}

initializeDayTime()