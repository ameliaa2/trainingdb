import { Router } from "express";
import m$dashboard from "../module/dashboard.module.js"
const dashboard = Router()
dashboard.get('/users', async (req, res)=>{
    const data = await m$dashboard.countUsers()
    if(data){
        res.status(200).json(data)
    }
    else{
        res.status(500).json({message:"Internal Server Error"})
    }
})
dashboard.get('/license', async (req, res)=>{
    const data = await m$dashboard.countLicense()
    if(data){
        res.status(200).json(data)
    }
    else{
        res.status(500).json({message:"Internal Server Error"})
    }
})
dashboard.get('/ijazah', async (req, res)=>{
    const data = await m$dashboard.countIjazah()
    if(data){
        res.status(200).json(data)
    }
    else{
        res.status(500).json({message:"Internal Server Error"})
    }
})
dashboard.get('/ktp', async (req, res)=>{
    const data = await m$dashboard.countKtp()
    if(data){
        res.status(200).json(data)
    }
    else{
        res.status(500).json({message:"Internal Server Error"})
    }
})
dashboard.get('/label', async (req, res)=>{
    const data = await m$dashboard.getLabel()
    if(data){
        res.status(200).json(data)
    }
    else{
        res.status(500).json({message:"Internal Server Error"})
    }
})
export default dashboard