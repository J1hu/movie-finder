import { useState } from "react";
import "./movie.css";

const API_KEY = "5d8d21c1";

function MovieSearch() {
	const [searched, setSearched] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [movies, setMovies] = useState([]);

	const handleSearch = async () => {
		const response = await fetch(
			`https://www.omdbapi.com/?apikey=${API_KEY}&type=movie&s=${searchTerm}`
		);
		const data = await response.json();
		setMovies(data.Search);
		setSearched(true);
	};

	return (
		<div className="movie-search">
			<div className="search-container">
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<button onClick={handleSearch}>Search</button>
			</div>
			{searched && movies.length === 0 ? (
				<p>No movies found.</p>
			) : (
				<div className="movie-grid">
					{movies.map((movie) => (
						<div key={movie.imdbID} className="movie-card">
							{movie.Poster !== "N/A" && (
								<img src={movie.Poster} alt={`${movie.Title} Poster`} />
							)}
							<div className="movie-info">
								<h3>{movie.Title}</h3>
								<p>{movie.Year}</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default MovieSearch;
