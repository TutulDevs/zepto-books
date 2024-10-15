function toggleWishlist(bookId) {
  let wishList = getWishlist();

  if (!wishList.includes(bookId)) {
    wishList.push(bookId);
  } else {
    wishList = wishList.filter((id) => id !== bookId);
  }

  saveWishlist(wishList);
  window.location.reload();
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
