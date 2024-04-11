require("dotenv").config();

const Restaurant = require("../models/restaurant.model");
const { createToken } = require("../middlewares/utils");
const bcrypt = require("bcrypt");

exports.create = async (req, res) => {
  if (!req.body.name || !req.body.businessEmail || !req.body.password) {
    return res
      .status(400)
      .json({ error: "Please make sure all the fields are completed!" });
  }

  try {
    const checkRestaurant = await Restaurant.findOne({
      businessEmail: req.body.businessEmail,
    });

    if (checkRestaurant) {
      return res
        .status(500)
        .send({ message: err.message || "This restaurant alerady exists!" });
    }
    const restaurant = new Restaurant(req.body);

    const savedRestaurant = await restaurant.save();

    return res.status(201).send({ savedRestaurant });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  if (!req.body.businessEmail || !req.body.password) {
    res
      .status(400)
      .json({ error: "Please make sure all the fields are completed!" });
  }

  try {
    const businessEmail = req.body.businessEmail;
    const password = req.body.password;

    const checkRestaurant = await Restaurant.findOne({ businessEmail });

    if (!checkRestaurant) {
      return res.status(404).send({ message: "Restaurant not found!" });
    }

    const restaurant = await Restaurant.login(businessEmail, password);

    if (!restaurant) {
      return res.status(404).send({ message: "Error logging in!" });
    }

    // Create and save token in cookie after successful login
    const token = createToken(restaurant._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    const { password: _, ...rest } = restaurant.toObject();

    res.status(200).json({
      restaurant: rest,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.businessEmail ||
    !req.body.password ||
    !req.body.address ||
    !req.body.contactNumber ||
    !req.body.cuisine ||
    !req.body.about
  ) {
    return res
      .status(400)
      .json({ error: "Please make sure all the fields are completed!" });
  }

  const { id } = req.params;

  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt();
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedRestaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.json({ restaurant: updatedRestaurant });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);

    if (!deletedRestaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json({ restaurants });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.json({ restaurant });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
