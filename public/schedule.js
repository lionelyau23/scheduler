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

    // return the earliest time if no time is suitable
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
    const time = findTime(selectedTime.value, findTimeList(selectedFrom.value, selectedDay.value))
    time.classList.add("highlighted-time")
}

const highlightSheet = () => {
    const previousSheet = document.querySelector('.highlighted-sheet')
    if (previousSheet !== null) {
        previousSheet.classList.remove("highlighted-sheet")
    }

    const sheet = document.querySelector(`.${selectedDay.value} .${selectedFrom.value}`)
    sheet.classList.add('highlighted-sheet')
}

const loadAndRefresh = (data) => {
    loadSchedule(data)
    highlightSelectedTime()
    highlightSheet()
}

const selectedTime = document.querySelector('input[type="time"]')
const selectedFrom = document.querySelector('select[name="from"]')
const selectedDay = document.querySelector('select[name="day"]')

loadAndRefresh(scheduleData)

// selectedTime.addEventListener('change', ({target: {value}}) => {
//     console.log(value)
// }) 

const selections = [selectedTime, selectedFrom, selectedDay]

for (let select of selections) {
    select.addEventListener('change', () => {
        highlightSelectedTime()
        highlightSheet()
    })
}

let selectedDestination = document.querySelector('.destination.selected')

const destinations = document.querySelectorAll('.destination')

for (let dest of destinations) {
    dest.addEventListener('click', ({target}) => {
        if (selectedDestination === target) {
            return
        }

        selectedDestination.classList.remove('selected')
        target.classList.add('selected')
        selectedDestination = target

        // console.log(document.querySelector('.schedules'))
        document.querySelector('.schedules').replaceChildren()

        if (target.innerHTML === 'Discovery Bay &amp; Trappist Dairy') {
            loadSchedule(DBSchedule)

            document.querySelector('select[name="from"] option[value="central"]').remove()
            let tempNode = document.createElement('option')
            tempNode.setAttribute('value', 'discovery-bay')
            tempNode.innerHTML = "Discovery Bay"
            document.querySelector('select[name="from"]').appendChild(tempNode)

            tempNode = document.createElement('option')
            tempNode.setAttribute('value', 'trappist-dairy')
            tempNode.innerHTML = "Trappist Dairy"
            document.querySelector('select[name="from"]').appendChild(tempNode)
        } else {
            loadSchedule(scheduleData)

            document.querySelector('select[name="from"] option[value="discovery-bay"]').remove()
            document.querySelector('select[name="from"] option[value="trappist-dairy"]').remove()

            let tempNode = document.createElement('option')
            tempNode.setAttribute('value', 'central')
            tempNode.innerHTML = "Central"
            document.querySelector('select[name="from"]').appendChild(tempNode)
        }

        highlightSelectedTime()
        highlightSheet()

    })
}