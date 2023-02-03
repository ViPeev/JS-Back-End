const Book = require("../models/Book");

async function createBook(book) {
  return Book.create(book);
}

async function getAll(){
    return Book.find({}).populate('wishingList').lean();
}

async function getAllFiltered(userId){
  return Book.find({wishingList: {$in: [userId]}}).lean();
}

async function getBook(id) {
  return Book.findById(id).populate("wishingList").lean();
}

async function editBook(id, data) {
  const existing = await Book.findById(id);
  if (!existing) {
    throw new Error("Book not found!");
  }

  existing.title = data.title;
  existing.author = data.author;
  existing.genre = data.genre;
  existing.stars = data.stars;
  existing.image = data.image;
  existing.review = data.review;
  return existing.save();
}

async function deleteBook(id) {
  return Book.findByIdAndDelete(id);
}

async function addToWishList(id,userId) {
  const existing = await Book.findById(id);
  if (!existing) {
    throw new Error("Book not found!");
  }

  existing.wishingList.push(userId);
  return existing.save();
}

module.exports = {
  createBook,
  getBook,
  editBook,
  deleteBook,
  addToWishList,
  getAll,
  getAllFiltered
};
