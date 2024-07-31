import prisma from "../helpers/prisma.js";

class _updatelicense {
    updateLicense = async (req, res) => {
        try {
            const payload = req.body;
            console.log(payload);

            // Cari entri di tabel auth_users_departemen_team berdasarkan iduser dan nameLicense
            const index = await prisma.auth_users_departemen_team.findFirst({
                where: {
                    users: {
                        id: payload.iduser
                    },
                    license: {
                        name: payload.nameLicense
                    }
                },
                include: {
                    license: true
                }
            });

            if (!index) {
                return res.status(404).json({
                    message: "License not found",
                    data: null
                });
            }

            let updateResult;

            // Perbarui nama lisensi jika ada perubahan
            if (payload.editName) {
                const validateName = await prisma.license.findFirst({
                    where: {
                        name: payload.editName
                    }
                });

                if (!validateName) {
                    const createLicense = await prisma.license.create({
                        data: {
                            name: payload.editName
                        }
                    });

                    if (createLicense) {
                        updateResult = await prisma.auth_users_departemen_team.update({
                            where: {
                                id: index.id
                            },
                            data: {
                                idlicense: createLicense.id,
                                pathlicense: payload.pathlicense
                            }
                        });
                    }
                } else {
                    updateResult = await prisma.auth_users_departemen_team.update({
                        where: {
                            id: index.id
                        },
                        data: {
                            idlicense: validateName.id,
                            pathlicense: payload.pathlicense
                        }
                    });
                }
            } else {
                // Perbarui pathlicense pada tabel auth_users_departemen_team
                updateResult = await prisma.auth_users_departemen_team.update({
                    where: {
                        id: index.id
                    },
                    data: {
                        pathlicense: payload.pathlicense
                    }
                });
            }
            console.log(updateResult)
            return {
                message: 'Update License Success',
                data: updateResult
            };
        } catch (error) {
            console.log(error.message);
            return {
                message: "Internal Server Error",
                data: error.message
            };
        }
    }
}

export default new _updatelicense();
