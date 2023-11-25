import { Router } from "express";
import {createUser, addFavoriteBook,getFavoriteList,deleteFromFavoriteList,logout} from "../controllers/user.controller";
const userRouter = Router();
userRouter.post("/register", createUser);

userRouter.post("/addFavoriteBook", addFavoriteBook);
userRouter.get('/FavoriteList', getFavoriteList)
userRouter.delete('/FavoriteList/:bookID', deleteFromFavoriteList)
userRouter.delete("/logout",logout)
export default userRouter