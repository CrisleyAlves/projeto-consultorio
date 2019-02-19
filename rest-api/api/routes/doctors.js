const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctor");

router.get("/", doctorController.getAll);
router.get("/:doctorId", doctorController.getById);
router.post('/', doctorController.insert);
router.patch('/', doctorController.patch);
router.delete("/:doctorId", doctorController.delete);

router.get("/filter/crm/:crm", doctorController.getByCrm);

module.exports = router;