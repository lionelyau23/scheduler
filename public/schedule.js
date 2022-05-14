const loadSchedule = (data) => {
   document.querySelector('.schedules').replaceChildren()

   const root = new DocumentFragment()

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

   document.querySelector('.schedules').appendChild(root)
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

const highlight = () => {
    highlightSelectedTime()
    highlightSheet()
}

const loadFare = (fareData) => {
    const root = document.querySelector('.fare div')
    root.replaceChildren()
    root.innerHTML = fareData
}

const loadRemarks = (remarksData) => {
    const root = document.querySelector('.remarks div')
    root.replaceChildren()
    root.innerHTML = remarksData
}

const loadFromOptions = (fromLocationsData) => {
    selectedFrom.replaceChildren()

    fromLocationsData.forEach(loc => {
        const node = document.createElement('option')
        node.setAttribute('value', loc)
        node.innerText = loc.split("-").map(word => word[0].toUpperCase() + word.substring(1)).join(" ")
        selectedFrom.appendChild(node)
    })
}

const loadRouteOptions = (routes) => {
    const root = new DocumentFragment()

    routes.forEach(r => {
        const option = document.createElement('option')
        option.setAttribute('value', r.route)
        option.innerText = r.title
        root.appendChild(option)
    })

    document.querySelector('select[name="route"]').appendChild(root)
}

const initializeSavedRoute = (routes) => {
    let savedRoute = localStorage.getItem('route')
    if (!savedRoute || !routes.map(r => r.route).includes(savedRoute)) {
        localStorage.setItem('route', routes[0].route)
        savedRoute = localStorage.getItem('route')
    }

    selectedRoute.value = savedRoute
}

const initializeSavedFrom = (route, data) => {
    let savedFrom = localStorage.getItem(route)
    if (!savedFrom || !data.fromLocations.includes(savedFrom)) {
        localStorage.setItem(route, data.fromLocations[0])
        savedFrom = localStorage.getItem(route)
    }

    selectedFrom.value = savedFrom
}

const loadScheduleData = (data) => {
    loadFromOptions(data.fromLocations)
    loadSchedule(data)
    loadFare(data.fare)
    loadRemarks(data.remarks)
}

const loadData = async (data) => {
    const temp = (await Promise.allSettled(data.map(d => fetch(`/${d.link}`).then(res => res.json())))).map(p => p.value)

    const result = {}

    data.forEach(d => {
        result[d.route] = temp.find(t => t.title === d.title)
    })
    
    return result
}

const initialize = async () => {

    // get routes data from server
    const data = await fetch(`/routes`).then(res => res.json())

    routeData = await loadData(data)
   
    loadRouteOptions(data)

    initializeSavedRoute(data)
    loadScheduleData(routeData[selectedRoute.value])

    initializeSavedFrom(selectedRoute.value, routeData[selectedRoute.value])
    highlight()
}

const selectedTime = document.querySelector('input[type="time"]')
const selectedFrom = document.querySelector('select[name="from"]')
const selectedDay = document.querySelector('select[name="day"]')
const selectedRoute = document.querySelector('select[name="route"]')

let routeData = {}

initialize()

const inputs = [selectedTime, selectedFrom, selectedDay]

inputs.forEach(input => {
    input.addEventListener('change', ( { target } ) => {
        highlight()

        if (target.getAttribute('name') === "from") {
            localStorage.setItem(selectedRoute.value, target.value)
        }
    })
})

selectedRoute.addEventListener('change', ({ target : {value}}) => {
    const data = routeData[value]
    loadScheduleData(data)
    
    localStorage.setItem('route', value)

    const savedFrom = localStorage.getItem(value)
    if (savedFrom) {
        selectedFrom.value = savedFrom
    }
    highlight()
})