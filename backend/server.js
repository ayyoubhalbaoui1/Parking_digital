const express = require('express')
const app = express()
const db = require('./models')

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

// Routes : 
const studentRoutes = require('./routes/students')
const placeRoutes = require('./routes/place')
const viheculeRoutes = require('./routes/vihecule')
app.use("/api/students", studentRoutes)
app.use("/api/place", placeRoutes)
app.use("/api/vih", viheculeRoutes)


// App Server Connection
db.sequelize.sync().then((res) => {
    app.listen(process.env.PORT || 8080, () => {
        console.log(`app is running on port ${process.env.PORT || 8080}`)
    })
})