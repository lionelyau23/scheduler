const DBSchedule = {
    "title": "Peng Chau - Discovery Bay - Trappist Dairy",
    "fromLocations": [
        "peng-chau",
        "discovery-bay",
        "trappist-dairy"
    ],
    "schedules": [
        {
            "days": "mon tue wed thu fri sat",
            "from": "peng-chau",
            "times": [
                "06:30",
                "07:00",
                "07:45 +",
                "08:30",
                "09:10 +",
                "10:15 +",
                "11:20 +",
                "12:20 +",
                "13:00",
                "14:20 +",
                "15:30 @+",
                "16:15 +",
                "17:00 +",
                "17:45",
                "18:15",
                "18:45",
                "19:45",
                "20:45 @",
                "22:00"
            ] 
        },
        {
            "days": "mon tue wed thu fri sat",
            "from": "discovery-bay",
            "times": [
                "06:45",
                "07:10",
                "08:00 +",
                "08:45",
                "09:20 +",
                "10:30 +",
                "11:40",
                "12:40",
                "13:20",
                "14:35 +",
                "15:45 @+",
                "16:40",
                "17:30",
                "18:00",
                "18:30",
                "19:00",
                "20:00",
                "21:00 @",
                "22:15"
            ]
        },
        {
            "days": "mon tue wed thu fri sat",
            "from": "trappist-dairy",
            "times": [
                "-----",
                "-----",
                "08:10",
                "-----",
                "09:30",
                "10:45 #",
                "11:30",
                "12:30 #",
                "-----",
                "14:25",
                "16:00 @",
                "16:25 #",
                "17:10 #",
                "-----",
                "-----",
                "-----",
                "-----",
                "-----",
                "-----",
                "-----"
            ]
        },
        {
            "days": "sun ph",
            "from": "peng-chau",
            "times": [
                "06:30",
                "07:00",
                "07:45 +",
                "08:45",
                "09:30 +",
                "10:15 +",
                "11:00 +",
                "12:10 +",
                "13:00",
                "13:35",
                "14:30 +",
                "15:30 +",
                "16:15 +",
                "17:00 +",
                "17:45",
                "18:15",
                "18:45",
                "19:45",
                "20:45",
                "22:00"
            ] 
        },
        {
            "days": "sun ph",
            "from": "discovery-bay",
            "times": [
                "06:45",
                "07:10",
                "08:00 +",
                "09:00",
                "09:40 +",
                "10:40",
                "11:15 +",
                "12:30",
                "13:20",
                "13:50",
                "14:45 +",
                "15:45 +",
                "16:40",
                "17:30",
                "18:00",
                "18:30",
                "19:00",
                "20:00",
                "21:00",
                "22:15"
            ]
        },
        {
            "days": "sun ph",
            "from": "trappist-dairy",
            "times": [
                "-----",
                "-----",
                "08:10",
                "-----",
                "09:50",
                "10:25 #",
                "11:30",
                "12:20 #",
                "-----",
                "-----",
                "15:00",
                "16:00",
                "16:25 #",
                "17:10 #",
                "-----",
                "-----",
                "-----",
                "-----",
                "-----",
                "-----"
            ]
        }
    ],
    "fare": `
        <table>
        <tr>
            <th>Passenger / Cargo Type</th>
            <th>Fare</th>
        </tr>
        <tr>
            <td>Adult</td>
            <td>HK$ 7.5</td>
        </tr>
        <tr>
            <td>Child</td>
            <td>HK$ 3.0</td>
        </tr>
        <tr>
            <td>Bike / Pet</td>
            <td>HK$ 6.0</td>
        </tr>
        <tr>
            <td>Other Cargo</td>
            <td>Please contact Kai To company</td>
        </tr>
        </table>
    `,
    "remarks": `
        <p>@ Saturday Only</p>
        <p>+ Via Trappist Dairy</p>
        <p># From Trappist Dairy to Discovery Bay</p>
        <p><b>For latest ferry info, please refer to <a href="https://en.pengchaukaito.com/ferry-timetable-fare" target="_blank">Peng Chau Kai To</a> or <a href="https://www.td.gov.hk/en/transport_in_hong_kong/public_transport/ferries/kaito_services_map/service_details/index.html#k11" target="_blank">Transport Department</a>.</b></p>
    `
}