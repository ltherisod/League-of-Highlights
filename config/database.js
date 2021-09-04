const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB)
.then(()=>console.log("Database Connected"))
.catch((error)=>console.log(error.message))
