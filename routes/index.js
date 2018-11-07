import express from 'express';

const router = express.Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'SendIT'
  });
});

/* GET about us page. */
router.get('/', (req, res) => {
  res.render('about', {
    title: 'SendIT'
  });
});

/* GET contact us page. */
router.get('/', (req, res) => {
  res.render('contact', {
    title: 'SendIT'
  });
});

/* GET login page. */
router.get('/', (req, res) => {
  res.render('login', {
    title: 'SendIT'
  });
});

/* GET sign up page. */
router.get('/', (req, res) => {
  res.render('signup', {
    title: 'SendIT'
  });
});

/* GET user-dashboard page. */
router.get('/', (req, res) => {
  res.render('user', {
    title: 'SendIT'
  });
});

/* GET admin page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'SendIT'
  });
});
export default router;
