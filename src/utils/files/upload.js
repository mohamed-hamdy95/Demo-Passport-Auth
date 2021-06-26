const multer = require("multer");
const filesPath = "./storage/users";

const storage = multer.diskStorage({
  //Specify the destination directory where the file needs to be saved
  destination: function (req, file, cb) {
    cb(null, filesPath);
  },
  //Specify the name of the file. The date is prefixed to avoid overwriting of files.
  filename: function (req, file, cb) {
    const fileUniqName = `${Date.now()}.${file.originalname.split(".").pop()}`;
    req.body.fileFullPath = `${filesPath}/${fileUniqName}`;
    cb(null, fileUniqName);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
