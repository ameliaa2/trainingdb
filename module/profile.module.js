import prisma from "../helpers/prisma.js"
class _profile {
    getDetailUser = async (req) => {
        try {
            const { iduser } = req.body
            console.log(iduser)
            const getUser = await prisma.users.findUnique({
                where: {
                    id: Number(iduser)
                },
                include: {
                    auth_users_departemen_team: {
                        include: { license: true }
                    }
                }
            })
            const dataFormatted = {
                id: getUser.id,
                name: getUser.name,
                pathktp: getUser.pathktp,
                pathphoto: getUser.pathphoto,
                pathijazah: getUser.pathijazah,
                created_at: getUser.created_at,
                updated_at: getUser.updated_at,
                license: getUser.auth_users_departemen_team.map(item=>({
                    name:item.license.name,
                    pathlicense:item.pathlicense
                }))
            }
            if (getUser) {
                return {
                    message: "Success",
                    data: dataFormatted
                }
            }
        } catch (error) {
            console.log(error)
            return {
                message: "Internal Server Error",
                data: error
            }
        }
    }
    uploadFoto = async (req) => {
        try {
            const payload = req.body
            const { pathphoto, iduser } = payload
            const edit = await prisma.users.update({
                where: { id: iduser },
                data: { pathphoto: pathphoto }
            })
            if (edit) {
                return {
                    message: "Success",
                    data: edit
                }
            }
        } catch (error) {
            console.log(error)
            return {
                message: "Internal Server Error",
                data: error
            }
        }
    }
    uploadKtp = async (req) => {
        try {
            const payload = req.body
            const { pathktp, iduser } = payload
            const edit = await prisma.users.update({
                where: { id: iduser },
                data: { pathktp: pathktp }
            })
            if (edit) {
                return {
                    message: "Success",
                    data: edit
                }
            }
        } catch (error) {
            console.log(error)
            return {
                message: "Internal Server Error",
                data: error
            }
        }
    }
    uploadIjazah = async (req) => {
        try {
            const payload = req.body
            const { pathijazah, iduser } = payload
            const edit = await prisma.users.update({
                where: { id: iduser },
                data: { pathijazah: pathijazah }
            })
            if (edit) {
                return {
                    message: "Success",
                    data: edit
                }
            }
        } catch (error) {
            console.log(error)
            return {
                message: "Internal Server Error",
                data: error
            }
        }
    }
}
export default new _profile()