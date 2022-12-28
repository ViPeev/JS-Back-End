const fs = require('fs').promises;

async function staticHandler(req, res) {
    if(req.url.endsWith('css')){
        res.writeHead(200, {
          'Content-Type': 'text/css',
        });
        let css = await fs.readFile('./content/styles/site.css');
        res.write(css);
    }else if(req.url.includes('images')){
        res.writeHead(200, {
            'Content-Type': 'image/x-icon',
          });
          let image = await fs.readFile(`.${req.url}`);
          res.write(image);
    }

  res.end();
}

module.exports = { staticHandler };
