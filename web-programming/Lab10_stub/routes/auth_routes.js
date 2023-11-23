//import express, express router as shown in lecture code
import express from 'express';
import { registerUser, loginUser } from '../data/users.js'; // Adjust the path as necessary
import helpers from '../helpers.js'

const router = express.Router();


router.route('/').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({error: 'YOU SHOULD NOT BE HERE!'});
});

router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    if (req.session.user) {
      return res.redirect('/protected'); // Redirect if already logged in
    }
    res.render('register', { layout: 'main' }); // Render register view
  })
  .post(async (req, res) => {
    try {
      helpers.isValidString(req.body.firstNameInput, 'First Name', 2);
      helpers.isValidString(req.body.lastNameInput, 'Last Name', 2);
      helpers.isValidEmail(req.body.emailAddressInput);
      helpers.isValidPassword(req.body.passwordInput);
  
      if (req.body.passwordInput !== req.body.confirmPasswordInput) {
        throw new Error('Passwords do not match');
      }
  
      helpers.isValidRole(req.body.roleInput);
  
      const result = await registerUser(
        req.body.firstNameInput,
        req.body.lastNameInput,
        req.body.emailAddressInput,
        req.body.passwordInput,
        req.body.roleInput
      );
  
      if (result.insertedUser) {
        return res.redirect('/login');
      } else {
        throw new Error('Internal Server Error');
      }
  
    } catch (e) {
      // Render the error.handlebars page with the error message
      res.status(400).render('error', { layout: 'main', error: e.message });
    }
  });
  

  router
  .route('/login')
  .get(async (req, res) => {
  
    if (req.session.user) {
      return res.redirect('/protected'); // Redirect if already logged in
    }
    res.render('login', { layout: 'main' }); // Render login view
  })
  .post(async (req, res) => {
    
    try {
      helpers.isValidEmail(req.body.emailAddressInput);
      helpers.isValidPassword(req.body.passwordInput);
      const user = await loginUser(req.body.emailAddressInput, req.body.passwordInput);
      
      // Set user info in session
      req.session.user = {
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        role: user.role
      };
  
      // Redirect based on role
      return user.role === 'admin' ? res.redirect('/admin') : res.redirect('/protected');
  
    } catch (e) {
      // Specific error handling
      if (e.message === 'Email address does not have an account' || e.message === 'Incorrect password') {
        res.status(400).render('error', { layout: 'main', error: 'Invalid email or password' }); // Generic message for end user
      } else {
        // Handle other errors normally
        res.status(400).render('error', { layout: 'main', error: e.message });
      }
    }
  });


  router.route('/protected').get(async (req, res) => {
    // Check if user is not logged in
    if (!req.session.user) {
      // Redirect to login page if not logged in
      return res.redirect('/login');
    }
  
    // Determine if the user is an admin
    const isAdmin = req.session.user.role === 'admin';
  
    // Render the 'protected' view
    res.render('protected', {
      layout: 'main',
      user: req.session.user,
      isAdmin: isAdmin, 
      currentTime: new Date().toLocaleString()
    });
  });
  
  

router.route('/admin').get(async (req, res) => {
  //code here for GET
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.redirect('/login');
  }
  res.render('admin', {
    layout: 'main',
    user: req.session.user,
    currentTime: new Date().toLocaleString()
  });
});

router.route('/error').get(async (req, res) => {
  //code here for GET
  res.status(500).render('error', { layout: 'main', errorMessage: 'An error occurred' });
});

router.route('/logout').get(async (req, res) => {
  //code here for GET
  req.session.destroy();
  res.render('logout', { layout: 'main' });
});

export default router;
