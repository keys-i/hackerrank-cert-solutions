var recipes = require('../recipes.json');
var router = require('express').Router();

router.get('/shopping-list', (req, res) => {
  const { ids } = req.query;

  if (!ids || ids.trim() === '') {
    return res.status(400).send();
  }

  const want = new Set(
    ids
      .split(',')
      .map(Number)
      .filter(Number.isFinite)
  );

  const list = recipes
    .filter(r => want.has(r.id))
    .flatMap(r => r.ingredients);

  if (!list.length) {
    return res.status(404).send('NOT_FOUND');
  }

  return res.status(200).json(list);
});

router.get('/step/:id', (req, res) => {
  const { id } = req.params;

  if ((id && isNaN(id)) || !id) {
    return res.status(400).send("NOT_FOUND");
  }

  const recipe = recipes[+id - 1];

  if (!recipe) {
    return res.status(400).send("NOT_FOUND");
  }

  let { elapsedTime = '' } = req.query;
  if (!elapsedTime) elapsedTime = 0;
  elapsedTime = +elapsedTime;

  let stop = false;
  const stepIndex = recipe.timers.reduce((prev, currentTime, index) => {
    if (!stop) {
      if (currentTime >= elapsedTime) stop = true;
      return index;
    }
    return prev;
  }, 0);

  res.json({ index: stepIndex });
});

module.exports = router;
