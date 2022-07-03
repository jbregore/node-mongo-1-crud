import Users from "../models/user.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60; // 3 days

const createToken = (id) => {
    return jwt.sign({ id }, "kosa", {
        expiresIn: maxAge,
    })
}

export const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await Users.create({ email, password });
        const token = createToken(user._id);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        })
        res.status(201).json({ user: token, created: true })
    } catch (e) {
        const errors = handleErrors(e);
        res.json({ errors, created: false });
    }
}

const handleErrors = (err) => {
    let errors = { email: "", password: "" };

    if(err.message === "Incorrect Email"){
        errors.email = "That email is not registered";
    }

    if(err.message === "Incorrect password"){
        errors.email = "Password incorrect";
    }

    if(err.code === 11000){
        errors.email = "Email is already registered";
        return errors;
    }

    if(err.message.includes("Users validation failed")){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await Users.login( email, password );
        const token = createToken(user._id);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        })
        res.status(200).json({ user: token, created: true })
    } catch (e) {
        const errors = handleErrors(e);
        res.json({ errors, created: false });
    }
}   