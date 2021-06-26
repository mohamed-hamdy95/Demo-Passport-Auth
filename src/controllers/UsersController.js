const UserModel = require("../models/Users");
const { format } = require("../resources/UserResource");

exports.getUsers = async (req, res) => {
  const {
    user: { _id: id },
  } = req;
  const users = await UserModel.find({ _id: { $ne: id } });
  res.status(200).send({ users: users.map((user) => format(user)) });
};

exports.createUser = async (req, res) => {
  if (!req.file) {
    throw Error("FILE_MISSING");
  } else {
    const {
      body: { email, password, name, role, status, fileFullPath: image },
    } = req;
    await UserModel.create({ email, password, name, status, role, image });
    res.send({ status: "success" });
  }
};

exports.deleteUser = async (req, res) => {
  const {
    params: { id },
  } = req;
  await UserModel.findByIdAndDelete(id);
  res.send({ status: "success" });
};
