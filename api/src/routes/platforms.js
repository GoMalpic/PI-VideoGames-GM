const { Router } = require('express');
const router = Router();
const platform = ['Xbox One', 'PlayStation 4', 'Xbox 360', 'PC', 'macOs', 'Linux', 'Xbox Series S/X', 'Xbox', 'PlayStation 5', 'Nintendo Switch', 'PlayStation 2', 'PlayStation 3']

router.get('/', async (req, res, next) => {
  try {
    res.send(platform)
  } catch (error) {
    next(error);
  }
})

module.exports = router