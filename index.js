import express from "express"
import morgan from "morgan"
import cors from "cors"
import dashboardController from "./controller/dashboardController.js"
import filterController from "./controller/filterController.js"
const app = express()
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get("/",(req, res)=>{
    res.status(200).json({
        message:"Welcome To Training DB"
    })
})
app.use(dashboardController)
app.use(filterController)
app.listen(5000,()=>{
    console.log(`Your application running in http://localhost:5000`)
})