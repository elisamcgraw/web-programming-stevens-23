//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getBooks() function in the /data/data.js file that you used for lab 3 to return the list of books.  You can also import your getBookById(id) function and call it in the :/id route.
import express from 'express';
import { getBooks, getBookById } from '../data/data.js'; 
const router = express.Router();

// Implement GET Request Method and send a JSON response  See lecture code!
router.route('/')
  .get(async (req, res) => {
    try {
      const books = await getBooks();
      return res.json(books);
    } catch (e) {
      return res.status(500).send(e);
    }
  });

// Implement GET Request Method and send a JSON response See lecture code!
router.route('/:id')
.get(async (req, res) => {
    try {
        const book = await getBookById(req.params.id);
        return res.json(book);
    } catch (e) {
        console.error("Error fetching book by ID:", e.message);
        return res.status(500).json({ error: e.message });
    }
});


export default router;
