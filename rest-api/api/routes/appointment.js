const express = require("express");
const router = express.Router();
const checkAuth = require("../jwt/check-auth");
const appointmentController = require("../controllers/appointment");


router.get("/", appointmentController.getAll);
router.get("/:appointmentId", appointmentController.getById);
router.post("/", appointmentController.insert);
router.patch("/", appointmentController.patch);
router.delete("/:appointmentId", appointmentController.delete);

module.exports = router;