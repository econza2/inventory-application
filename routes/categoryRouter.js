const { Router } = require("express");

const categoryRouter = Router();

const categoryController = require("../controllers/categoryController");

categoryRouter.get("/", categoryController.indexCategoriesGet);
categoryRouter.get(
  "/:category/:index",
  categoryController.specificCategoriesGet
);
categoryRouter.get("/add-new-category", categoryController.addNewCategoryGet);
categoryRouter.post("/add-new-category", categoryController.addNewCategoryPost);
categoryRouter.get(
  "/update-category/:category/:index",
  categoryController.updateCategoryGet
);
categoryRouter.post(
  "/update/:category/:index",
  categoryController.updateCategoryPost
);
categoryRouter.post(
  "/delete-category/:category/:index",
  categoryController.deleteCategoryPost
);
categoryRouter.get("/:index/:item/:number", categoryController.specificItemGet);
categoryRouter.get(
  "/update-item/:index/:item/:number",
  categoryController.updateItemGet
);
categoryRouter.post(
  "/update-item/:index/:item/:number",
  categoryController.updateItemPost
);
categoryRouter.post(
  "/delete-item/:index/:item/:number",
  categoryController.deleteItemPost
);
categoryRouter.get(
  "/add-items/items/add-item/:index",
  categoryController.addItemGet
);
categoryRouter.post(
  "/add-items/items/add-item/:index",
  categoryController.addItemPost
);

module.exports = categoryRouter;
