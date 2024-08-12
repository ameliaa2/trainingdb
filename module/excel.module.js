import prisma from "../helpers/prisma.js"
class _excel {
    // createUser = async (req) => {
    //     try {
    //         const usersToAdd = req.body.datausers
    //         const existingUsers = await prisma.users.findMany({
    //             select: { id: true },
    //         });
    //         const existingUserIds = existingUsers.map(user => user.id);
    //         // Filter out users that already exist
    //         const newUsers = usersToAdd.filter(user => !existingUserIds.includes(user.id));
    //         if (newUsers) {
    //             if (newUsers.length !== 0) {
    //                 // Add new users
    //                 // const createdUsers = await prisma.users.createMany({
    //                 //     data: newUsers,
    //                 // });
    //                 return {
    //                     message: "Any New Data",
    //                     data: newUsers
    //                 }
    //             }
    //             return {
    //                 message: "Not Any New Data",
    //                 data: newUsers
    //             }
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         return {
    //             message: "Internal Server Error",
    //             data: error
    //         }
    //     }
    // }
    validateDepartemen = async (req) => {
        try {
            const request = req.body.datadepartemen
            const rawData = await prisma.departemen.findMany()
            let formattedData = []
            rawData.forEach((item) => {
                if (!formattedData.includes(item.name)) {
                    formattedData.push(item.name)
                }
            })
            const difference = request.filter(department => !formattedData.includes(department));
            if (difference) {
                if (difference.length !== 0) {
                    //Tambah data Departemen Baru
                    const data = difference.map(item => ({
                        name: item
                    }))
                    const addNewData = await prisma.departemen.createMany({ data: data })
                    if (addNewData) {
                        return {
                            message: "Success Add New Data",
                            data: addNewData
                        }
                    }
                    // return {
                    //     message: "Any New Data",
                    //     data: data
                    // }
                }
                return {
                    message: "Not Any New Data",
                    data: difference
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
    validateTeam = async (req) => {
        try {
            const request = req.body.datateam
            const rawData = await prisma.team.findMany()
            let formattedData = []
            rawData.forEach((item) => {
                if (!formattedData.includes(item.name)) {
                    formattedData.push(item.name)
                }
            })
            const difference = request.filter(team => !formattedData.includes(team));
            if (difference) {
                if (difference.length !== 0) {
                    //Tambah data Team Baru
                    const data = difference.map(item => ({
                        name: item
                    }))
                    const addNewData = await prisma.team.createMany({ data: data })
                    if (addNewData) {
                        return {
                            message: "Success Add New Data",
                            data: addNewData
                        }
                    }
                    // return {
                    //     message: "Any New Data",
                    //     data: data
                    // }
                }
                return {
                    message: "Not Any New Data",
                    data: difference
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
    validateLicense = async (req) => {
        try {
            const request = req.body.datalicense
            const rawData = await prisma.license.findMany()
            let formattedData = []
            rawData.forEach((item) => {
                if (!formattedData.includes(item.name)) {
                    formattedData.push(item.name)
                }
            })
            const difference = request.filter(license => !formattedData.includes(license));
            if (difference) {
                if (difference.length !== 0) {
                    //Tambah data License Baru
                    const data = difference.map(item => ({
                        name: item
                    }))
                    const addNewData = await prisma.license.createMany({ data: data })
                    if (addNewData) {
                        return {
                            message: "Success Add New Data",
                            data: addNewData
                        }
                    }
                    // return {
                    //     message: "Any New Data",
                    //     data: data
                    // }
                }
                return {
                    message: "Not Any New Data",
                    data: difference
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
    createAuthUsersDepartemenTeamLicense = async (req) => {
        try {
            const usersToAdd = req.body.datafromexcel;
            for (const user of usersToAdd) {
                const {
                    ID,
                    Name,
                    Team,
                    Dept,
                    Jobs,
                    Grade,
                    CertificationName,
                    Yearly,
                    IssuedDate,
                    ExpirationDate,
                    Year,
                    Category,
                    Status,
                    Level,
                    Institusi,
                    CertificationCategory,
                    Remark,
                } = user;
                const departemen = await prisma.departemen.findFirst({
                    where: { name: Dept },
                });
                const team = await prisma.team.findFirst({
                    where: { name: Team },
                });
                const license = await prisma.license.findFirst({
                    where: { name: CertificationName },
                });
                const existingUser = await prisma.users.findFirst({
                    where: { id: ID }
                });
                if (existingUser === null) {
                    const createuser = await prisma.users.create({
                        data: {
                            id: ID,
                            name: Name
                        }
                    })
                    console.log(createuser)
                }
                const existingAuthUser = await prisma.auth_users.findFirst({
                    where: { iduser: ID }
                });
                if (!existingAuthUser) {
                    await prisma.auth_users.create({
                        data: {
                            iduser: ID,
                            iddepartemen: departemen.id,
                            idteam: team.id,
                            jobs: Jobs,
                            grade: Grade,
                        },
                    });
                }
                const existingAuthUserDepartemenTeamLicense = await prisma.auth_users_departemen_team.findFirst({
                    where: {
                        iduser: ID,
                        idlicense: license.id,
                        level:Level?String(Level):null,
                        issuedyear:Yearly
                    }
                })
                if (!existingAuthUserDepartemenTeamLicense) {
                    // Add to the 'auth_users_departemen_team' table
                    const addData = await prisma.auth_users_departemen_team.create({
                        data: {
                            iduser: ID,
                            iddepartemen: departemen.id,
                            idteam: team.id,
                            idlicense: license.id,
                            category: Category,
                            status: Status,
                            certificationCategory:CertificationCategory,
                            remarks:Remark,
                            institusi:Institusi,
                            level: Level ? String(Level) : null,
                            pathlicense: null, // Assuming pathlicense is not provided in input
                            issueddate: IssuedDate  ? new Date(Math.round((IssuedDate - 25569) * 86400 * 1000)) : null,
                            expireddate: !ExpirationDate  || ExpirationDate === 'Unlimited' ? null : new Date(Math.round((ExpirationDate - 25569) * 86400 * 1000)),
                            issuedyear: Yearly,
                            expiredyear: Year ? Year:null,
                        },
                    });
                    console.log(addData)
                }
            }
            return {
                message: "success",
                // result:result
            }
        }
        catch (error) {
            console.log(error)
            return {
                message: "Internal Server Error",
                data: error
            }
        }
    }
    existingUserId = async (req) => {
        try {
            const iduser = req.body.iduser
            const tes = req.body.tes
            const { level } = tes
            console.log('ini tes level', level)
            console.log(iduser)
            const existingAuthUser = await prisma.auth_users.findFirst({
                where: { iduser: iduser }
            });
            console.log(existingAuthUser)
            return {
                message: "Success",
                data: existingAuthUser
            }
        } catch (error) {
            console.log(error)
            return {
                message: "Internal Server Error",
                data: error
            }
        }
    }
    cekAja = async () => {
        try {
            const countdata = await prisma.auth_users_departemen_team.count()
            if (countdata) {
                return {
                    message: "Success",
                    data: countdata
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
export default new _excel()


// else{
//     return{
//         message:"Not Any New Data",
//         data:formattedData
//     }
// }
// console.log(formattedData)
// const arrayDepartemen = Object.values(formattedData)
// if(rawData){
//     return{
//         message:"Success",
//         data:formattedData
//     }
// }