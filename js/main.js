document.addEventListener("DOMContentLoaded", () => {
  fetchBooks();
  setupEventListeners();
});

function setupEventListeners() {
  setupSearch();
  setupGenreFilter();
}
