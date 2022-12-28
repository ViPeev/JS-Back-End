const fs = require("fs");
const uniqid = require("uniqid");

let dataArray;
let fileName = "./config/database.json";

getData();

function getData() {
  fs.readFile(fileName, (err, data) => {
    if (err) {
      throw new Error(err.message);
    } else {
      dataArray = JSON.parse(data.toString());
    }
  });
}

function updateData() {
  fs.writeFile(fileName,JSON.stringify(dataArray), (err) => {
    if (err) {
        throw new Error(err.message);
      }
    })
}

function addItem(cube) {
  cube.id = uniqid();
  dataArray.push(cube);
  updateData();
}

function getAll() {
  return dataArray;
}

function getById(id) {
  return dataArray.find((item) => item.id == id);
}

module.exports = { getAll, addItem, getById, updateData };
