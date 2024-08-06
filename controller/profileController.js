import { Router } from "express";
import m$profile from "../module/profile.module.js"
const profileController = Router()
profileController.post('/profile/get', async(req, res)=>{
    try {
        const data = await m$profile.getDetailUser(req)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(data)
    }

})
profileController.put('/profile/uploadFoto', async(req, res)=>{
    try {
        const data = await m$profile.uploadFoto(req)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(data)
    }
})
profileController.post('/profile/uploadKtp', async(req, res)=>{
    try {
        const data = await m$profile.uploadKtp(req)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(data)
    }
})
profileController.post('/profile/uploadIjazah', async(req, res)=>{
    try {
        const data = await m$profile.uploadIjazah(req)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(data)
    }
})
export default profileController