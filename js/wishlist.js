function toggleWishlist(bookId) {
  let wishList = getWishlist();

  const button = document.querySelector(`[data-book-id="${bookId}"]`);

  if (!wishList.includes(bookId)) {
    wishList.push(bookId);
    button.innerHTML = "❤️";
  } else {
    wishList = wishList.filter((id) => id !== bookId);
    button.innerHTML = "🤍";
  }

  saveWishlist(wishList);
  // window.location.reload();
}

function saveWishlist(wishlist) {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function checkIdInWishlist(bookId) {
  const wishList = getWishlist();
  return wishList.includes(bookId);
}
