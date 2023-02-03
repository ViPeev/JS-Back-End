const accessoryModel = require("../models/Accessory");

async function getAll() {
  return accessoryModel.find({});
}

async function createAccessory(accessory) {
  return accessoryModel.create(accessory);
}

module.exports = { getAll, createAccessory };
