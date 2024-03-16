const express = require('express');
const orderRouter = express.Router();
const { Orders, Products } = require("../db");
const { authMiddleware } = require("../middleware");


orderRouter.get('/purchase-success',authMiddleware, async (req, res) => {
    const userId = req.userId;
    const products = req.query.products; 

    try {
        for (const product of products) {
            const { productId, quantity } = product;

            // Create a new order
            const order = new Orders({
                userId,
                productId,
                quantity
            });

            // Save the order to the database
            await order.save();

            // Decrease product quantity
            const existingProduct = await Products.findById(productId);
            if (existingProduct) {
                existingProduct.quantity -= quantity;
                await existingProduct.save();
            }
        }

        res.json({ message: 'Orders created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = orderRouter;