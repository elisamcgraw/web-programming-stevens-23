//Here you will require route files and export them as used in previous labs.

import palindrome from './palindromeCheck.js';

const constructorMethod = (app) => {
  app.use('/', palindrome);

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Route Not found'});
  });
};

export default constructorMethod;