/*
Here is where you'll set up your server as shown in lecture code and worked in previous labs.
Your server this week should not be doing any of the processing! Your server only exists to allow someone to get to the HTML Page and download the associated assets to run the palindrome checker.
You do not have to use handlebars for this since everything will be done client side. Your server is JUST to serve the static html file and all processing will be done using client side JavaScript
*/


import express from 'express';
const app = express();
import configRoutes from './routes/index.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/public', express.static('public'));

// Serve 'homepage.html' for the root route
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'static', 'homepage.html'));
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});

