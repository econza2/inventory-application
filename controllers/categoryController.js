const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const validateCategory = [
  body("category_name").notEmpty().withMessage("Category Name Cannot Be Empty"),
];

const validateItem = [
  body("item_name").notEmpty().withMessage("Item Name Cannot Be Empty"),
];

async function indexCategoriesGet(req, res) {
  const categoriesDb = await db.getAllCategories();

  res.render("categoryIndex", {
    title: "Categories",
    heading: "Categories",
    categories: categoriesDb,
  });
}

async function specificCategoriesGet(req, res) {
  const itemCategoriesDb = await db.getCategoryItemPair();
  const { category, index } = req.params;

  res.render("categoryItems", {
    categoriesDb: itemCategoriesDb,
    title: category,
    index: index,
  });
}

function addNewCategoryGet(req, res) {
  res.render("addNewCategory", { title: "Add New Category" });
}

const addNewCategoryPost = [
  [validateCategory],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("addNewCategory", {
        title: "Add New Category",
        errors: errors.array(),
      });
    }
    await db.addNewCategory(req.body.category_name);
    res.redirect("/");
  },
];

function updateCategoryGet(req, res) {
  const { category, index } = req.params;
  res.render("updateCategory", {
    title: "Update Category",
    category: category,
    index: index,
  });
}

const updateCategoryPost = [
  validateCategory,
  async (req, res) => {
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

    await db.updateCategory(req.body.category_name, index);
    res.redirect("/");
  },
];

async function deleteCategoryPost(req, res) {
  const { index, category } = req.params;
  await db.deleteCategory(index);
  res.redirect("/");
}

async function specificItemGet(req, res) {
  const { index, item, number } = req.params;
  const itemCategoriesDb = await db.getCategoryItemPair();

  res.render("itemView", { itemName: itemCategoriesDb[number].item_name });
}

async function updateItemGet(req, res) {
  const { index, item, number, specificId } = req.params;
  const itemCategoriesDb = await db.getCategoryItemPair();

  res.render("itemUpdate", {
    itemName: itemCategoriesDb[number].item_name,
    index: index,
    item: item,
    number: number,
    specificId: specificId,
  });
}

const updateItemPost = [
  validateItem,
  async (req, res) => {
    const { index, item, number, specificId } = req.params;
    const itemCategoriesDb = await db.getCategoryItemPair();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("itemUpdate", {
        itemName: itemCategoriesDb[number].item_name,
        index: index,
        item: item,
        number: number,
        errors: errors.array(),
      });
    }

    await db.updateItem(req.body.item_name, specificId);
    res.redirect("/");
  },
];

async function deleteItemPost(req, res) {
  const { index, item, number, specificId } = req.params;
  const itemCategoriesDb = await db.getCategoryItemPair();

  await db.deleteItem(specificId);
  res.redirect("/");
}

function addItemGet(req, res) {
  const { index } = req.params;
  res.render("itemAdd", { title: "Add Item", index: index });
}

const addItemPost = [
  validateItem,
  async (req, res) => {
    const { index } = req.params;
    const itemCategoriesDb = await db.getCategoryItemPair();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("itemAdd", {
        title: "Add Item",
        index: index,
        errors: errors.array(),
      });
    }

    await db.addItem(req.body.item_name, index);
    res.redirect(`/`);
  },
];

module.exports = {
  indexCategoriesGet,
  specificCategoriesGet,
  addNewCategoryGet,
  addNewCategoryPost,
  updateCategoryGet,
  updateCategoryPost,
  deleteCategoryPost,
  specificItemGet,
  updateItemGet,
  updateItemPost,
  deleteItemPost,
  addItemGet,
  addItemPost,
};
