const API_URL = "https://gutendex.com/books";

async function fetchBooks(page = 1) {
  try {
    toggleLoader(true);
    const response = await fetch(`${API_URL}?page=${page}`);
    const data = await response.json();

    displayBooks(data?.results ?? []);
    setupPagination(data);

    // displayBooks(MOCK_BOOK_LIST);
  } catch (error) {
    console.error("Error fetching books:", error);
    displayBooks([]);
  } finally {
    toggleLoader(false);
  }
}

async function handleSearch(value) {
  try {
    toggleLoader(true);

    const url = !value
      ? `${API_URL}?page=1`
      : `${API_URL}?page=1&search=${value}`;

    const response = await fetch(url);
    const data = await response.json();
    const booksList = data?.results ?? [];

    displayBooks(booksList);
    setupPagination(data);
  } catch (error) {
    console.error("Error fetching books search:", error);
  } finally {
    toggleLoader(false);
  }
}

async function handleGenreFilter(e) {
  try {
    toggleLoader(true);

    const value = e.target?.value?.trim()?.toLowerCase();
    const url = !value
      ? `${API_URL}?page=1`
      : `${API_URL}?page=1&topic=${value}`;

    const response = await fetch(url);
    const data = await response.json();
    const booksList = data?.results ?? [];

    displayBooks(booksList);
    setupPagination(data);
  } catch (error) {
    console.error("Error fetching books search on genre:", error);
  } finally {
    toggleLoader(false);
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
    toggleLoader(true);

    const response = await fetch(`${API_URL}/${id}`);
    const book = await response.json();

    if (book.detail) throw new Error(book.detail);

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
    console.log("Error fetching book details:", error);
    detailsContainer.className = "error";
    detailsContainer.innerHTML =
      error ?? "Error fetching book details. Please try again later.";
  } finally {
    toggleLoader(false);
  }
}

async function fetchWishlistBooks() {
  const container = document.getElementById("wishlist-container");

  try {
    const wishList = getWishlist();

    if (wishList.length == 0) {
      displayBooks([], container);
      return;
    }

    toggleLoader(true);

    const response = await fetch(`${API_URL}?ids=${wishList.join()}`);
    const data = await response.json();

    displayBooks(data?.results ?? [], container);
  } catch (error) {
    console.error("Error fetching books:", error);
    displayBooks([], container);
  } finally {
    toggleLoader(false);
  }
}

function displayBooks(books, container) {
  const booksContainer =
    container ?? document.getElementById("books-container");
  booksContainer.innerHTML = ""; // Clear existing content

  if (books.length == 0) {
    booksContainer.className = "error";
    booksContainer.innerHTML = "No books found.";
    return;
  }

  books.forEach((book) => {
    const isInWishlist = checkIdInWishlist(book.id);
    const genre = book.bookshelves.join(", ") ?? "Not specified";

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

        <p class="author">
          By: ${book.authors.map((author) => author.name).join(", ")}
        </p>

        <p class="genre">
          Genre: ${
            genre?.length < 100
              ? genre
              : genre.substring(0, 100) +
                "..." +
                ` <a href="/book-details.html?id=${book.id}" class="">
                    Learn More
                  </a>`
          }
        </p>
      </div>

      
      <div class="action-wrapper" >
        <p class="book-id">ID: ${book.id}</p>
        <button class="wishlist-btn" data-book-id="${
          book.id
        }" aria-label="Add/remove wishlist" onclick="toggleWishlist(${
      book.id
    })"> ${isInWishlist ? "❤️" : "🤍"}</button>
      </div>
    `;
    booksContainer.appendChild(bookElement);
  });
}

function toggleLoader(isLoading) {
  const loader = document.getElementById("loader");

  const searchButton = document.getElementById("search-button");
  const genreFilter = document.getElementById("genre-filter");

  if (isLoading) {
    loader.style.top = "1rem";

    searchButton?.setAttribute("disabled", "disabled");
    genreFilter?.setAttribute("disabled", "disabled");
  } else {
    loader.style.top = "-15rem";

    searchButton?.removeAttribute("disabled");
    genreFilter?.removeAttribute("disabled");

    window.scrollTo({ top: 0, behavior: "instant" });
  }
}
