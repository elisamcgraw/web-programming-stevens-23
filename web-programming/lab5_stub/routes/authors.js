//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getAuthors() function in the /data/data.js file that you used for lab 3 to return the list of authors and call it in the /authors route.  You can also import your getAuthorById(id) function and call it in the :/id route.
import express from 'express';
import { getAuthors, getAuthorById } from '../data/data.js'; 
const router = express.Router();

router.route('/')
// Implement GET Request Method and send a JSON response See lecture code!
.get(async (req, res) => {
    console.log("Fetching authors...");
    try {
       const authors = await getAuthors();
       console.log("Authors fetched:", authors);
       return res.json(authors);
    } catch (e) {
       console.error("Error while fetching authors:", e.message);
       return res.status(500).json({ error: 'Failed to retrieve authors.' });
    }
 });
 


router.route('/:id')
//Implement GET Request Method and send a JSON response See lecture code!
.get(async (req, res) => {
    try {
      const author = await getAuthorById(req.params.id);
      if (!author) {
        return res.status(404).json({ error: 'Author Not Found!' });
      } else {
        return res.json(author);
      }
    } catch (e) {
      // If you have a specific "Author Not Found" error, you can handle it here
      if (e.message === 'Author Not Found!') {
        return res.status(404).json({ error: e.message });
      }
      // For other errors
      return res.status(500).json({ error: 'Failed to retrieve author.' });
    }
  });
export default router;
