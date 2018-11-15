import express from 'express';

const router = express.Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.render('index');
});

/* GET about us page. */
router.get('/about-us', (req, res) => {
  res.render('about');
});

/* GET contact us page. */
router.get('/contact-us', (req, res) => {
  res.render('contact');
});

/* GET login page. */
router.get('/login', (req, res) => {
  res.render('login');
});

/* GET sign up page. */
router.get('/sign-up', (req, res) => {
  res.render('signup');
});

/* GET user-dashboard page. */
router.get('/user-dashboard', (req, res) => {
  res.render('user');
});

/* GET admin page. */
router.get('/admin-dashboard', (req, res) => {
  res.render('admin');
});
export default router;
