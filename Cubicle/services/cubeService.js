const cubeModel = require("../models/Cube");

async function getAll(query) {
  let options = {};
  if (query.search) {
    options.name = { $regex: query.search, $options: "i" };
  }
  if (query.from) {
    options.diffLevel = {};
    options.diffLevel["$gte"] = Number(query.from);
  }
  if (query.to) {
    options.diffLevel = options.diffLevel ? options.diffLevel : {};
    options.diffLevel["$lte"] = Number(query.to);
  }
  return cubeModel.find(options).lean();
}

async function getAllRaw() {
  return cubeModel.find({});
}

async function getById(_id) {
  return cubeModel.findOne({ _id }).populate('accessories').lean();
}

async function createCube(cube) {
  return cubeModel.create(cube);
}

async function deleteCube(_id) {
  return cubeModel.findByIdAndDelete(_id);
}

async function updateById(_id, data) {
  const cube = await cubeModel.findById(_id);
  if (cube) {
    cube.name = data.name;
    cube.description = data.description;
    cube.imageUrl = data.imageUrl;
    cube.diffLevel = data.diffLevel;
    await cube.save();
  } else {
    throw "Cube not found!";
  }
}

async function addAccessory(_id, accessory) {
  const cube = await cubeModel.findOne({_id});
  if (cube) {
    cube.accessories.push(accessory);
    return cube.save();
  } else {
    throw "Cube not found!";
  }
}

module.exports = {
  getAll,
  getAllRaw,
  getById,
  createCube,
  deleteCube,
  updateById,
  addAccessory,
};
