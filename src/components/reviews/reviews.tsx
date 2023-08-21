import { useAppSelector } from '../../hooks';
import { getSortedReviews } from '../../store/reviews-data/selectors';
import ReviewForm from '../review-form/review-form';
import ReviewsList from '../reviews-list/reviews-list';
import { getAuthorizationStatus } from './../../store/user-process/selectors';
import { ReviewType } from '../../types/review';
import { PlaceCardType } from '../../types/place-card';

type ReviewsProps = {
    reviews: ReviewType[];
    offerId: PlaceCardType['id'];
}

function Reviews({reviews, offerId}: ReviewsProps): JSX.Element {
  const reviewsToShow = useAppSelector(getSortedReviews);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <>
      {!!reviews?.length && (
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
