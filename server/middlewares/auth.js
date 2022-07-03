import Users from "../models/user.js";

import jwt from "jsonwebtoken";

export const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, "kosa", async (err, decodedToken) => {
            if (err) {
                res.json({ status: false });
                next();
            } else {
                const user = await Users.findById(decodedToken.id);
                if (user) res.json({ status: true, user: user.email });
                else {
                    res.json({ status: false });
                    next();
                }
            }
        })
    } else {
        res.json({ status: false });
        next();
    }
}

export const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (token) {
            jwt.verify(token, "kosa", async (err, decodedToken) => {
                if (err) {
                    res.sendStatus(403)
                } else {
                    const user = await Users.findById(decodedToken.id);
                    if (user) next();
                    else {
                        res.sendStatus(403)
                    }
                }
            })
        } else {
            res.sendStatus(403)
        }

    } catch (e) {
        console.log(e.message);
    }

}