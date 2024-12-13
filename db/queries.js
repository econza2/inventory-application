const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getCategoryItemPair() {
  const { rows } = await pool.query(
    "SELECT * FROM categories INNER JOIN items ON categories.id = items.category_id"
  );
  return rows;
}

async function addNewCategory(categoryName) {
  await pool.query("INSERT INTO categories (name) VALUES ($1)", [categoryName]);
}

async function updateCategory(categoryName, categoryId) {
  await pool.query("UPDATE categories SET name = $1 WHERE id = $2", [
    categoryName,
    categoryId,
  ]);
}

async function deleteCategory(categoryId) {
  await pool.query("DELETE FROM items WHERE category_id = $1", [categoryId]);
  await pool.query("DELETE FROM categories  WHERE id = $1", [categoryId]);
}

async function updateItem(itemName, itemId) {
  await pool.query("UPDATE items SET item_name = $1 WHERE item_id = $2", [
    itemName,
    itemId,
  ]);
}

async function deleteItem(itemId) {
  await pool.query("DELETE FROM items WHERE item_id = $1", [itemId]);
}

async function addItem(itemName, categoryId) {
  await pool.query(
    "INSERT INTO items (item_name, category_id) VALUES ($1, $2)",
    [itemName, categoryId]
  );
}
module.exports = {
  getAllCategories,
  getCategoryItemPair,
  addNewCategory,
  updateCategory,
  deleteCategory,
  updateItem,
  deleteItem,
  addItem,
};
