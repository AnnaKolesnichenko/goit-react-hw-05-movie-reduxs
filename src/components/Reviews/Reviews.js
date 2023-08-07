import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

// import { fetchReviews } from 'services/ApiServices';
import Loader from 'components/Loader/Loader';

import style from './Reviews.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewsThunk } from 'redux/commentsReducer';

const Reviews = () => {
  const dispatch = useDispatch();
  const reviews = useSelector(state => {
    console.log(state);
    return state.reviews.reviews;
  });
  const loading = useSelector(state => state.reviews.isLoading);
  const error = useSelector(state => state.reviews.error);
  // const {comments, isLoading, error} = useSelector(state => state.comments);

  const { movieId } = useParams();

  // const [reviews, setReviews] = useState([]);
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    // setLoading(true);
    // fetchReviews(movieId)
    //   .then(res => {
    //     setReviews(res.data.results);
    //     setLoading(false);
    //   })
    //   .catch(error => {
    //     setError(true);
    //     setLoading(false);
    // });
    dispatch(fetchReviewsThunk(movieId));
  }, [movieId, dispatch]);

  return (
    <div className={style.reviews}>
      {loading ? (
        <Loader />
      ) : (
        <ul className={style.items}>
          {reviews &&
            reviews.data.results.map(review => (
              <li key={review.id} className={style.item}>
                <h2 className={style.author}>Author: {review.author}</h2>
                <p className={style.details}>{review.content}</p>
              </li>
            ))}
        </ul>
      )}
      {error && <p>There are no reviews to this movie.</p>}
    </div>
  );
};

export default Reviews;
