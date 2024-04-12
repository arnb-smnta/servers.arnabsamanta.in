import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localfilepath) => {
  try {
    if (!localfilepath) return null;
    //upload the file on cloudinary

    const response = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto",
    });

    //filehas been uploaded succesfully
    console.log("file is uploaded on cloudinary succesfull", response);
    fs.unlinkSync(localfilepath); //removing the local file path as the file is uploaded succesfully
    return response.url;
  } catch (error) {
    fs.unlinkSync(localfilepath);
    //remove the local file path as the file upload has failed

    return null;
  }
};
const deleteOnCloudinary = async (cloudinaryUrl, mediatype = "image") => {
  try {
    if (!cloudinaryUrl) return null;
    //to delete video type media we have to explicitly mention it on controller
    //Delete file on cloudinary

    const returnobject = await cloudinary.uploader.destroy(cloudinaryUrl, {
      resource_type: `${mediatype}`,
    });
  } catch (err) {
    console.log("Something went wrong while deleting the file on cloudinary");
  }
};
export { uploadOnCloudinary, deleteOnCloudinary };
