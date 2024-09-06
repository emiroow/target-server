import fs from "fs";
import multer from "multer";
import path from "path";
import { fileModel } from "../models/file";
import { request } from "../types/request";

const multerStorage = multer.diskStorage({
  destination: "public/images",
  filename: function (req: request, file, cb) {
    let userId = req.user._id;
    let user = req.user.user;
    cb(null, `${user}-${userId}-${file.originalname}`);
  },
});

export const uploadMiddleWare = multer({
  storage: multerStorage,
  fileFilter: async (req: request, file, cb) => {
    const userId = req.user._id;
    const formDataName = req.body.name;
    let user = req.user.user;

    const checkFileIsExistInDB = await fileModel.findOne({
      $or: [{ name: formDataName }, { url: file.originalname }],
    });

    const filePath = path.join(
      __dirname,
      "../../public/images",
      `${user}-${userId}-${file.originalname}`
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
          url: `${user}-${userId}-${file.originalname}`,
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