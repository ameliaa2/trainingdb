import { Router } from "express";
import m$updatelicense from '../module/updatelicense.module.js'
const updateLicenseController = Router()
updateLicenseController.put('/update/license/', async(req, res)=>{
    try {
        const data = await m$updatelicense.updateLicense(req)
        res.status(200).json({message:'update success',data:data})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
export default updateLicenseController