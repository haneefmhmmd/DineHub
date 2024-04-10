const router = require("express").Router();
const controller = require("../controllers/restaurant.controller");

router.post("/restaurant", controller.create);
router.post("/restaurant/login", controller.login);
router.put("/restaurant/:id", controller.update);
router.delete("/restaurant/:id", controller.delete);
router.get("/restaurant", controller.getAll);
router.get("/restaurant/:id", controller.getById);

module.exports = router;
