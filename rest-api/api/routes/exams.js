const express = require("express");
const router = express.Router();
const examController = require("../controllers/exam");
const checkAuth = require("./../jwt/check-auth");

router.get("/", examController.getAll);
router.get("/:examId", examController.getById);
router.delete("/:examId", examController.delete);
router.post('/', examController.insert);
router.patch("/", examController.patch);

module.exports = router;