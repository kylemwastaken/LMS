import React, { useEffect, useState } from "react";
import api from "../services/api";

function Books() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "", category: "" });
  const [searchId, setSearchId] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [message, setMessage] = useState("");

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
      setBooks([...books, res.data]); // append new book to list
      setNewBook({ title: "", author: "", category: "" });
    } catch (err) {
      setMessage("Failed to add book.");
    }
  };

  // Search by ID
  const handleSearchById = async () => {
    try {
      const res = await api.get(`/books/${searchId}`);
      setBooks([res.data]); // show only the searched book
    } catch (err) {
      setMessage("Book not found.");
    }
  };

  // Search by Category
  const handleSearchByCategory = async () => {
    try {
      const res = await api.get(`/books/category/${searchCategory}`);
      setBooks(res.data);
    } catch (err) {
      setMessage("No books found for this category.");
    }
  };

  return (
    <div>
      <h2>Books</h2>

      {/* Add Book Form */}
      <form onSubmit={handleAddBook}>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newBook.category}
          onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
        />
        <button type="submit">Add Book</button>
      </form>

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
        <input
          type="text"
          placeholder="Search by Category"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />
        <button onClick={handleSearchByCategory}>Search</button>
      </div>

      {/* Book List */}
      <ul>
        {books.map(b => (
          <li key={b.bookId}>
            {b.title} by {b.author} ({b.category})
          </li>
        ))}
      </ul>

      <p>{message}</p>
    </div>
  );
}

export default Books;
