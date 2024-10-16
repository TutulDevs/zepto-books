const booksPerPage = 32;

function setupPagination(data) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  if (!data || !data.count) return;

  const totalPages = Math.ceil(data.count / booksPerPage);
  const currentPage = getCurrentPage(data.next, data.previous) || totalPages;

  // Create pagination controls
  const paginationHTML = `
    <button id="first-page" ${
      currentPage === 1 ? "disabled" : ""
    } onclick="handlePagination(1)" aria-label="First page">${icons.fp}</button>
    <button id="previous-page" ${
      currentPage === 1 ? "disabled" : ""
    } onclick="handlePagination(${
    currentPage - 1
  })" aria-label="Previous page">${icons.pp}</button>
    <span>Page ${currentPage} of ${totalPages}</span>
    <button id="next-page" ${
      currentPage === totalPages ? "disabled" : ""
    } onclick="handlePagination(${currentPage + 1})" aria-label="Next page">${
    icons.np
  }</button>
    <button id="last-page" ${
      currentPage === totalPages ? "disabled" : ""
    } onclick="handlePagination(${totalPages})" aria-label="Last page">${
    icons.lp
  }</button>
  `;

  paginationContainer.innerHTML = paginationHTML;
}

function getCurrentPage(nextUrl, previousUrl) {
  if (!previousUrl) return 1;
  if (!nextUrl) return null;

  const urlParams = new URLSearchParams(new URL(nextUrl).search);
  return parseInt(urlParams.get("page")) - 1;
}

function handlePagination(page) {
  fetchBooks(page);
}

function getPageFromUrl(url) {
  if (!url) return null;
  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams.get("page");
}

const icons = {
  fp: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-left"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>`,
  lp: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-right"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>`,
  pp: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>`,
  np: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>`,
};
