const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())
app.use("/songs", require("./controllers/songs.js"))
app.use("/albums", require("./controllers/albums.js"))

app.get("/", (req, resp) => {
    resp.status(200).send(
        '<h1>Tuner App Server</h1><p>endpoints<li>/songs (queries? order=asc/desc, is_favorite=true/false)</li><li>/songs/:id</li><li>/albums</li><li>/albums/:id</li><li>/albums/:id/songs</li></p>'
        )
})

app.get("*", (req, resp) => {
    resp.status(404).send("Page Not Found")
})

module.exports = app