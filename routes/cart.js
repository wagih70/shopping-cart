const Cart = require("../models/Cart");
const Item = require("../models/Item");
const router = require("express").Router();

//CREATE
router.post("/", async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const item = await Item.findById(itemId);
    if(item && item.stock && item.stock >= quantity) {
      const newCart = new Cart({items: [req.body]});
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
    } else {
      res.status(404).json({ error: "Item is not available or out of stock"})
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//ADD ITEM
router.patch("/add/:id", async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const item = await Item.findById(itemId);
    if(item && item.stock && item.stock >= quantity) {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $push: { items: req.body},
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } else {
      res.status(404).json({ error: "Item is not available or out of stock"})
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//REMOVE ITEM
router.patch("/remove/:id/:itemId", async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { items: {itemId: req.params.itemId } }
      },
      { new: true }
    )
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET CART
router.get("/find/:id", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
