const { body, validationResult } = require("express-validator");

const validateCategory = [
  body("category_name").notEmpty().withMessage("Category Name Cannot Be Empty"),
];

const validateItem = [
  body("item_name").notEmpty().withMessage("Item Name Cannot Be Empty"),
];

const categories = [
  {
    id: 1,
    name: "Fruits",
    items: [
      { id: 1, name: "Pineapple" },
      { id: 2, name: "Apple" },
    ],
  },
  {
    id: 2,
    name: "Vegetables",
    items: [
      { id: 1, name: "Kales" },
      { id: 2, name: "Spinach" },
    ],
  },
  {
    id: 3,
    name: "Cereals",
    items: [
      { id: 1, name: "Beans" },
      { id: 2, name: "Maize" },
    ],
  },
];

exports.indexCategoriesGet = (req, res) => {
  res.render("categoryIndex", {
    title: "Categories",
    heading: "Categories",
    categories: categories,
  });
};

exports.specificCategoriesGet = (req, res) => {
  const { category, index } = req.params;

  res.render("categoryItems", {
    categories: categories,
    title: category,
    index: index,
  });
};

exports.addNewCategoryGet = (req, res) => {
  res.render("addNewCategory", { title: "Add New Category" });
};

exports.addNewCategoryPost = [
  validateCategory,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("addNewCategory", {
        title: "Add New Category",
        errors: errors.array(),
      });
    }

    categories.push({
      id: categories.length,
      name: req.body.category_name,
      items: [],
    });
    res.redirect("/");
  },
];

exports.updateCategoryGet = (req, res) => {
  const { category, index } = req.params;
  res.render("updateCategory", {
    title: "Update Category",
    category: category,
    index: index,
  });
};

exports.updateCategoryPost = [
  validateCategory,
  (req, res) => {
    const { category, index } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateCategory", {
        title: "Update Category",
        category: category,
        index: index,
        errors: errors.array(),
      });
    }

    categories[index].name = req.body.category_name;
    res.redirect("/");
  },
];

exports.deleteCategoryPost = (req, res) => {
  const { index, category } = req.params;
  categories.splice(index, 1);
  res.redirect("/");
};

exports.specificItemGet = (req, res) => {
  const { index, item, number } = req.params;

  res.render("itemView", { itemName: categories[index]["items"][number].name });
};

exports.updateItemGet = (req, res) => {
  const { index, item, number } = req.params;
  res.render("itemUpdate", {
    itemName: categories[index]["items"][number].name,
    index: index,
    item: item,
    number: number,
  });
};

exports.updateItemPost = [
  validateItem,
  (req, res) => {
    const { index, item, number } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("itemUpdate", {
        itemName: categories[index]["items"][number].name,
        index: index,
        item: item,
        number: number,
        errors: errors.array(),
      });
    }

    categories[index]["items"][number].name = req.body.item_name;
    res.redirect(`/${categories[index].name}/${index}`);
  },
];

exports.deleteItemPost = (req, res) => {
  const { index, item, number } = req.params;

  categories[index]["items"].splice(number, 1);
  res.redirect(`/${categories[index].name}/${index}`);
};

exports.addItemGet = (req, res) => {
  const { index } = req.params;
  res.render("itemAdd", { title: "Add Item", index: index });
};

exports.addItemPost = [
  validateItem,
  (req, res) => {
    const { index } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("itemAdd", {
          title: "Add Item",
          index: index,
          errors: errors.array(),
        });
    }

    categories[index]["items"].push({
      id: categories[index]["items"].length,
      name: req.body.item_name,
    });

    res.redirect(`/${categories[index].name}/${index}`);
  },
];
