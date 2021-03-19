const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main_controller");

console.log("router loaded");


router.get("/", mainController.main);
router.post("/create-Order", mainController.create);
router.get("/delete-order/", mainController.delete);


router.use("/user",require("./user_router"));

module.exports = router;