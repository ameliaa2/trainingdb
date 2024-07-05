import prisma from "../helpers/prisma.js"
class _filter {
    noFilter = async (req, res) => {
        try {
            const currentPage = req.body.currentPage
            const limit = 3
            const skip = (currentPage - 1) * limit
            // const data = await prisma.auth_users_departemen_team.findMany({
            //     select:{
            //         users:{
            //             select:{
            //                 id: true,
            //                 name:true
            //             }
            //         },
            //         departemen:{
            //             select:{
            //                 name:true
            //             }
            //         },
            //         team:{
            //             select:{
            //                 name:true
            //             }
            //         },
            //         license:{
            //             select:{
            //                 name:true
            //             }
            //         },
            //         category:true,
            //         level:true,
            //         status:true,
            //         issueddate:true,
            //         expireddate:true
            //     },
            //     skip:skip,
            //     take:limit
            // })
            const data = await prisma.auth_users_departemen_team.findMany({
                include: {
                    users: true,
                    departemen: true,
                    team: true,
                    license: true,
                },
                skip: skip,
                take: limit
            })
            const dataFormatted = data.map(item => ({
                iduser: item.users.id,
                name: item.users.name,
                departemen: item.departemen.name,
                team: item.team.name,
                license: item.license.name,
                category: item.category,
                level: item.level,
                status: item.status,
                issueddate: item.issueddate.toISOString().split('T')[0],
                expireddate: item.expireddate.toISOString().split('T')[0],
            }))
            const totalData = data.length
            const totalPage = Math.ceil(totalData / limit)
            if (data) {
                return {
                    message: "success",
                    data: {
                        totalPage: totalPage,
                        totalData: dataFormatted
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export default new _filter()