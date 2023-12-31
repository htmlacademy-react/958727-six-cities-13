import { RATING_AMPLIFIER } from '../../const';
import { formatDate } from '../../helpers/format-date';
import { ReviewType } from '../../types/review';

type ReviewsProps = {
    review: ReviewType;
  }

function Review({review}: ReviewsProps): JSX.Element {

  const date = new Date(review.date);

  return (
    <>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${review.rating * RATING_AMPLIFIER}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={review.date}>
          {`${formatDate(date)}`}
        </time>
      </div>
    </>

  );
}

export default Review;
