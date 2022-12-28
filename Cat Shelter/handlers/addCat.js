const { getAllBreeds, addCat, createOption } = require('../utils');
const { IncomingForm } = require('formidable');
const fs = require('fs').promises;


async function renderAddcat(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });

  let layout = await fs.readFile('./views/addCat.html');
  res.write(
    layout
      .toString()
      .replace('{{allBreeds}}', getAllBreeds().map(createOption).join(''))
  );
  res.end();
}

function addCatForm(req, res){
  const form = new IncomingForm();
  form.parse(req, (err, fields) => {
    const data = {
      name: fields.name,
      url: fields.upload,
      description: fields.description,
      breed: fields.breed,
    };

    addCat(data);
    res.writeHead(301, {
      Location: '/',
    });
    res.end();
  });
};

module.exports = { renderAddcat, addCatForm };
