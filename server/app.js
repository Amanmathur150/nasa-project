const express = require("express")
const cors = require("cors")
const path = require("path")
const planetRoute = require("./routes/planetRoutes")
const launcheRoute = require("./routes/launcheRoutes")
const app = express()

app.use(cors({
    origin : "http://localhost:3000"
}))

app.use(express.json())
app.use(express.urlencoded({
    extended : true,
}))
app.use(express.static(path.join(__dirname, 'public')));



app.use("/v1" , planetRoute)
app.use("/v1" , launcheRoute)

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
module.exports = app