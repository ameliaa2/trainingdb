import { Router } from "express"
import m$excel from "../module/excel.module.js"
const excelController = Router()
excelController.post('/excel/createuser', async(req, res)=>{
    try {
        const data = await m$excel.createUser(req)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(data)
    }
})
excelController.post('/excel/cekiduser', async(req, res)=>{
    try {
        const data = await m$excel.existingUserId(req)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(data)
    }
})
excelController.post('/excel/insertdata', async(req, res)=>{
    try {
        const data = await m$excel.createAuthUsersDepartemenTeamLicense(req)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(data)
    }
})
excelController.post('/excel/validatedepartemen', async(req, res)=>{
    try {
        const data = await m$excel.validateDepartemen(req)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(data)
    }
})
excelController.post('/excel/validateteam', async(req, res)=>{
    try {
        const data = await m$excel.validateTeam(req)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(data)
    }
})
excelController.post('/excel/validatelicense', async(req, res)=>{
    try {
        const data = await m$excel.validateLicense(req)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(data)
    }
})
excelController.get('/tes', async(req, res)=>{
    try {
        const data = await m$excel.cekAja()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(data)
    }
})
export default excelController