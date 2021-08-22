var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'Express' });
});

/* GET playlist page. */
router.get('/playlist/:id', function(req, res, next) {
    const id = req.params.id;
    res.render('playlist', { title: 'Express' });
});

/* GET create playlist page. */
router.get('/new', function(req, res, next) {
    const id = req.params.id;
    res.render('create-playlist', { title: 'Express' });
});

/* GET quiz page. */
router.get('/quiz/:id', function(req, res, next) {
    const id = req.params.id;
    res.render('quiz', { title: 'Express' });
});

module.exports = router;
