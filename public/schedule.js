const loadSchedule = (data) => {
   const root = document.querySelector('.schedules')

   const title = document.createElement('h2')
   title.innerText = data.title
   root.appendChild(title)

   const dayContainer = document.createElement('div')
   dayContainer.classList.add('daySheet-container')
   root.appendChild(dayContainer)

    // populate each daySheet
    data.schedules.forEach(daySheet => {
       const sheet = document.createElement('div')
       sheet.className = `daySheet ${daySheet.days}`
       
       // create title for daySheet
       const title = document.createElement('h2')
       title.innerText = daySheet.title
       sheet.appendChild(title)

       const locContainer = document.createElement('div')
       locContainer.classList.add('locSheet-container')
       sheet.appendChild(locContainer)

       // populate each locSheet
       daySheet.locSheets.forEach(loc => {
           const locSheet = document.createElement('div')
           locSheet.className = `locSheet ${loc.from}`

           // create title for locSheet
           const title = document.createElement('h3')
           title.innerText = loc.title
           locSheet.appendChild(title)

           const timeContainer = document.createElement('div')
           locSheet.appendChild(timeContainer)

           // populate each ferry time
           loc.times.forEach(time => {
               const node = document.createElement('div')
               node.innerText = time
               node.dataset.time = getIntFromText(time)
               node.classList.add('timeNode')
               timeContainer.appendChild(node)
           })

           // if there is except in data
           if (loc.except) {
                loc.except.forEach(e => {
                    // store the exceptions in div data
                    const target = locSheet.querySelector(`div[data-time="${getIntFromText(e.time)}"]`)
                    target.dataset.except = e.days
                })
            }

           locContainer.appendChild(locSheet)
       })

       dayContainer.appendChild(sheet)
   })
}

const getIntFromText = (text) => {
    let result = parseInt(text.replaceAll(/\D/g, ''))
    return isNaN(result) ? "-" : result
}

// given a list of times, find the target time html element
const findTime = (time, [...timeList]) => {

    let timeValue = getIntFromText(time)

    timeValue = timeValue < 100 ? timeValue + 2400 : timeValue

    let result = timeList.find(t => {
        let tValue = parseInt(t.dataset.time)

        tValue = tValue < 100 ? tValue + 2400 : tValue

        return timeValue < tValue
    })

    // return the earliest non-blank time if no time is suitable
    return result ? result : timeList.find(t => t.dataset.time != "-")
}

const findTimeList = (loc, day) => {
    return document.querySelector(`.daySheet.${day} .locSheet.${loc}`)
}

const highlightSelectedTime = () => {
    const previousTime = document.querySelector('.highlighted-time')
    if (previousTime !== null) {
        previousTime.classList.remove("highlighted-time")
    }

    if (selectedTime.value !== "") {
        const locSheet = findTimeList(selectedFrom.value, selectedDay.value)

        let time = findTime(selectedTime.value, locSheet.querySelector('div').children)

        if (time.dataset.except) {
            if (time.dataset.except.includes(selectedDay.value)) {
                time = findTime(time.dataset.time, locSheet.querySelector('div').children)
            }
        }

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
    loadSchedule(data)
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