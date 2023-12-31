import { Prisma, PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";
import { parse } from "path";

export const prisma = new PrismaClient();

//const prismaSession = new PrismaClient();

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findFirst({
            where: { email },
        });
        if (!user) {
            res.status(401).json({ message: "User not exist", isAuth: false });
            return;
        }

        if (!(await bcrypt.compare(password, user.password))) {
            res.status(401).json({
                message: "password is not correct",
                isAuth: false,
            });
            return;
        }
        req.session.isAuth = true;
        req.session.userID = user.id;
        req.session.role=user.role
        
        // await prisma.session.delete({
        //     where: {
        //         id: user.sessionId,
        //     },
        // });
        // await prisma.session.update({
        //     where: {
        //         id: req.session.id,
        //     },
        //     // data: {
        //         update: {
        //              user:   {
        //                 sessionId: session.id
        //             }
        //         }
        //     // }

        // });
        console.log(req.session.id);
        console.log( user.role );

        res.status(200).json({
            message: "session Has created",
            isAuth: true,
            role: user.role,
            userInformation: { name: user.name },
        });
    } catch (error) {
        res.status(400).json({ message: "Failed", isAuth: false });
    }
};
// const a = async () => {
//     // const a = await prisma.user.findMany();
//     const s = await prisma.session.findMany();

//     console.log(s);
// };
// a();
