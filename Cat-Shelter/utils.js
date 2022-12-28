const { v4: uuidv4 } = require('uuid');
const { cats, breeds } = require('./data');

const getAllCats = () => {
  return Object.values(cats);
};

const getAllBreeds = () => breeds;

const addCat = ({ name, breed, description, url }) => {
  const id = uuidv4();
  cats[id] = { name, breed, description, url, id };
};

const getCat = (id) => cats[id];

const updateCat = ({ name, breed, description, url, id }) => {
  const current = cats[id];
  current.name = name;
  current.breed = breed;
  current.description = description;
  current.url = url;
};

const addBreed = (breed) => {
  breeds.push(breed);
};

const removeCat = (id) => {
  delete cats[id];
};

const createOption = (data) => `
  <option value='${data}'>${data}</option>`;

module.exports = {
  getAllCats,
  getAllBreeds,
  addBreed,
  addCat,
  removeCat,
  getCat,
  updateCat,
  createOption,
};
