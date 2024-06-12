import React, { Component } from "react";

export default class SearchMovies extends Component {
  state = {
    query: "",
    movies: [],
  };

  searchMovies = async (e) => {
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&query=${this.state.query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      this.setState({ movies: data.results });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <>
        <form
          className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-6"
          onSubmit={this.searchMovies}
        >
          <div>
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="query"
            >
              Movie Name
            </label>
            <input
              className="block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="text"
              name="query"
              placeholder="i.e. Jurassic Park"
              value={this.state.query}
              onChange={(e) => this.setState({ query: e.target.value })}
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
            type="submit"
          >
            Search
          </button>
        </form>
        <div className=" p-6">
          {this.state.movies
            .filter((movie) => movie.poster_path)
            .map((movie) => (
              <div
                className="bg-white shadow-md rounded-lg overflow-hidden flex my-6"
                key={movie.id}
              >
                <img
                  className=" h-64 object-cover"
                  src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    <small>RELEASE DATE: {movie.release_date}</small>
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <small>RATING: {movie.vote_average}</small>
                  </p>
                  <p className="text-gray-700 text-base">{movie.overview}</p>
                </div>
              </div>
            ))}
        </div>
      </>
    );
  }
}
