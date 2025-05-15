const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const csv = require('csv-parser');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

let books = [];

// Get all books
app.get('/books', (req, res) => res.json(books));

// Get book by ID
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

// Add new book
app.post('/books', (req, res) => {
  const { title, author, publishedYear } = req.body;
  if (!title || !author || !publishedYear) return res.status(400).json({ error: 'Missing fields' });
  const newBook = { id: uuidv4(), title, author, publishedYear };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update book by ID
app.put('/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Book not found' });
  books[index] = { ...books[index], ...req.body };
  res.json(books[index]);
});

// Delete book by ID
app.delete('/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Book not found' });
  books.splice(index, 1);
  res.json({ message: 'Deleted successfully' });
});

// Import books CSV
app.post('/books/import', upload.single('file'), (req, res) => {
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      const added = [];
      const errors = [];
      results.forEach((row, i) => {
        const { title, author, publishedYear } = row;
        if (title && author && !isNaN(publishedYear)) {
          added.push({ id: uuidv4(), title, author, publishedYear: Number(publishedYear) });
        } else {
          errors.push({ row: i + 1, error: 'Invalid data' });
        }
      });
      books.push(...added);
      res.json({ added: added.length, errors });
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
