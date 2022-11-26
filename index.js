const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const itemRoute = require("./routes/item");
const cartRoute = require("./routes/cart");
const fs = require("fs");
const Item = require("./models/Item");

dotenv.config();
const seedItems = JSON.parse(fs.readFileSync('./data/items.json', 'utf8'));;

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("DB Connection Successfull!");
    const itemsLength = await Item.count();
    if(itemsLength === 0) {
      await Item.insertMany(seedItems);
      console.log("Items Collection Seeded Successfull!");
    }
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/items", itemRoute);
app.use("/api/carts", cartRoute);

app.listen(process.env.PORT || 9000, () => {
  console.log("Server is running!");
});
