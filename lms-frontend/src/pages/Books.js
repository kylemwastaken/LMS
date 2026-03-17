import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./Books.css";

function Books() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ isbn: "", title: "", author: "", category: "Fiction", totalCopies: 1 });
  const [searchId, setSearchId] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [message, setMessage] = useState("");
  const role = localStorage.getItem("role");

  // Fetch all books
  useEffect(() => {
    api.get("/books")
      .then(res => setBooks(res.data))
      .catch(err => console.error("Error fetching books:", err));
  }, []);

  // Add a new book
  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/books", newBook);
      setMessage("Book added successfully!");
      setBooks([...books, res.data]);
      setNewBook({ isbn: "", title: "", author: "", category: "Fiction", totalCopies: 1 });
    } catch (err) {
      setMessage("Failed to add book.");
    }
  };

  // Search by ID
  const handleSearchById = async () => {
    try {
      const res = await api.get(`/books/${searchId}`);
      setBooks([res.data]);
      setMessage("");
    } catch (err) {
      setMessage("Book not found.");
      setBooks([]);
    }
  };

  // Search by Category
  const handleSearchByCategory = async () => {
    try {
      const categoryParam =
        searchCategory.trim().charAt(0).toUpperCase() +
        searchCategory.trim().slice(1).toLowerCase();

      const res = await api.get(`/books/browse/${categoryParam}`);
      setBooks(res.data);
      setMessage(res.data.length === 0 ? "No books found for this category." : "");
    } catch (err) {
      setBooks([]);
      setMessage("No books found for this category.");
    }
  };

  // Search by Title
  const handleSearchByTitle = async () => {
    try {
      const res = await api.get(`/books/title/${searchTitle}`);
      setBooks(res.data);
      setMessage(res.data.length === 0 ? "No books found with that title." : "");
    } catch (err) {
      setBooks([]);
      setMessage("No books found with that title.");
    }
  };

  // Search by Author
  const handleSearchByAuthor = async () => {
    try {
      const res = await api.get(`/books/author/${searchAuthor}`);
      setBooks(res.data);
      setMessage(res.data.length === 0 ? "No books found for that author." : "");
    } catch (err) {
      setBooks([]);
      setMessage("No books found for that author.");
    }
  };

  return (
    <div className="books-container">
      <h2>Books</h2>

      {/* Add Book Form */}
      {role === "Admin" && (
      <form onSubmit={handleAddBook}>
        <input
          type="text"
          placeholder="ISBN (13 digits)"
          value={newBook.isbn}
          onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          required
        />
        <select
          value={newBook.category}
          onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
          required
        >
          <option value="Fiction">Fiction</option>
          <option value="Academic">Academic</option>
          <option value="Documentary">Documentary</option>
        </select>
        <input
          type="number"
          placeholder="Total Copies"
          value={newBook.totalCopies}
          onChange={(e) => setNewBook({ ...newBook, totalCopies: parseInt(e.target.value) || 1 })}
          min="1"
          required
        />
        <button type="submit">Add Book</button>
      </form>
      )}

      {/* Search by ID */}
      <div>
        <input
          type="text"
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={handleSearchById}>Search</button>
      </div>

      {/* Search by Category */}
      <div>
        <select
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Academic">Academic</option>
          <option value="Fiction">Fiction</option>
          <option value="Documentary">Documentary</option>
        </select>


        <button onClick={handleSearchByCategory}>Search</button>
      </div>

      {/* Search by Title */}
      <div>
        <input
          type="text"
          placeholder="Search by Title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <button onClick={handleSearchByTitle}>Search</button>
      </div>

      {/* Search by Author */}
      <div>
        <input
          type="text"
          placeholder="Search by Author"
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
        />
        <button onClick={handleSearchByAuthor}>Search</button>
      </div>

      {/* Reset / Show all books */}
      <div>
        <button
          onClick={() => {
            setMessage("");
            api.get("/books").then(res => setBooks(res.data));
          }}
        >
          Show All Books
        </button>
      </div>

      {/* Book List */}
      <ul>
        {books.map(b => (
          <li key={b.bookId}>
            {b.title} by {b.author} ({b.category}) — Available Copies: {b.availableCopies}
          </li>
        ))}
      </ul>

      <p>{message}</p>
    </div>
  );
}

export default Books;