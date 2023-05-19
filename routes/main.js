const indexPath = require.main.path;

module.exports = () => {
  const router = require('express').Router();

  router.get("", async (req, res) => {
    res.render(indexPath + '/views/index.ejs', { user: null });
  });

  return router;
}
