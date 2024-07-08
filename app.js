const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const uri =
  "mongodb+srv://sabiqhashilkp786:5Y4iwcqbTartFVAl@cluster0.xxi3nec.mongodb.net/w=majority";

// Connect to MongoDB using Mongoose
mongoose.connect(uri);

const itemsSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your todolist!",
});

const item2 = new Item({
  name: "Hit the + button to add a new item.",
});

const item3 = new Item({
  name: "<-- Hit this to delete an item.",
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema],
};

const List = mongoose.model("List", listSchema);

// Insert default items if the collection is empty
async function insertDefaultItems() {
  try {
    const count = await Item.countDocuments();
    if (count === 0) {
      await Item.insertMany(defaultItems);
      console.log("Default items inserted.");
    }
  } catch (err) {
    console.error("Error inserting default items:", err);
  }
}

// Route for the home page
app.get("/", async (req, res) => {
  try {
    await insertDefaultItems(); // Ensure default items are always available
    const foundItems = await Item.find({});
    res.render("list", {
      listTitle: "Today",
      newListItems: foundItems,
      list: "Today",
    }); // Pass list variable
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).send("An error occurred while fetching items.");
  }
});

// Route for custom lists
app.get("/:customListName", async (req, res) => {
  const customListName = _.capitalize(req.params.customListName);

  try {
    let foundList = await List.findOne({ name: customListName });

    if (!foundList) {
      // Create a new list if not found
      foundList = new List({
        name: customListName,
        items: defaultItems,
      });
      await foundList.save();
    }

    res.render("list", {
      listTitle: foundList.name,
      newListItems: foundList.items,
      list: foundList.name, // Pass list variable
    });
  } catch (err) {
    console.error("Error fetching custom list:", err);
    res.status(500).send("An error occurred while fetching the list.");
  }
});

// Route to handle new item addition
app.post("/", async (req, res) => {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName,
  });

  try {
    if (listName === "Today") {
      await item.save();
      res.redirect("/");
    } else {
      let foundList = await List.findOne({ name: listName });

      if (!foundList) {
        foundList = new List({
          name: listName,
          items: defaultItems,
        });
        await foundList.save();
      }

      foundList.items.push(item);
      await foundList.save();
      res.redirect("/" + listName);
    }
  } catch (err) {
    console.error("Error saving item:", err);
    res.status(500).send("An error occurred while saving the item.");
  }
});

// Route to handle item deletion
app.post("/delete", async (req, res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  try {
    if (listName === "Today") {
      await Item.findByIdAndDelete(checkedItemId);
      console.log("Successfully deleted item.");
      res.redirect("/");
    } else {
      const updatedList = await List.findOneAndUpdate(
        { name: listName },
        { $pull: { items: { _id: checkedItemId } } },
        { new: true } // To return updated document
      );
      res.redirect("/" + listName);
    }
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).send("An error occurred while deleting the item.");
  }
});

// Route for Work List
app.get("/work", (req, res) => {
  res.render("list", {
    listTitle: "Work List",
    newListItems: [],
    list: "Work List",
  }); // Pass list variable
});

// Route for About page
app.get("/about", (req, res) => {
  res.render("about");
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
