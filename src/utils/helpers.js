import fs from "fs";

/**
 *
 * @param {string} fileName
 * @description returns the file's local path in the file system to assist future removal
 */

const getStaticFilePath = (req, fileName) => {
  return `${req.protocol}://${req.get("host")}/images/${fileName}`;
};
const getLocalPath = (fileName) => {
  return `public/images/${fileName}`;
};

/**
 *
 * @param {string} localPath
 * @description Removed the local file from the local file system based on the file path
 */

const removeLocalFile = (localPath) => {
  fs.unlink(localPath, (err) => {
    if (err) {
      console.log("Error while removing local files :", err);
    }
  });
};

const removeUnusedMulterImageFilesOnError = (req) => {
  try {
    const multerFile = req.file;
    const multerFiles = req.files;
    if (multerFile) {
      removeLocalFile(multerFile.path);
    }
    if (multerFiles) {
      const filesArray = Object.values(multerFiles);

      filesArray.map((fileObject) => removeLocalFile(fileObject.path));
    }
  } catch (err) {
    //fail silently
    console.log("Error while removing image files");
  }
};

export {
  getStaticFilePath,
  getLocalPath,
  removeLocalFile,
  removeUnusedMulterImageFilesOnError,
};
