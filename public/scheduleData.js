const scheduleData = {
    "title": "Peng Chau - Central",
    "fromLocations": [
        "peng-chau",
        "central"
    ],
    "schedules": [
        {
            "title": "Monday to Friday",
            "days": "mon tue wed thu fri sat",
            "locSheets": [
                {
                    "title": "From Central",
                    "from": "central",
                    "times": [
                        "03:00 {}",
                        "07:00 *",
                        "07:40 *",
                        "08:00",
                        "08:30 *",
                        "09:15 #&#9650;",
                        "10:00 *",
                        "10:45 #&#9650;",
                        "11:30 *",
                        "12:15 #&#9650;",
                        "13:00 *",
                        "13:45 #&#9650;",
                        "14:30 *",
                        "15:15 #&#9650;",
                        "16:10 *",
                        "16:45",
                        "17:30 *",
                        "18:00 #",
                        "18:30 *",
                        "19:00 *",
                        "19:30 #",
                        "20:00",
                        "20:30 *",
                        "21:15 #",
                        "22:00 *",
                        "22:45",
                        "23:30 *",
                        "00:30 ^#"
                    ]         
                },
                {
                    "title": "From Peng Chau",
                    "from": "peng-chau",
                    "times": [
                        "03:40 {}",
                        "05:30 *",
                        "06:15 *",
                        "07:00 *",
                        "07:25",
                        "07:45 *",
                        "08:20 *",
                        "08:35",
                        "09:15 *",
                        "10:00 &#9650;",
                        "10:45 *",
                        "11:30 &#9650;",
                        "12:15 *",
                        "13:00 &#9650;",
                        "13:45 *",
                        "14:30 &#9650;",
                        "15:15 *",
                        "16:00 &#9650;",
                        "16:55 *",
                        "17:25",
                        "18:15 *",
                        "18:50",
                        "19:45 *",
                        "20:30",
                        "21:15 *",
                        "22:05",
                        "22:45 *",
                        "23:30 ^"
                    ]        
                }
            ]
        },
        {   
            "title": "Sunday and Public Holiday",
            "days": "sun ph",
            "locSheets": [
                {
                    "title": "From Central",
                    "from": "central",
                    "times": [
                        "03:00 {}",
                        "07:00 #",
                        "07:50 *",
                        "08:40 #",
                        "09:30 *",
                        "10:20 #",
                        "11:05 *",
                        "12:00 #",
                        "12:45 *",
                        "13:40 #",
                        "14:30 *",
                        "15:20 #",
                        "16:10 *",
                        "17:00 #",
                        "17:50 *",
                        "18:40 #",
                        "19:30 *",
                        "20:20 #",
                        "21:15 *",
                        "22:00 #",
                        "22:50 *",
                        "23:40 #",
                        "00:30 ^*"
                    ]         
                },
                {
                    "title": "From Peng Chau",
                    "from": "peng-chau",
                    "times": [
                        "03:40 {}",
                        "05:30",
                        "06:30",
                        "07:00 *",
                        "07:50",
                        "08:40 *",
                        "09:30",
                        "10:20 *",
                        "11:10",
                        "11:50 *",
                        "12:50",
                        "13:30 *",
                        "14:30",
                        "15:20 *",
                        "16:10",
                        "17:00 *",
                        "17:50",
                        "18:40 *",
                        "19:30",
                        "20:20 *",
                        "21:15",
                        "22:00 *",
                        "22:50",
                        "23:35 ^*"
                    ]        
                }
            ]
        }
    ],
    "fare": `
        <table>
        <tr>
            <th rowspan="2" class="border-less"></th>
            <th colspan="2">Monday to Saturday</th>
            <th colspan="2">Sunday and Public Holidays</th>
        </tr>
        <tr>
            <td>Ordinary</td>
            <td>Fast</td>
            <td>Ordinary</td>
            <td>Fast</td>
        </tr>
        <tr>
            <td>Adult</td>
            <td>$16.6</td>
            <td>$31.0</td>
            <td>$23.9</td>
            <td>$45.6</td>
        </tr>
        <tr>
            <td>Child (aged 3 or above but under 12)</td>
            <td>$8.3</td>
            <td>$15.5</td>
            <td>$11.9</td>
            <td>$22.8</td>
        </tr>
        <tr>
            <td>Elderly (aged 65 or above) / Disabled</td>
            <td>$8.3</td>
            <td>$15.5</td>
            <td>$11.9</td>
            <td>$22.8</td>
        </tr>
        <tr>
            <td>Child Under 3 (accompanied by adult)</td>
            <td colspan="2">FREE</td>
            <td colspan="2">FREE</td>
        </tr>
        </table>
    `,
    "remarks": `
        <p>* Ordinary Ferry Services</p>
        <p>^ Last Sailing</p>
        <p>{} No freight is allowed on the First Sailing on the fast ferry (except bicycle)</p>
        <p>&#9650; Freight service and consigned freight service will be provided on these fast ferry sailings</p>
        <p># The second onward journey of these sailings is to Hei Ling Chau when vessel arrives at Peng Chau. Passengers going to Hei Ling Chau do not need to disembark at Peng Chau Ferry Pier.</p>
        <p><b>For latest ferry info, please refer to <a href="https://hkkf.com.hk/en/timetables/central-to-peng-chau/" target="_blank">HKKF</a> or <a href="https://www.td.gov.hk/en/transport_in_hong_kong/public_transport/ferries/service_details/?print=1#o03" target="_blank">Transport Department</a>.</b></p>
    `
}