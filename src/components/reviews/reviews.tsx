import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchReviews } from '../../store/api-actions';
import { getReviews, getReviewsError, getSortedReviews } from '../../store/reviews-data/selectors';
import { PlaceCardType } from '../../types/place-card';
import { Loader } from '../loader/loader';
import ReviewForm from '../review-form/review-form';
import ReviewsList from '../reviews-list/reviews-list';
import { getAuthorizationStatus } from './../../store/user-process/selectors';
import { useEffect } from 'react';

type ReviewsProps = {
    offerId: PlaceCardType['id'];
}

function Reviews({offerId}: ReviewsProps): JSX.Element {
  const reviews = useAppSelector(getReviews);
  const reviewsToShow = useAppSelector(getSortedReviews);
  const isLoading = useAppSelector(getReviewsError);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchReviews(offerId));
  }, [dispatch, offerId]);

  return (
    <>
      {isLoading && <Loader/>}
      {(!isLoading && !!reviews?.length) && (
        <section className="offer__reviews reviews">
          <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
          </h2>
          <ReviewsList reviews={reviewsToShow}/>
          <ReviewForm offerId={offerId} authorizationStatus={authorizationStatus}/>
        </section>
      )};
    </>
  );
}

export default Reviews;

