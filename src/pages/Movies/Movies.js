// import MovieDetails from '../movieDetails/MovieDetails';
import { useState, useEffect } from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import NonExisting from 'pages/NotExisting/NonExisting';

import DefaultPoster from '../../images/default_poster.jpg';
import axios from 'axios';
import style from './movies.module.css';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [totalMovies, setTotalMovies] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();

  const searchQuery = searchParams.get('query');
  console.log(searchQuery);

  const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
  const API_KEY = '14b16a10583a3d9315723a356100e4ad';

  useEffect(() => {
    const fetchMovies = async () => {
      if (!searchQuery) {
        return;
      }

      try {
        setLoading(true);
        const moviesList = await fetchByQuery(searchQuery, currentPage);
        setMovies(moviesList);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchMovies();
  }, [searchQuery, currentPage]);

  const handleSubmit = e => {
    e.preventDefault();
    const searchValue = e.target.query.value;
    console.log(searchValue);
    setSearchParams({
      query: searchValue,
    });
    // setTotalMovies(0);
    setCurrentPage(1);
  };

  const onPageUpload = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  const fetchByQuery = async (query, page = 1) => {
    setLoading(true);

    return await axios
      .get(
        `${BASE_URL}?api_key=${API_KEY}&query=${query}&page=${page}&per_page=40`
      )
      .then(({ data }) => data.results)
      .catch(error => {
        setError(true);
        setLoading(false);
      });
  };

  const showBtn = !loading && movies.length > 20;

  return (
    <div className={style.add}>
      <form className={style.search_form}>
        <input
          type="text"
          className={style.input_field}
          name="query"
          onChange={handleSubmit}
          required
        ></input>
        <button type="submit" className={style.search_btn}>
          Search
        </button>
      </form>
      {error && <NonExisting />}
      {loading && <Loader />}
      <ul className={style.searched_list}>
        {movies.length > 0 &&
          movies.map(movie => (
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              state={{ from: location }}
              className={style.movie_item}
            >
              <div className={style.item}>
                <img
                  src={
                    movie.poster_path === null
                      ? DefaultPoster
                      : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  }
                  alt={movie.title}
                  style={{ height: 250 }}
                />
                <h2 className={style.movie_title}>{movie.title}</h2>
              </div>
            </Link>
          ))}
      </ul>
      {showBtn && (
        <button type="submit" className={style.load_btn} onClick={onPageUpload}>
          Load more
        </button>
      )}
    </div>
  );
};

export default Movies;
