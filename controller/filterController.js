import { Router } from "express";
import m$filter from "../module/filter.module.js";
const filterController = Router()
filterController.post('/filterSearch', async(req, res)=>{
    try {
        const data = await m$filter.filterSearch(req)
        res.status(200).json({message:"succes", data:data})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal Server Error",data:data})
    }
} )
filterController.get('/listdepartemen', async(req, res)=>{
    try {
        const data = await m$filter.listDepartemen()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(data)
    }
})
filterController.get('/listteam', async(req, res)=>{
    try {
        const data = await m$filter.listTeam()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(data)
    }
})
filterController.get('/listlicense', async(req, res)=>{
    try {
        const data = await m$filter.listLicense()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(data)
    }
})
export default filterController