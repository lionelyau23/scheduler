const loadSchedule = (data) => {
    const temp = document.querySelector('.schedules')

    data.forEach((sheet) => {
        let root = temp.querySelector(`.sheet-container.${sheet.days.replaceAll(" ",".")}`)
    
        if (root === null) {
            const daySheet = document.createElement('div')
            daySheet.classList.add('day-sheet')
            const title = document.createElement('h2')
            title.innerHTML = sheet.days.split(" ").map(w => w[0].toUpperCase() + w.substring(1)).join(" ")
            daySheet.appendChild(title)
    
            const sheetContainer = document.createElement('div')
            sheetContainer.className = `sheet-container ${sheet.days}`
            daySheet.appendChild(sheetContainer)
    
            temp.appendChild(daySheet)
            root = sheetContainer
        }
    
        const result = document.createElement("div")
        result.classList.add("sheet")
        result.classList.add(sheet.from)
    
        const title = document.createElement('h3')
        title.innerHTML = `From ${sheet.from.split("-").map(word => word[0].toUpperCase() + word.substring(1)).join(" ")}`
        result.appendChild(title)
    
        const times = document.createElement('div')
    
        sheet.times.forEach((time) => {
            const node = document.createElement('div')
            node.innerHTML = time
            times.appendChild(node)
        })
        result.appendChild(times)
        root.appendChild(result)
    })
}

const getIntFromText = (text) => {
    return parseInt(text.replaceAll(/\D/g, ''))
}

// given a list of times, find the target time html element
const findTime = (time, timeList) => {

    let timeValue = getIntFromText(time)

    if (timeValue < 100) {
        timeValue += 2400
    }

    for (let t of timeList) {
        let tValue = getIntFromText(t.innerHTML)

        if (tValue < 100) {
            tValue += 2400
        }

        if (timeValue < tValue) {
            return t
        }
    }

    // return the earliest non-blank time if no time is suitable
    for (let t of timeList) {
        if (getIntFromText(t.innerHTML) > 0) {
            return t
        }
    }
}

const findTimeList = (loc, day) => {
    return document.querySelector(`.sheet-container.${day} .sheet.${loc} > div`).children
}

const highlightSelectedTime = () => {
    const previousTime = document.querySelector('.highlighted-time')
    if (previousTime !== null) {
        previousTime.classList.remove("highlighted-time")
    }

    if (selectedTime.value !== "") {
        const time = findTime(selectedTime.value, findTimeList(selectedFrom.value, selectedDay.value))
        time.classList.add("highlighted-time")
    }
}

const highlightSheet = () => {
    const previousSheet = document.querySelector('.highlighted-sheet')
    if (previousSheet !== null) {
        previousSheet.classList.remove("highlighted-sheet")
    }

    const sheet = document.querySelector(`.${selectedDay.value} .${selectedFrom.value}`)
    sheet.classList.add('highlighted-sheet')
}

const loadFare = (data) => {
    const root = document.querySelector('.fare div')
    root.replaceChildren()
    root.innerHTML = data
}

const loadRemarks = (data) => {
    const root = document.querySelector('.remarks div')
    root.replaceChildren()
    root.innerHTML = data
}

const loadFromLocations = (data) => {
    selectedFrom.replaceChildren()

    data.forEach(loc => {
        const node = document.createElement('option')
        node.setAttribute('value', loc)
        node.innerText = loc.split("-").map(word => word[0].toUpperCase() + word.substring(1)).join(" ")
        selectedFrom.appendChild(node)
    })
}

const loadAndRefresh = (data) => {
    loadFromLocations(data.fromLocations)
    loadSchedule(data.schedules)
    loadFare(data.fare)
    loadRemarks(data.remarks)
    highlightSelectedTime()
    highlightSheet()
}

const selectedTime = document.querySelector('input[type="time"]')
const selectedFrom = document.querySelector('select[name="from"]')
const selectedDay = document.querySelector('select[name="day"]')

loadAndRefresh(scheduleData)

const selections = [selectedTime, selectedFrom, selectedDay]

selections.forEach(selected => {
    selected.addEventListener('change', () => {
        highlightSheet()
        highlightSelectedTime()
    })
})

const route = document.querySelector('select[name="route"]')

route.value = "peng-chau--central"

route.addEventListener('change', ({ target : {value}}) => {
    document.querySelector('.schedules').replaceChildren()
    document.querySelector('.remarks div').replaceChildren()

    selectedFrom.replaceChildren()

    const data = value === "peng-chau--central" ? scheduleData : DBSchedule

    loadAndRefresh(data)
})