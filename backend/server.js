const express = require('express')
const app = express()
var cors = require('cors')
const db = require('./models')

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cors())

// Routes : 
const adminRoutes = require('./routes/admins')
const studentRoutes = require('./routes/students')
const placeRoutes = require('./routes/place')
const viheculeRoutes = require('./routes/vihecule')
app.use("/api/admins", adminRoutes)
app.use("/api/students", studentRoutes)
app.use("/api/place", placeRoutes)
app.use("/api/vih", viheculeRoutes)


// App Server Connection
db.sequelize.sync().then((res) => {
    app.listen(process.env.PORT || 8080, () => {
        console.log(`app is running on port ${process.env.PORT || 8080}`)
    })
})