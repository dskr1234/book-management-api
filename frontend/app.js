const API = 'http://localhost:5000/books';

let editingBookId = null;

async function fetchBooks() {
  const res = await fetch(API);
  const books = await res.json();
  const list = document.getElementById('bookList');
  list.innerHTML = '';
  books.forEach(book => {
    const li = document.createElement('li');
    li.textContent = `${book.title} by ${book.author} (${book.publishedYear}) `;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => startEdit(book);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteBook(book.id);

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

function startEdit(book) {
  editingBookId = book.id;
  document.getElementById('title').value = book.title;
  document.getElementById('author').value = book.author;
  document.getElementById('year').value = book.publishedYear;
  document.getElementById('addBtn').textContent = 'Update Book';
}

async function addOrUpdateBook() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const publishedYear = document.getElementById('year').value;

  if (editingBookId) {
    // Update existing book
    await fetch(`${API}/${editingBookId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, publishedYear })
    });
    editingBookId = null;
    document.getElementById('addBtn').textContent = 'Add Book';
  } else {
    // Add new book
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, publishedYear })
    });
  }

  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('year').value = '';
  fetchBooks();
}

async function deleteBook(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  fetchBooks();
}

async function importBooks() {
  const fileInput = document.getElementById('fileInput');
  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  await fetch(`${API}/import`, {
    method: 'POST',
    body: formData
  });

  fetchBooks();
}

fetchBooks();
