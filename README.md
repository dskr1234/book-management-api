# book-management-api

# Book Management Application

This is a full-stack Book Management app with a React frontend and Node.js backend.  
You can add, update, delete, view books, and import books in bulk from a CSV file.


## Prerequisites

- Node.js installed (v12 or higher)
- A modern web browser (Chrome, Firefox, Edge, etc.)

---

## Backend Setup and Run

1. Open your terminal or command prompt.

2. Navigate to the backend folder:

   ```bash
   cd book-management-app/backend
````

3. Initialize npm and install required dependencies:

   ```bash
   npm init -y
   npm install express cors multer csv-parser uuid
   ```

4. Start the backend server:

   ```bash
   node server.js
   ```

5. You should see:

   ```
   Server running on port 5000
   ```

Backend API is now running at: `http://localhost:5000`

---

## Frontend Setup and Run

1. Open the folder `book-management-app/frontend`.

2. Open `index.html` directly in your browser by double-clicking or dragging it into a browser window.

   * Alternatively, you can serve it using VS Code Live Server or any local HTTP server for better experience.

3. The frontend will communicate with the backend API at `http://localhost:5000`.

---

## Using the Application

* Add Book: Fill the Title, Author, and Published Year fields, then click Add Book.

* Update Book: Click the Edit button next to a book to load its data into the form, edit it, then click Update Book.

* Delete Book: Click the Delete button next to a book.

* Import CSV: Use the Choose File button to select the included `sample-books.csv` or your own CSV file, then click Import CSV.


## Sample CSV Format

Your CSV must have headers: `title,author,publishedYear`

Example:

csv


title,author,publishedYear
The Alchemist,Paulo Coelho,1988
Clean Code,Robert C. Martin,2008
The Pragmatic Programmer,Andrew Hunt,1999


| GET    | `/books`        | Retrieve all books           |
| GET    | `/books/:id`    | Retrieve a single book by ID |
| POST   | `/books`        | Add a new book               |
| PUT    | `/books/:id`    | Update an existing book      |
| DELETE | `/books/:id`    | Delete a book                |
| POST   | `/books/import` | Import books via CSV file    |



## Testing with Postman

You can import the following Postman collection JSON to test all endpoints:

1. Copy the following JSON to a file named `book-management-api.postman_collection.json`.

2. Open Postman → Import → select the file.

3. Replace `{{bookId}}` with actual book IDs from GET responses when testing specific book endpoints.

json


{
  "info": {
    "_postman_id": "book-management-api",
    "name": "Book Management API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get All Books",
      "request": {
        "method": "GET",
        "url": {
          "raw": "http://localhost:5000/books"
        }
      }
    },
    {
      "name": "Get Book By ID",
      "request": {
        "method": "GET",
        "url": {
          "raw": "http://localhost:5000/books/{{bookId}}"
        }
      }
    },
    {
      "name": "Add Book",
      "request": {
        "method": "POST",
        "header": [{ "key": "Content-Type", "value": "application/json" }],
        "body": {
          "mode": "raw",
          "raw": "{\"title\":\"Book Title\",\"author\":\"Author Name\",\"publishedYear\":2020}"
        },
        "url": {
          "raw": "http://localhost:5000/books"
        }
      }
    },
    {
      "name": "Update Book",
      "request": {
        "method": "PUT",
        "header": [{ "key": "Content-Type", "value": "application/json" }],
        "body": {
          "mode": "raw",
          "raw": "{\"title\":\"Updated Title\",\"author\":\"Updated Author\",\"publishedYear\":2021}"
        },
        "url": {
          "raw": "http://localhost:5000/books/{{bookId}}"
        }
      }
    },
    {
      "name": "Delete Book",
      "request": {
        "method": "DELETE",
        "url": {
          "raw": "http://localhost:5000/books/{{bookId}}"
        }
      }
    },
    {
      "name": "Import Books CSV",
      "request": {
        "method": "POST",
        "body": {
          "mode": "formdata",
          "formdata": [
            {
              "key": "file",
              "type": "file",
              "src": ""
            }
          ]
        },
        "url": {
          "raw": "http://localhost:5000/books/import"
        }
      }
    }
  ]
}


## Troubleshooting

* Make sure backend is running before opening the frontend.
* Backend server must be at `http://localhost:5000`.
* Allow CORS if you run backend on a different port.
* Use latest browsers for best compatibility.



## Contact

For any questions or issues, please reach out.



Happy coding! 🚀
