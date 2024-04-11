require("dotenv").config();

const Reservation = require("../models/reservation.model");

exports.create = async (req, res) => {
  if (
    !req.body.restaurant ||
    !req.body.customer ||
    !req.body.reservedDate ||
    !req.body.slotInterval ||
    !req.body.tableNumber
  ) {
    return res
      .status(400)
      .json({ error: "Please make sure all the fields are completed!" });
  }

  try {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const date = `${year}-${month}-${day}`;

    const reservation = new Reservation({
      date: date,
      restaurant: req.body.restaurant,
      customer: req.body.customer,
      reservedDate: req.body.reservedDate,
      slotInterval: req.body.slotInterval,
      paymentInfo: req.body.paymentInfo,
      tableNumber: req.body.tableNumber,
      status: "Reserved",
    });

    const saveReservation = await reservation.save();

    return res.status(201).send({ savedReservation: saveReservation });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json({ reservations });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.json({ reservation });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReservation = await Reservation.findByIdAndDelete(id);

    if (!deletedReservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  if (
    !req.body.restaurant ||
    !req.body.customer ||
    !req.body.reservedDate ||
    !req.body.slotInterval ||
    !req.body.tableNumber
  ) {
    return res
      .status(400)
      .json({ error: "Please make sure all the fields are completed!" });
  }

  const { id } = req.params;

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedReservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.json({ updatedReservation: updatedReservation });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePayment = async (req, res) => {
  const { paymentType, paymentAmount, cardNumber, expiryDate } = req.body;
  const id = req.params.id;

  if (paymentType == "Cash" && !paymentAmount) {
    return res.status(400).json({
      error: "Please make sure all the 'Cash' fields are completed!",
    });
  }

  if (
    (paymentType == "Credit Card" || paymentType == "Debit Card") &&
    (!paymentAmount || !cardNumber || !expiryDate)
  ) {
    return res.status(400).json({
      error: "Please make sure all the 'Card' fields are completed!",
    });
  }

  const currentDate = new Date();
  const date = currentDate.toISOString().split("T")[0];
  const time = currentDate.toTimeString().split(" ")[0];

  const paymentInfo = {
    paymentType,
    paymentAmount,
    cardNumber,
    expiryDate,
    paymentDate: date,
    paymentTime: time,
  };

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      { $set: { paymentInfo } },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.json({ updatedReservation: updatedReservation });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPaymentByReservationId = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      error: "Error retrieving payment data!",
    });
  }

  try {
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    const { paymentInfo } = reservation;

    if (!paymentInfo || paymentInfo.length === 0) {
      return res.status(404).json({ error: "Payment information not found" });
    }

    res.json({ paymentInfo: paymentInfo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getReservationsByCustomerId = async (req, res) => {
  const customerId = req.params.id;

  if (!customerId) {
    return res.status(400).json({
      error: "Customer ID is required!",
    });
  }

  try {
    const reservations = await Reservation.find({ customer: customerId });

    if (!reservations || reservations.length === 0) {
      return res
        .status(404)
        .json({ error: "Reservations not found for this customer" });
    }

    res.json({ reservations });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getReservationsByRestaurantId = async (req, res) => {
  const restaurantId = req.params.id;

  if (!restaurantId) {
    return res.status(400).json({
      error: "Restaurant ID is required!",
    });
  }

  try {
    const reservations = await Reservation.find({ restaurant: restaurantId });

    if (!reservations || reservations.length === 0) {
      return res
        .status(404)
        .json({ error: "Reservations not found for this Restaurant" });
    }

    res.json({ reservations });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
