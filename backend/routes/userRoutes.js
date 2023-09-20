const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUsers,
  updateUser,
  delateUser,
  getUser,
} = require("../controllers/userController");

const {
  protectSupperAdmin,
} = require("../middleware/authMiddleware");

router
  .route("/")
  .post(protectSupperAdmin, registerUser)
  .get(protectSupperAdmin, getUsers);

router
  .route("/:id")
  .put(protectSupperAdmin, updateUser)
  .delete(protectSupperAdmin, delateUser)
  .get(protectSupperAdmin, getUser);

module.exports = router;
