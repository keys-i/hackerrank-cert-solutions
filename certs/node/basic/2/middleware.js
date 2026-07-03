module.exports = (req, res, next) => {
  const q = String(req.query.q || '');
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.max(parseInt(req.query.limit, 10) || 3, 1);

  req.context = {
    page,
    limit,
    skip: (page - 1) * limit,
    searchTerm: q,
    search: new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
  };

  next();
};