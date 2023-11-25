import { Router } from "express";

import { login } from "../controllers/authentication.controller";
const RouterInstance = Router();

//authenticate user
RouterInstance.post("/login", login);


//authorize user
RouterInstance.get("/authorize", (req, res, next) => {
    if (req.session.isAuth) {
        console.log(req.session);
        res.json({ massage: "you are already logged in", isAuth: true ,name:req.session["name"]});
        return;
    }

    res.json({ massage: "you are not logged in 222", isAuth: false });
});

export default RouterInstance;
