const express = require("express")
const cors = require("cors")
const passport = require("passport")
require("dotenv").config()
require("./config/database")
require("./config/passport")
const path = require("path")
const socket = require("socket.io")

const app = express()
const router = require("./routes/index")

app.use(cors())
app.use(express.json())
app.use("/api", router)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"))
  })
}

const server = app.listen(
  process.env.PORT || 4000,
  process.env.HOST || "0.0.0.0",
  () => console.log(`Server listening on port ${process.env.PORT || 4000}`)
)

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
})


