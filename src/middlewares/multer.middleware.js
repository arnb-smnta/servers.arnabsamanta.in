import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //This storage needs public/image folder in the root directory
    //Else it will throw error saying cannot find path public/images

    cb(null, "./public/images");
  },
  //Store file in a .png/.jpeg/.jpg format instaed of binary

  filename: function (req, file, cb) {
    let fileExtension = "";
    if (file.originalname.split(".").length > 1) {
      fileExtension = file.originalname.substring(
        file.originalname.lastIndexOf(".")
      );
    }
  },
});

const filenameWithoutExtension = file.originalname
  .toLowerCase()
  .split(" ")
  .join("_")
  ?.split(".")[0];
cb(
  null,
  filenameWithoutExtension +
    Date.now() +
    Math.ceil(Math.random() * le5) +
    fileExtension
);

//middleware responsible to read form data and upload the File object to the metioned path

export const upload = multer({
  storage,
  limits: {
    fileSize: 1 * 1000 * 1000,
  },
});
