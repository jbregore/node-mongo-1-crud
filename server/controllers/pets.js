import mongoose from "mongoose";
import Pets from "../models/pets.js";
import multer from "multer";
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import Users from "../models/user.js";

const DIR = "./";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const reqPath = "http://localhost:5000/pets/";


export const getPets = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 2;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await Pets.countDocuments({});

        const pets = await Pets.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: pets, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT), totalPets: total });
    } catch (e) {
        res.status(404).json({ message: e.message });
    }

}

export const createPet = async (req, res) => {
    try {
        const body = req.body;

        const newPets = new Pets(
            {
                ...body,
                createdAt: new Date().toISOString()
            }
        );

        await newPets.save();
        res.status(201).json(newPets);

    } catch (e) {
        res.status(404).json({ message: e.message });
    }
}

export const deletePet = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send("No Post with that id");
        }

        const petInfo = await Pets.findById(id);
        const petPhoto = petInfo.selectedFile.split("/");
        
        var imgUrl = `storage/images/${petPhoto[4]}`;

        if(petPhoto && petInfo.selectedFile !== ""){
            fs.unlinkSync(DIR + imgUrl);
        }

        await Pets.findByIdAndRemove(id);

        res.status(200).json({ message: 'Pet deleted successfully', data: id });
    } catch (e) {
        res.status(404).json({ message: e.message });
    }
}

export const updatePet = async (req, res) => {

    try {

        const { id: _id } = req.params;
        const body = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send("No Post with that id");
        }

        const petInfo = await Pets.findById(_id);

        if(body.selectedFile !== petInfo.selectedFile && petInfo.selectedFile !== ""){
            const petPhoto = petInfo.selectedFile.split("/");
            var imgUrl = `storage/images/${petPhoto[4]}`;
            // console.log(petPhoto)
            if(petPhoto){
                fs.unlinkSync(DIR + imgUrl);
            }
        }

        const updatedPost = await Pets.findByIdAndUpdate(_id, { ...body, _id }, { new: true });
        
        res.status(200).json(updatedPost);

        // const updatedPost = await Pets.findByIdAndUpdate(_id, { ...body, _id }, { new: true });

    } catch (e) {
        res.status(404).json({ message: e.message });
    }
}

export const searchPet = async (req, res) => {
    const { name } = req.query;
    console.log(name)

    try {

        const title = new RegExp(name, 'i');

        const posts = await Pets.find({"name":title});

        //get image source
        // var getImageName = posts.avatar.match(/\/([^\/?#]+)[^\/]*$/);
        // var localUrl = "http://localhost:5000/pets/";
        // posts.avatar = `${localUrl}${getImageName[1]}`;

        // console.log(posts);

        res.json({ data: posts });

    } catch (e) {
        res.status(404).json({ message: e.message });
    }
}

export const imgUpload = async (req, res) => {
    try {

        // image upload 
        var imgUrl = "";
        if(req.file) var imgUrl = `storage/images/${req.file.filename}`;
        
        let getImageName = imgUrl.match(/\/([^\/?#]+)[^\/]*$/);
        res.status(201).json({
            photoUrl : `${reqPath}${getImageName[1]}`
        });
    } catch (e) {
        res.status(404).json({ message: e.message });
    }
}

// export const uploadImagePet = async (req, res) => {
//     try{
//         upload(req, res, (err) => {
//             if(!err){
//                 const newImage = {
//                     data: req.file.filename,
//                     contentType: 'image/png'
//                 }
                
//                 res.status(200).json({data: newImage, msg: "Image upload success"})
//             }else{
//                 console.log(err);
//                 res.status(400);
//             }
//         })
//     }catch(e){
//         console.log(e);
//         res.status(400);
//     }
// }



