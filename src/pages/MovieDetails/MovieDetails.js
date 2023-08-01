import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';

import { fetchMovieById } from 'services/ApiServices';
import { setIsLoading } from 'redux/movieDetailsReducer';
import { getPoster } from 'services/ApiServices';
import Loader from 'components/Loader/Loader';

import style from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const lastQueryReference = useRef('/movies');

  // const [movie, setMovie] = useState([]);
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const movie = useSelector(state => {
    console.log('state', state);
    return state.movie.movie;
  });
  const loading = useSelector(state => {
    return state.movie.isLoading;
  });
  const error = useSelector(state => {
    return state.movie.error;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    // setLoading(true);
    dispatch(setIsLoading(true));
    fetchMovieById(movieId)
      .then(res => {
        // setMovie(res.data);
        dispatch({type: "movie/setMovieDetails", payload: res.data});
        // setLoading(false);
        dispatch(setIsLoading(false));
      })
      .catch(error => {
        // setError(true);
        dispatch({type: "movie/setError", payload: true })
        // setLoading(false);
        dispatch(setIsLoading(false));
      });
  }, [movieId, dispatch]);

  useEffect(() => {
    if(location.state && location.state.from) {
      lastQueryReference.current = location.state.from;
    }
  }, [location.state]);
  return (
    <div style={{ marginLeft: 10 }}>
      <Link to={lastQueryReference.current}>
        <button type="button" className={style.back_btn}>Go back</button>
      </Link>

      {/* Добавьте условие для проверки, что movie не равно null */}
      {movie !== null ? (
        <>
          {/* Отобразите содержимое фильма */}
          <div className={style.movie}>
            <img
              className={style.image}
              src={getPoster(movie)}
              alt={movie.title}
              width={100}
              height={150}
            />
            <div style={{ marginLeft: 20 }}>
              <h2 className={style.movie_title}>
                {movie.title}{' '}
                {movie.release_date && `(${movie.release_date.slice(0, 4)})`}
              </h2>
              <h3 className={style.details}>User score: {movie.vote_average}</h3>
              <h2 className={style.title}>Overview </h2>
              <h3 className={style.details}>{movie.overview}</h3>
              <h2 className={style.title}>Genres </h2>
              <h3 className={style.details}>
                {Array.isArray(movie.genres)
                  ? movie.genres.map(genre => genre.name).join(', ')
                  : null}
              </h3>
            </div>
          </div>

          {/* Отобразите ссылки и точки входа */}
          <h2 className={style.additional_title}>
            Additional information
          </h2>
          <ul className={style.link_list}>
            <li>
              <Link to="cast" >Cast</Link>
            </li>
            <li>
              <Link to="reviews" >Reviews</Link>
            </li>
          </ul>
          <Outlet />
        </>
      ) : (
        // Отобразите загрузчик или другое сообщение, если movie равно null
        loading ? (<Loader />) : (<p>Movie not found.</p>)
      )}
    </div>
  );

  // return (
  //   <div style={{ marginLeft: 10 }}>
  //     <Link to={lastQueryReference.current}>
  //       <button type="button" className={style.back_btn}>Go back</button>
  //     </Link>

  //     {loading ? (<Loader />) : (
  //       <div className={style.movie}>
  //         <img
  //           className={style.image}
  //           src={getPoster(movie)}
  //           alt={movie.title}
  //           width={100}
  //           height={150}
  //         />
  //         <div style={{ marginLeft: 20 }}>
  //           <h2 className={style.movie_title}>
  //             {movie.title}{' '}
  //             {movie.release_date && `(${movie.release_date.slice(0, 4)})`}
  //           </h2>
  //           <h3 className={style.details}>User score: {movie.vote_average}</h3>
  //           <h2 className={style.title}>Overview </h2>
  //           <h3 className={style.details}>{movie.overview}</h3>
  //           <h2 className={style.title}>Genres </h2>
  //           <h3 className={style.details}>
  //             {Array.isArray(movie.genres)
  //               ? movie.genres.map(genre => genre.name).join(', ')
  //               : null}
  //           </h3>
  //         </div>
  //       </div>
  //     )}
  //     {error && <p>Error occurred while fetching reviews.</p>}

  //     <h2 className={style.additional_title}>
  //       Additional information
  //     </h2>
  //     <ul className={style.link_list}>
  //       <li>
  //         <Link to="cast" >Cast</Link>
  //       </li>
  //       <li>
  //         <Link to="reviews" >Reviews</Link>
  //       </li>
  //     </ul>
  //     <Outlet />
  //   </div>
  // );
};

export default MovieDetails;

