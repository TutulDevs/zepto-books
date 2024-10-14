# Zepto Books

## Project Requirements

- ✅ Fetch data from the following public API: https://gutendex.com/books. For API Documentations visit - https://gutendex.com/
- ✅ Display the list of books in a clean and user-friendly format.
- ✅ Each book should display the title, author, cover image, author name, genre and id.
- Functionalities:
  - ✅ Implement a search bar that allows users to filter books by title in real-time.
  - Add a dropdown filter to filter books based on genre/topic.
  - Make a wishlist and store to localstorage, wishlisted books should have a love or liked icon. Make the icon clickable to save/remove as a wishlist.
  - Make pagination to paginate the books list, For example (next page, previous page) or (1, 2, 3….8) pagination.
- User Interface:
  - Make a homepage that will show the books list, a wishlist page that will show the wishlisted books list and each book page that will show the book details.
  - Make a navbar.
  - Design the layout using HTML and CSS.
  - Ensure that the application is fully responsive and works well on both desktop and mobile devices.
  - Use Bootstrap or Tailwind CSS to style the application. But vanilla css will be more preferable.
- Optional Bonus Features: (Not Required but Encouraged)
  - Implement smooth animations for showing or hiding books.
  - Use localStorage to save the user’s search and filter preferences so they persist when the page is refreshed.

## To-Do

- search on delay
- error handling with a box of text for 1 second

## Tech Stack

- HTML
- CSS
- JavaScript

## Steps

- HTML Structure:
  - Homepage: Displays the list of books.
  - Navbar: Contains links to Home, Wishlist.
  - Wishlist Page: Shows wishlisted books.
  - Book Details Page: Displays details of a single book.
- API Fetching:
  - Use fetch() to get data from the Gutendex API.
  - Extract title, author, cover image, genres, and id from the response.
- Functionalities:
  - Search Bar: Filters books by title in real-time with input event listeners.
  - Genre Filter: Dropdown for filtering by genre.
  - Wishlist: Save books to localStorage with clickable icons.
  - Pagination: Implement logic for next/previous pages.
- Styling:
  - Use vanilla CSS for responsiveness and styling.
  - Add media queries for mobile responsiveness.

## Getting Started

1. Clone this repository
2. Open `index.html` in your web browser

## Project Structure

- `index.html`: Main page displaying the book list
- `wishlist.html`: Page displaying wishlisted books
- `book-details.html`: Page displaying details of a single book
- `css/styles.css`: Styles for the application
- `js/`: Directory containing JavaScript files
  - `main.js`: Main application logic
  - `api.js`: Functions for interacting with the Gutendex API
  - `search.js`: Search and filter functionality
  - `wishlist.js`: Wishlist management
  - `pagination.js`: Pagination functionality
