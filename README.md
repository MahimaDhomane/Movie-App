# Movie-App

The Movie App is a web-based application that allows users to search for movies, view search suggestions, and navigate to a details page for more information about a selected movie. The app fetches movie data from both a local JSON file and the OMDB API.

## Features

- **Movie Search**: Users can search for movies using the search bar. The app suggests movie titles as the user types.
- **Movie Details**: Clicking on a movie title will redirect you to a detailed view of the movie.
- **Pagination**: The homepage displays movies in a paginated format.
- **Local Movie Data**: A Python script fetches 100 movies from the OMDB API and stores them in `movies.json`.

## Project Structure

- `fetch_movies.py` - A Python script to fetch 100 movies from the OMDB API and save them to `movies.json`.
- `movies.json` - A file containing 100 pre-fetched movie records.
- `index.html` - The homepage displaying movies with pagination.
- `display.html` - A page for displaying detailed information about a selected movie.
- `style.css` - Styles for the website.
- `fetch.js` - Handles fetching movies from locally and displaying them on the homepage with pagination.
- `search.js` - Manages the search functionality and autocomplete suggestions.
- `display.js` - Handles displaying selected movies from the homepage and search bar their details dynamically.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript (Vanilla JS)
- **Backend**: Python (for fetching movies, no framework used)
- **API**: OMDB API

## How It Works

**Fetching Movies:**
1. The app loads a list of movies from movies.json on page load.
2. If a search term does not match any local movies, it queries the OMDB API.

**Autocomplete Search:**
1. When the user types in the search bar (at least 3 characters), matching movie titles are shown in a datalist.
2. Suggestions update dynamically based on the input.

**Movie Selection:**
1. Pressing Enter after typing a movie name fetches its details.
2. If the movie is found, the user is redirected to details.html?title=movieName.

## Setup Instructions

1. Clone this repository:
   ```sh
   git clone https://github.com/yourusername/movie-app.git
   ```
3. Navigate to the project folder:
   ```sh
   cd movie-app
   ```
5. Fetch movies by running the Python script:
   ```sh
   python fetch_movies.py
   ```
6. Open `index.html` in a web browser to use the application.
7. Ensure you have an active internet connection to fetch movie details from the OMDB API.

## API Usage

The app uses the OMDB API to fetch movie details. You need an API key to access it:
1. Replace API_key="your_api_key" in the JavaScript file with a valid OMDB API key.
2. Example API call:
  ```http://www.omdbapi.com/?apikey=your_api_key&s=movie_name```

## Acknowledgments

- OMDB API for providing movie data.

