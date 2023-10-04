const express = require("express");
const router = express.Router();
const {
  getJobs,
  getJob,
  setJob,
  updateJob,
  delateJob,
} = require("../controllers/jobController");

const { protectAdmin } = require("../middleware/authMiddleware");

router
  .route("/")
  .post(protectAdmin, setJob)
  .get(getJobs);

router
  .route("/:id")
  .put(protectAdmin, updateJob)
  .delete(protectAdmin, delateJob)
  .get(protectAdmin, getJob);

module.exports = router;
