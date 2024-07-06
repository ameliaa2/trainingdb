import prisma from "../helpers/prisma.js"
class _filter {
    filterSearch = async (req, res) => {
        try {
            const currentPage = req.body.currentPage
            const payloadFilter = req.body.filters
            const filterCondition = {}
            if (payloadFilter.iduser) {
                filterCondition.users = {
                    id:Number(payloadFilter.iduser)
                };
            }
            if (payloadFilter.name) {
                filterCondition.users = {
                    name:{
                        contains: payloadFilter.name
                    }
                };
            }
            if (payloadFilter.iddepartemen) {
                filterCondition.departemen = {
                    id:Number(payloadFilter.iddepartemen)
                }
            }
            if (payloadFilter.idteam) {
                filterCondition.team = {
                    id:Number(payloadFilter.idteam)
                }
            }
            if (payloadFilter.idlicense) {
                filterCondition.license = {
                    id:Number(payloadFilter.idlicense)
                }
            }
            if (payloadFilter.issuedyear) {
                filterCondition.issuedyear = Number(payloadFilter.issuedyear)
            }
            if (payloadFilter.expiredyear) {
                filterCondition.expiredyear = Number(payloadFilter.expiredyear)
            }
            const limit = 3
            const skip = (currentPage - 1) * limit
            const data = await prisma.auth_users_departemen_team.findMany({
                where: filterCondition,
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
            const totalData = await prisma.auth_users_departemen_team.count({where:filterCondition})
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