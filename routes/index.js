import express from 'express';

const router = express.Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'SendIT'
  });
});

/* GET about us page. */
router.get('/about-us', (req, res) => {
  res.render('about', {
    title: 'SendIT'
  });
});

/* GET contact us page. */
router.get('/contact-us', (req, res) => {
  res.render('contact', {
    title: 'SendIT'
  });
});

/* GET login page. */
router.get('/login', (req, res) => {
  res.render('login', {
    title: 'SendIT'
  });
});

/* GET sign up page. */
router.get('/sign-up', (req, res) => {
  res.render('signup', {
    title: 'SendIT'
  });
});

/* GET user-dashboard page. */
router.get('/user-dashboard', (req, res) => {
  res.render('user', {
    title: 'SendIT'
  });
});

/* GET admin page. */
router.get('/admin-dashboard', (req, res) => {
  res.render('admin', {
    title: 'SendIT'
  });
});
// API HOMEPAGE
router.get('/api/v1', (req, res) => {
  res.render('api');
});
export default router;
