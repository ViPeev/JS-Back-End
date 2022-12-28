const fs = require('fs').promises;

async function renderNotFound(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });

  const layout = await fs.readFile('./views/notFound.html');
  res.write(layout.toString());
  res.end();
}

module.exports = { renderNotFound };
