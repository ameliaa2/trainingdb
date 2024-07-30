import express from "express"
import morgan from "morgan"
import cors from "cors"
import profileController from "./controller/profileController.js"
import dashboardController from "./controller/dashboardController.js"
import filterController from "./controller/filterController.js"
import excelController from "./controller/excelController.js"
const app = express()
app.use(cors())
app.use(morgan("dev"))
app.use(express.json({limit: '100mb'}))
app.use(express.urlencoded({limit: '100mb',extended:true}))
app.get("/",(req, res)=>{
    res.status(200).json({
        message:"Welcome To Training DB"
    })
})
app.use(dashboardController)
app.use(filterController)
app.use(excelController)
app.use(profileController)
app.listen(5000,()=>{
    console.log(`Your application running in http://localhost:5000`)
})