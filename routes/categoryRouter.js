const { Router } = require("express");

const categoryRouter = Router();

const {
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
} = require("../controllers/categoryController");

categoryRouter.get("/", indexCategoriesGet);
categoryRouter.get("/:category/:index", specificCategoriesGet);
categoryRouter.get("/add-new-category", addNewCategoryGet);
categoryRouter.post("/add-new-category", addNewCategoryPost);
categoryRouter.get("/update-category/:category/:index", updateCategoryGet);
categoryRouter.post("/update/:category/:index", updateCategoryPost);
categoryRouter.post("/delete-category/:category/:index", deleteCategoryPost);
categoryRouter.get("/:index/:item/:number", specificItemGet);
categoryRouter.get(
  "/update-item/:index/:item/:number/:specificId",
  updateItemGet
);
categoryRouter.post(
  "/update-item/:index/:item/:number/:specificId",
  updateItemPost
);
categoryRouter.post(
  "/delete-item/:index/:item/:number/:specificId",
  deleteItemPost
);
categoryRouter.get("/add-items/items/add-item/:index", addItemGet);
categoryRouter.post("/add-items/items/add-item/:index", addItemPost);

module.exports = categoryRouter;
