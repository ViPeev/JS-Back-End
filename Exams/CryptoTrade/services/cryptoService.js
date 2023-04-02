const Crypto = require("../models/Crypto");

async function createCrypto(data) {
  return Crypto.create(data);
}

async function getAll(){
    return Crypto.find({}).populate('wishingList').lean();
}

async function getAllFiltered(userId){
  return Crypto.find({wishingList: {$in: [userId]}}).lean();
}

async function getCrypto(id) {
  return Crypto.findById(id).populate("wishingList").lean();
}

async function editCrypto(id, data) {
  const existing = await Crypto.findById(id);
  if (!existing) {
    throw new Error("Crypto not found!");
  }

  existing.name = data.name;
  existing.price = data.price;
  existing.image = data.image;
  existing.description = data.description;
  existing.payment = data.payment;
  return existing.save();
}

async function deleteCrypto(id) {
  return Crypto.findByIdAndDelete(id);
}

async function addToWishList(id,userId) {
  const existing = await Crypto.findById(id);
  if (!existing) {
    throw new Error("Crypto not found!");
  }

  existing.wishingList.push(userId);
  return existing.save();
}

module.exports = {
  createCrypto,
  getCrypto,
  editCrypto,
  deleteCrypto,
  addToWishList,
  getAll,
  getAllFiltered
};
