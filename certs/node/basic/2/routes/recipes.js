var recipes = require('../recipes.json');
var router = require('express').Router();

router.get('/', (req, res) => {
  const c = req.context;

  const data = (c.searchTerm
    ? recipes.filter(r => c.search.test(r.name))
    : recipes
  ).slice(c.skip, c.skip + c.limit);

  res.json({
    page: c.page,
    limit: c.limit,
    skip: c.skip,
    search: c.searchTerm,
    data
  });
});

module.exports = router;