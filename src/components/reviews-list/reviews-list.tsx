import { ReviewType } from '../types/review';
import Review from './../review/review';

type ReviewsListProps = {
  reviews: ReviewType[];
}

function ReviewsList(props: ReviewsListProps): JSX.Element {
  const { reviews } = props;
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <li key={review.id} className="reviews__item">
          <Review review={review}/>
        </li>
      ))}
    </ul>
  );
}

export default ReviewsList;

