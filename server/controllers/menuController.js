const Menu = require('../models/menu');
require('dotenv').config()


exports.create = async (req, res) => {
    try {
        const { category, name, image, description, price } = req.body;
        const menu = await Menu.create({ category, name, image, description, price });
        res.status(201).json(menu);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Menu.findOne({ _id: id })
        .then(data => {
            if (!data) {
                res.status(404).json({ message: `Not found menu item with id ${id}` });
            } else {
                res.status(200).json(data);
            }
        })
        .catch(err => {
            console.error("Error retrieving menu item:", err);
            res.status(500).json({ message: `Error retrieving menu item with id=${id}` });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Menu.findByIdAndUpdate(id, req.body, { new: true, useFindAndModify: false })
        .then(updatedMenu => {
            if (!updatedMenu) {
                return res.status(404).json({
                    message: `Cannot update menu item with id=${id}. Menu item not found.`
                });
            }
            res.status(200).json({
                message: "Menu item was updated successfully.",
                menu: updatedMenu
            });
        })
        .catch(err => {
            console.error("Error updating menu item:", err);
            res.status(500).json({
                message: `Error updating menu item with id=${id}.`
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Menu.findOneAndDelete({ _id: id })
        .then(data => {
            if (!data) {
                res.status(404).json({
                    message: `Cannot delete menu item with id=${id}. Menu item not found.`
                });
            } else {
                res.status(200).json({
                    message: "Menu item was deleted successfully!"
                });
            }
        })
        .catch(err => {
            console.error("Error deleting menu item:", err);
            res.status(500).json({
                message: `Error deleting menu item with id=${id}.`
            });
        });
};
