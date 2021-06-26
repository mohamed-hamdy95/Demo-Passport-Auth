const express = require("express");
const router = express.Router();
const { getUsers, createUser, deleteUser } = require("../controllers/UsersController");
const upload = require("../utils/files/upload");

router.get("/profile", (req, res, next) => {
  res.status(200).send({
    user: req.user,
    token: req.query.secret_token,
  });
});

router.get("/users", getUsers);

router.post("/users", upload.single("file"), createUser);

router.delete("/users/:id", deleteUser);

module.exports = router;
