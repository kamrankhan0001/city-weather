
import React, { useState } from "react";
//import "./MovieSearch.css";
import "./App.css"

const API_KEY = "379f442c"; // key Generated from OMDb Api

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setError(null);// Clear any previous errors

    if (!query.trim()) {
      setError("Invalid movie name. Please try again.");
      setMovies([]); // Clear movie list
      return;
    }

    try {
      // Fetch movie data from the OMDb API
      const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      const data = await response.json();
  // Check if the response was successful
      if (data.Response === "True") {
        setMovies(data.Search);// Update the movie list with search results
      } else {
        setError("No results found.");
        setMovies([]); // Clear movie list
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      setMovies([]);// Clear movie list
    }
  };

  return (
    <div className="movie-search">
      <div className="search-container">
        <input
          type="text"
          className="search"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie" key={movie.imdbID}>
            <img
              className="poster"
              src={movie.Poster !== "N/A" ? movie.Poster : "placeholder.png"}
              alt={`${movie.Title} Poster`}
            />
            <div className="movie-details">
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;

