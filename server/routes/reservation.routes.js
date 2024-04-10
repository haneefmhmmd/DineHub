const router = require("express").Router();
const controller = require("../controllers/reservation.controller");

router.post("/reservation", controller.create);
router.get("/reservation", controller.getAll);
router.get("/reservation/:id", controller.getById);
router.put("/reservation/:id", controller.update);
router.delete("/reservation", controller.delete);

router.put("/reservation/payment/:id", controller.updatePayment);
router.get("/reservation/payment/:id", controller.getPaymentByReservationId);

module.exports = router;
