import prisma from "../helpers/prisma.js"
class _dashboard {
    countUsers = async () => {
        try {
            const totalUser = await prisma.users.count()
            if (totalUser) {
                return {
                    message: "success",
                    data: totalUser
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    countLicense = async () => {
        try {
            const totalLicense = await prisma.auth_users_departemen_team.count({
                where: {
                    pathlicense: {
                        not: null
                    }
                }
            })
            return {
                message: "success",
                data: totalLicense
            }

        } catch (error) {
            console.log(error)
        }
    }
    countIjazah = async () => {
        try {
            const totalIjazah = await prisma.users.count({
                where: {
                    pathijazah: {
                        not: null
                    }
                }
            })
            return {
                message: "success",
                data: totalIjazah
            }
        } catch (error) {
            console.log(error)
        }
    }
    countKtp = async () => {
        try {
            const totalKtp = await prisma.users.count({
                where: {
                    pathktp: {
                        not: null
                    }
                }
            })
            return {
                message: "success",
                data: totalKtp
            }
        } catch (error) {
            console.log(error)
        }
    }
    getLabel = async () => {
        try {
            const distinctDepartement = await prisma.auth_users_departemen_team.findMany({
                select: {
                    departemen: {
                        select: {
                            name: true
                        }
                    }
                }
                // ,
                // distinct: ['iddepartemen']
            })
            const departemenCount = {};
            // Mengelompokkan dan menghitung jumlah orang di setiap departemen
            distinctDepartement.forEach(item => {
                const departemenName = item.departemen.name;
                if (departemenCount[departemenName]) {
                    departemenCount[departemenName]++;
                } else {
                    departemenCount[departemenName] = 1;
                }
            });
            const label = Object.keys(departemenCount)
            const values = Object.values(departemenCount)
            return {
                message: "success",
                data: {
                    label:label,
                    values:values
                }
            }
            // const idDepartemen = distinctDepartement.map(data=>data.iddepartemen)
            // console.log(idDepartemen)
            // return {
            //     message: "success",
            //     data: idDepartemen
            // }
        } catch (error) {
            console.log(error)
        }
    }
    getGrafik = async (req) => {
        try {
            const distinctDepartement = await prisma.auth_users_departemen_team.findMany({
                where:{
                    idlicense:Number(req.body.idlicense)
                },
                select: {
                    departemen: {
                        select: {
                            name: true
                        }
                    }
                }
            })
            const departemenCount = {};
            // Mengelompokkan dan menghitung jumlah orang di setiap departemen
            distinctDepartement.forEach(item => {
                const departemenName = item.departemen.name;
                if (departemenCount[departemenName]) {
                    departemenCount[departemenName]++;
                } else {
                    departemenCount[departemenName] = 1;
                }
            });
            const label = Object.keys(departemenCount)
            const values = Object.values(departemenCount)
            return {
                message: "success",
                data: {
                    label:label,
                    values:values
                }
                // data: distinctDepartement
            }
            // const idDepartemen = distinctDepartement.map(data=>data.iddepartemen)
            // console.log(idDepartemen)
            // return {
            //     message: "success",
            //     data: idDepartemen
            // }
        } catch (error) {
            console.log(error)
        }
    }
}
export default new _dashboard()