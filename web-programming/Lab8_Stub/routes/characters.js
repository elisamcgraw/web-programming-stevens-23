//import express and express router as shown in lecture code and worked in previous labs.  
// Import your data functions from /data/characters.js that you will call in your routes below

import {Router} from 'express';
const router = Router();
import {searchCharacterByName, searchCharacterById } from '../data/characters.js';
import helpers from '../helpers.js';

router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
  try {
    // Render the 'home' view using the 'render' method
    res.render('home', {
      title: 'Marvel Character Finder'
    });
    
  } catch (error) {
    res.status(500).send("Error rendering the home page");
  }
});

router.post('/searchmarvelcharacters', async (req, res) => {
  console.log("entered the route", req.body);
  let searchQuery = req.body.searchCharacterByName || '';
  searchQuery = searchQuery.trim();

  try {
    helpers.isValidString(searchQuery, 'Character name'); 

    const characters = await searchCharacterByName(searchQuery);
    if (characters.length === 0) {
      res.status(404).render('error', { title: "Oops!",
        errorMessage: `No results found for "${searchQuery}".`
      });
    } else {
      res.render('characterSearchResults', { title: "Oops!",characters, searchQuery });
    }
  } catch (error) {
    console.error('Error during character search:', error);
    res.status(400).render('error', {title: "Oops!",
      errorMessage: error.message // This will display the error message from isValidString
    });
  }
});


router.get('/marvelcharacter/:id', async (req, res) => {
  console.log("Entered character id route");
  try {
    const { id } = req.params;
    const character = await searchCharacterById(id);
    res.render('characterById', {
      results: [character] // Pass character in an array to match the expected Handlebars structure
    });
  } catch (error) {
    if (error.message.includes("not found")) {
      res.status(404).render('error', {title: "Oops!", error: error.message });
    } else {
      console.error(error);
      res.status(500).render('error', { title: "Oops!",error: 'An error occurred while fetching the character details' });
    }
  }
});



//export router
export default router;
