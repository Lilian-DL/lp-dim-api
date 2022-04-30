var express = require("express");
var router = express.Router();

// Controller
var cocktail_controller = require("../controllers/cocktail");

router.get("/", cocktail_controller.getAll);

router.get("/:id", cocktail_controller.getById);

router.post("/", cocktail_controller.create);

router.put("/:id", cocktail_controller.update);

router.delete("/:id", cocktail_controller.delete);

module.exports = router;