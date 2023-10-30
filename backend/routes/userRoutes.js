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
  .post( protectSupperAdmin, registerUser)
  .get(protectSupperAdmin, getUsers);

router
  .route("/:id")
  .put( updateUser)
  .delete( delateUser)
  .get( getUser);

module.exports = router;
