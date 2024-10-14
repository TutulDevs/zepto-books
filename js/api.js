const API_URL = "https://gutendex.com/books";

// API related functions
async function fetchBooks(page = 1) {
  try {
    const response = await fetch(`${API_URL}?page=${page}`);
    const data = await response.json();

    displayBooks(data?.results ?? []);
    setupPagination(data);

    // displayBooks(MOCK_BOOK_LIST);
  } catch (error) {
    console.error("Error fetching books:", error);
    displayBooks([]);
  }
}

function displayBooks(books) {
  const booksContainer = document.getElementById("books-container");
  booksContainer.innerHTML = ""; // Clear existing content

  books.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.className = "book";
    bookElement.innerHTML = `
      <div class="book-image">  
        <img src="${
          book.formats["image/jpeg"] || "path/to/default-cover.jpg"
        }" alt="${book.title} cover">
      </div>

      <div class="book-details">
        <h3 class="book-title">
          <a href="/book-details.html?id=${book.id}" class="book-title-link">${
      book.title
    }</a>
        </h3>
        <p class="author">By: ${book.authors
          .map((author) => author.name)
          .join(", ")}</p>
        <p class="genre">Genre: ${
          book.bookshelves.join(", ") || "Not specified"
        }</p>
        <p class="book-id">ID: ${book.id}</p>
      </div>

      <button class="wishlist-btn" onclick="addToWishlist(${
        book.id
      })">Add to Wishlist</button>
    `;
    booksContainer.appendChild(bookElement);
  });
}

async function handleSearch(e) {
  try {
    const value = e.target?.value?.trim()?.toLowerCase();

    const response = await fetch(`${API_URL}?search=${value}`);
    const data = await response.json();
    const booksList = data?.results ?? [];

    displayBooks(booksList);
  } catch (error) {
    console.error("Error fetching books search:", error);
  }
}

async function getBookDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const detailsContainer = document.getElementById("book-details");
  detailsContainer.innerHTML = "";

  if (!id) {
    detailsContainer.className = "error";
    detailsContainer.innerHTML = "No book selected.";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`);
    const book = await response.json();

    detailsContainer.innerHTML = `
      <div class="book-detail">
        <div class="book-image">  
          <img src="${
            book.formats["image/jpeg"] || "path/to/default-cover.jpg"
          }" alt="${book.title} cover">
        </div>
        <div class="book-info">
          <h2 class="book-title">${book.title}</h2>
          <p class="author">By: ${book.authors
            .map((author) => author.name)
            .join(", ")}</p>
          <p class="genre">Genre: ${
            book.bookshelves.join(", ") || "Not specified"
          }</p>
          <p class="book-id">ID: ${book.id}</p>
          <p class="language">Language: ${book.languages.join(", ")}</p>
          <p class="download-count">Download Count: ${book.download_count}</p>
          <div class="book-links">
            <h3>Download:</h3>
            <ul>
              ${Object.entries(book.formats)
                .filter(([format]) => !format.includes("image"))
                .map(
                  ([format, url]) =>
                    `<li><a href="${url}" target="_blank">${format}</a></li>`
                )
                .join("")}
            </ul>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error fetching book details:", error);
    detailsContainer.className = "error";
    detailsContainer.innerHTML =
      "Error fetching book details. Please try again later.";
  }
}
