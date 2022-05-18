const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const fs = require('fs')

const PORT = process.env.PORT || 3001

app.use(cors())

app.use(express.static('public'))

app.get('/routes', (req, res) => {

    fs.readFile('./data/routes.json', (err, data) => {
        res.json(JSON.parse(data))
    })
})

app.get('/routes/peng-chau--central', (req, res) => {

    fs.readFile('./data/peng-chau--central.json', (err, data) => {
        res.json(JSON.parse(data))
    })
})

app.get('/routes/peng-chau--discovery-bay--trappist-dairy', (req, res) => {

    fs.readFile('./data/peng-chau--discovery-bay--trappist-dairy.json', (err, data) => {
        res.json(JSON.parse(data))
    })
})

app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`)
})