import express from "express";

import {
    getPets,
    createPet,
    deletePet,
    updatePet,
    searchPet,
    imgUpload
    // uploadImagePet
} from "../controllers/pets.js";

import { isAuth } from "../middlewares/auth.js";
import fileUpload from "../utils/fileUpload.js";

const router = express.Router();

router.get("/", isAuth, getPets);
router.get("/search", isAuth, searchPet);
router.post("/", isAuth, createPet);
router.put("/:id", isAuth, updatePet);
router.delete("/:id", isAuth, deletePet);

// router.put("/:id", fileUpload("./storage/images"), updatePet);
router.post("/upload", fileUpload("./storage/images"), imgUpload);


// router.post("/upload", uploadImagePet);

export default router;