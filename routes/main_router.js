const express = require("express");
const router = express.Router();
const passport = require("passport");
const mainController = require("../controllers/main_controller");

console.log("router loaded");


router.get("/", mainController.main);
router.post("/create-Order", passport.checkAuthentication, mainController.create);
router.get("/delete-order/", passport.checkAuthentication, mainController.delete);


router.use("/user",require("./user_router"));

module.exports = router;