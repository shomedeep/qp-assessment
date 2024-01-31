const models = require("../../models");
const Validator = require("fastest-validator");

// Add a new grocery item
function saveItem(req, res, next) {
  const { name, price, inventory } = req.body;

  const scehma = {
    name: { type: "string", optional: false, max: "100" },
    price: { type: "number", optional: false },
    inventory: { type: "number", optional: false },
  };

  const objClass = new Validator();
  const validationResponse = objClass.validate(
    { name, price, inventory },
    scehma
  );
  if (validationResponse !== true) {
    res
      .status(400)
      .json({ message: "Validation failed", error: validationResponse });
  }
  models.GroceryItem.create({ name, price, inventory })
    .then((groceryItem) => {
      res.status(201).json({
        message: "Item saved successfully",
        item: groceryItem,
      });
    })
    .catch((err) => {
      next(err);
    });
}

// Retrieve all grocery items
function getAllItems(req, res, next) {
  models.GroceryItem.findAll()
    .then((groceryItems) => {
      res.status(200).json({
        message: "Items fetched successfully",
        count: groceryItems.length,
        items: groceryItems,
      });
    })
    .catch((err) => {
      next(err);
    });
}

// Retrieve details of a specific grocery item by ID
function getItem(req, res, next) {
  const id = req.params.id;
  models.GroceryItem.findByPk(id)
    .then((groceryItems) => {
      if (groceryItems && Object.keys(groceryItems).length) {
        res.status(200).json({
          message: "Item fetched successfully",
          items: groceryItems,
        });
      } else {
        res.status(404).json({
          error: "Grocery item not found",
        });
      }
    })
    .catch((err) => {
      next(err);
    });
}

// Update details of an existing grocery item
function updateItem(req, res, next) {
  const id = req.params.id;
  const { name, price, inventory } = req.body;

  const scehma = {
    name: { type: "string", optional: false, max: "100" },
    price: { type: "number", optional: false },
    inventory: { type: "number", optional: false },
  };

  const objClass = new Validator();
  const validationResponse = objClass.validate(
    { name, price, inventory },
    scehma
  );
  if (validationResponse !== true) {
    res
      .status(400)
      .json({ message: "Validation failed", error: validationResponse });
  }

  models.GroceryItem.findByPk(id)
    .then((item) => {
      if (item && Object.keys(item).length) {
        models.GroceryItem.update(
          { name, price, inventory },
          { where: { id: id } }
        )
          .then(() => {
            res.status(200).json({
              message: "Item updated successfully",
              items: { name, price, inventory },
            });
          })
          .catch((err) => {
            next(err);
          });
      } else {
        res.status(404).json({
          error: "Grocery item not found",
        });
      }
    })
    .catch((err) => {
      next(err);
    });
}

// Remove a grocery item
function deleteItem(req, res, next) {
  const id = req.params.id;
  models.GroceryItem.findByPk(id)
    .then((item) => {
      if (item && Object.keys(item).length) {
        models.GroceryItem.destroy({ where: { id: id } })
          .then(() => {
            res.status(200).json({
              message: "Item deleted successfully",
            });
          })
          .catch((err) => {
            next(err);
          });
      } else {
        res.status(404).json({
          error: "Grocery item not found",
        });
      }
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  saveItem,
  getAllItems,
  getItem,
  updateItem,
  deleteItem,
};
