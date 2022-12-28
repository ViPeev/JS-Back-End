const { getAllCats } = require('../utils');
const { IncomingForm } = require('formidable');
const fs = require('fs').promises;

async function renderCatalog(catData, req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });

  let layout = await fs.readFile('./views/home/index.html');
  res.write(
    layout.toString().replace('{{allCats}}', catData().map(catCard).join(''))
  );
  res.end();
}

const catCard = ({ url, name, breed, description, id }) => `
<li>
<img src='${url}'>
<h3>${name}</h3>
<p><span>Breed: </span>${breed}</p>
<p><span>Description: </span>${description}</p>
<ul class='buttons'>
<li class='btn edit'><a href='/edit/${id}'>Change Info</a></li>
<li class='btn delete'><a href='/shelter/${id}'>New Home</a></li>
</ul>
</li>`;

async function searchForm(req, res) {
  const form = new IncomingForm();
  form.parse(req, (err, fields) => {
    const search = fields.search.trim().toLowerCase();

    const filtered = () =>
      getAllCats().filter((cat) => {
        return cat.breed.toLowerCase().includes(search);
      });

    renderCatalog(filtered, req, res);
  });
}

const renderHome = renderCatalog.bind(null, getAllCats);

module.exports = { renderHome, searchForm };
