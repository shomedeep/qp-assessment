const models = require("../../models");
const Sequelize = require("sequelize");
const Validator = require("fastest-validator");

// Retrieve all available grocery items for booking
const getAvailableItems = (req, res) => {
  models.GroceryItem.findAll({
    where: {
      inventory: {
        [Sequelize.Op.gt]: 0,
      },
    },
  })
    .then((availableGroceryItems) => {
      const data = [];
      for (const availableItem of availableGroceryItems) {
        data.push({
          id: availableItem.id,
          name: availableItem.name,
          price: availableItem.price,
          inventory: availableItem.inventory,
        });
      }
      res.status(200).json({
        message: "Available items fetched successfully",
        count: data.length,
        items: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Internal Server Error",
        error: err,
      });
    });
};

// Create a new order by booking multiple grocery items
const bookItems = async (req, res) => {
  try {
    const { itemIds, quantities } = req.body;

    // Validate input
    const scehma = {
      itemIds: { type: "array", optional: false },
      quantities: { type: "array", optional: false },
    };

    const objClass = new Validator();
    const validationResponse = objClass.validate(
      { itemIds, quantities },
      scehma
    );
    if (validationResponse !== true) {
      res
        .status(400)
        .json({ message: "Invalid input", error: validationResponse });
    }
    if (!itemIds || !quantities || itemIds.length !== quantities.length) {
      return res.status(400).json({ error: "Invalid input" });
    }

    // Check if all items are available in sufficient quantity
    const items = await models.GroceryItem.findAll({
      where: { id: { [Sequelize.Op.in]: itemIds } },
    });

    if (items.length !== itemIds.length)
      return res.status(400).json({
        message: "Not enough inventory for some items",
      });
    else if (items.length) {
      for (let item in items) {
        const availableQuantity = items[item].inventory - quantities[item];
        if (availableQuantity < 0)
          return res.status(400).json({
            message: "Not enough inventory for some items",
          });
      }
    }

    // Create order items
    const order = await models.sequelize.transaction(async (t) => {
      const createdOrderItems = [];

      for (let i = 0; i < itemIds.length; i++) {
        const item = await models.GroceryItem.findByPk(itemIds[i]);

        const OrderItem = await models.OrderItem.create(
          {
            name: item.name,
            itemId: itemIds[i],
            quantity: quantities[i],
          },
          { transaction: t }
        );

        // Update inventory
        item.inventory -= quantities[i];
        await item.save({ transaction: t });

        createdOrderItems.push(OrderItem);
      }
      let orderDetails = createdOrderItems.map(
        ({ name, itemId, quantity }) => ({ name, itemId, quantity })
      );
      return orderDetails;
    });

    res
      .status(200)
      .json({ message: "Order created successfully", order: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

module.exports = {
  getAvailableItems,
  bookItems,
};
