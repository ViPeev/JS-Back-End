const { renderHome, searchForm } = require('./handlers/home');
const { staticHandler } = require('./handlers/staticHandler');
const { renderNotFound } = require('./handlers/notFound');
const { renderAddcat, addCatForm } = require('./handlers/addCat');
const { renderBreed, addBreedForm } = require('./handlers/addBreed');
const { renderEdit, editForm } = require('./handlers/edit');
const {renderShelter, shelterForm} = require('./handlers/shelter');

const routes = {
  GET: {
    '/': renderHome,
    '/add-cat': renderAddcat,
    '/add-breed': renderBreed,
    '/edit': renderEdit,
    '/shelter':renderShelter
  },
  POST: {
    '/':searchForm,
    '/add-cat': addCatForm,
    '/add-breed': addBreedForm,
    '/edit': editForm,
    '/shelter':shelterForm,
  },
};

function router(req, res) {
  const path = req.url;
  const method = req.method;

  const actions = routes[method];
  let handler;
  if (actions[path]) {
    handler = actions[path];
  } else if (path.includes('/edit')) {
    handler = actions['/edit'];
  }else if(path.includes('/shelter')){
    handler = actions['/shelter'];
  } else if (path.endsWith('css') || path.includes('images')) {
    handler = staticHandler;
  } else {
    handler = renderNotFound;
  }

  handler(req, res);
}

module.exports = { router };
