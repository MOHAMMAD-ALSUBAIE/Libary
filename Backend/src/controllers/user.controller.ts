import { PrismaClient } from "@prisma/client";
const userPrisma = new PrismaClient().user;
const books = new PrismaClient().books;
const favoriteBooks = new PrismaClient().favoriteBooks;
const session = new PrismaClient().session;

import bcrypt from "bcrypt";

export const createUser = async (req: any, res: any) => {
    try {
        console.log(req.body);
        const { firstName,lastName, email, password,passwordAgin } = req.body;
        if (!firstName || !lastName|| !email || !password || !passwordAgin) {
            return res
                .status(400)
                .json({ error: "Name and email are required" });
        }
        if(password!=passwordAgin){
            return res
            .status(400)
            .json({ error: "password not match" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await userPrisma.create({
            data: {
                name: firstName+" "+lastName,
                email: email,
                password: hashedPassword,
            },
        });


        res.status(201).json({
            message: "User has be created, move him to login page.",
            status: 201,
        });
    } catch (e) {

        res.status(422).json({
            message: "Error",
            status: 422,
        });
    }
};

export const addFavoriteBook = async (req: any, res: any) => {
//book id
try {
    const bookID=+req.body.bookID

if(!bookID){
    return res
    .status(400)
    .json({ error: "bookID and UserID are required" });
}
const response=await favoriteBooks.create({
    data: {
        booksID: bookID,
        userId: req.session.userID,
    },
})
console.log(response)
res.status(201).json({
    message: "Book has be added to favorite list.",
    status: 201,
})
} catch (error) {
    res.status(400).json({
        status:400,
        message:"It is in favorite list already",
    })
}

}

export const getFavoriteList = async (req: any, res: any) => {
    try {
        const result = await favoriteBooks.findMany({
            where: {
                userId: req.session.userID,
               
            },
         select: {
                    id: true,
                    userId: true,
                    books:true
            },
            
        });
        res.status(200).json({ data: result });
    } catch (e) {
        console.log(e);
    }
}

export  const deleteFromFavoriteList = async (req: any, res: any) => {
   
    try {
        console.log(req.params.bookID)
        if(!req.params.bookID){
         throw new Error("bookID is required")
        }
        const result = await favoriteBooks.delete({
            where: {
                id: req.params.bookID
            },
        });
        res.status(202).json({ status:202,massage:"Delete Accepted " ,data:result });
    } catch (e) {
        res.status(400).json({ massage: "filed" });
    }
}

export const logout = async (req: any, res: any) => {

    try {
        await session.delete({
            where: {
                id: req.session.id,
            },
        })
        res.status(200).json({ massage: "logout Accepted " });
    } catch (e) {
        res.status(400).json({ massage: "filed" });
    }
}
// const a = async () => {
//     const a = await favoriteBooks.deleteMany();
//     console.log(a);
// };
// a();
