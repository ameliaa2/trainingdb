import { Router } from "express";
import m$filter from "../module/filter.module.js";
const filterController = Router()
filterController.post('/filterSearch', async(req, res)=>{
    try {
        const data = await m$filter.filterSearch(req)
        res.status(200).json({message:"succes", data:data})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }
} )
export default filterController