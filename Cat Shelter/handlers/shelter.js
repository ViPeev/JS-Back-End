const { getCat, createOption, removeCat } = require('../utils');
const { IncomingForm } = require('formidable');
const fs = require('fs').promises;

async function renderShelter(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });
  const index = req.url.lastIndexOf('/');
  const id = req.url.slice(index + 1);
  const current = getCat(id);

  let layout = await fs.readFile('./views/catShelter.html');
  res.write(
    layout
      .toString()
      .replace('{{name}}', current.name)
      .replace('{{description}}', current.description)
      .replace('{{breed}}', createOption(current.breed))
      .replace('{{id}}', current.id)
      .replace('{{url}}',current.url)
  );
  res.end();
}

function shelterForm(req, res) {
    const form = new IncomingForm();
    form.parse(req, (err, fields) => {
      removeCat(fields.id);
      res.writeHead(301, {
        Location: '/',
      });
      res.end();
    });
  };

module.exports = { renderShelter, shelterForm };
