const { getCat, getAllBreeds, createOption, updateCat } = require('../utils');
const { IncomingForm } = require('formidable');
const fs = require('fs').promises;

async function renderEdit(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });

  const index = req.url.lastIndexOf('/');
  const id = req.url.slice(index + 1);
  const current = getCat(id);
  let layout = await fs.readFile('./views/editCat.html');
  
  res.write(
    layout.toString()
      .replace('{{name}}', current.name)
      .replace('{{description}}', current.description)
      .replace('{{allBreeds}}', getAllBreeds().map(createOption).join(''))
      .replace('{{id}}',current.id)
  );
  res.end();
}

function editForm(req, res) {
  const form = new IncomingForm();
  form.parse(req, (err, fields) => {
    const data = {
      name: fields.name,
      url: fields.upload,
      description: fields.description,
      breed: fields.breed,
      id:fields.id
    };

    updateCat(data);
    res.writeHead(301, {
      Location: '/',
    });
    res.end();
  });
};
module.exports = { renderEdit, editForm };
