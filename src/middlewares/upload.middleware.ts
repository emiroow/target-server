import { fileModel } from "@models/file";
import { Request } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";

const multerStorage = multer.diskStorage({
  destination: "public/images",
  filename: function (req: Request, file, cb) {
    let userId = req.user._id;
    let user = req.user.user;
    cb(null, `${user}-${userId}-${file.originalname.split(" ").join("")}`);
  },
});

export const uploadMiddleWare = multer({
  storage: multerStorage,
  fileFilter: async (req: Request, file, cb) => {
    const userId = req.user._id;
    const formDataName = req.body.name;
    let user = req.user.user;
    const checkFileIsExistInDB = await fileModel.findOne({
      $or: [
        { name: formDataName },
        { url: file.originalname.split(" ").join("") },
      ],
    });

    const filePath = path.join(
      __dirname,
      "../../public/images",
      `${user}-${userId}-${file.originalname.split(" ").join("")}`
    );
    const checkFileIsExistInFolder = fs.existsSync(filePath);

    if (!checkFileIsExistInDB && !checkFileIsExistInFolder) {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
        fileModel.create({
          user: userId,
          name: formDataName,
          url: `${user}-${userId}-${file.originalname}`.split(" ").join(""),
        });
      } else {
        cb(null, false);
        return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
      }
    } else {
      cb(null, false);
      return cb(new Error("عکس مورد نظر با این نام تکراری میباشد"));
    }
  },
});
