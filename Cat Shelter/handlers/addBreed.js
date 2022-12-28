const { addBreed } = require('../utils');
const { IncomingForm } = require('formidable');
const fs = require('fs').promises;

async function renderBreed(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });

  let layout = await fs.readFile('./views/addBreed.html');
  res.write(layout.toString());
  res.end();
}

function addBreedForm(req, res){
  const form = new IncomingForm();
  
  form.parse(req, (err, fields) => {
    if (fields.breed) {
      addBreed(fields.breed);
      res.writeHead(301, {
        Location: '/',
      });
    }
    res.end();
  });
};

module.exports = { renderBreed, addBreedForm };
