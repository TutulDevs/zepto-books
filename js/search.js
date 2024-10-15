function setupSearch() {
  const searchForm = document.getElementById("search-form");
  searchForm.addEventListener("submit", handleSearchSubmit);
}

function setupGenreFilter() {
  const genreFilter = document.getElementById("genre-filter");
  genreFilter.addEventListener("change", handleGenreFilter);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput?.value?.trim()?.toLowerCase() ?? "";

  handleSearch(searchTerm);
}
