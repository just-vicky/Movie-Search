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
        <form className="form" onSubmit={this.searchMovies}>
          <label className="label" htmlFor="query">
            Movie Name
          </label>
          <input
            className="input"
            type="text"
            name="query"
            placeholder="i.e. Jurassic Park"
            value={this.state.query}    
            onChange={(e) => this.setState({ query: e.target.value })}
          />
          <button className="button" type="submit">
            Search
          </button>
        </form>
      </>
    );
  }
}
