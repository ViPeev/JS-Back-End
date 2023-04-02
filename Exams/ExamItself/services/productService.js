const Product = require("../models/Product");

async function createProduct(data) {
  return Product.create(data);
}

async function getAll() {
  return Product.find({}).populate("owner").lean();
}

async function getAllFiltered(userId) {
  return Product.find({ owner: userId }).lean();
}

async function getProduct(id) {
  return Product.findById(id)
    .populate("owner")
    .populate({ path: "list", populate: { path: "userId", moderl: "User" } })
    .lean();
}

async function editProduct(id, data) {
  const existing = await Product.findById(id);
  if (!existing) {
    throw new Error("Product not found!");
  }

  existing.name = data.name;
  existing.location = data.location;
  existing.age = data.age;
  existing.image = data.image;
  existing.description = data.description;
  return existing.save();
}

async function deleteProduct(id) {
  return Product.findByIdAndDelete(id);
}

async function addToList(comment, id, userId) {
  const existing = await Product.findById(id);
  if (!existing) {
    throw new Error("Post not found!");
  }
  const data = { userId, comment };
  existing.list.push(data);
  return existing.save();
}

module.exports = {
  createProduct,
  getProduct,
  editProduct,
  deleteProduct,
  addToList,
  getAll,
  getAllFiltered,
};
