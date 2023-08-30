import { AuthorizationStatus, RatingTitles, ReviewLength } from '../../const';
import { ChangeEvent, useState, FormEvent, useCallback } from 'react';
import RatingInput from '../rating-input/rating-input';
import { PlaceCardType } from '../../types/place-card';
import { fetchPostReview } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsReviewSending } from '../../store/reviews-data/selectors';

type ReviewFormProps = {
    authorizationStatus: string;
    offerId: PlaceCardType['id'];
}

function ReviewForm(props: ReviewFormProps): JSX.Element | null {

  const { offerId, authorizationStatus } = props;
  const isFormSending = useAppSelector(getIsReviewSending);
  const [ratingValue, setRatingValue] = useState(0);
  const [textValue, setTextValue] = useState('');

  const isSubmitDisabled = !ratingValue ||
  (textValue.length < ReviewLength.Min) ||
  (textValue.length > ReviewLength.Max) ||
  isFormSending;

  const dispatch = useAppDispatch();

  const handleRatingChange = useCallback((evt:ChangeEvent<HTMLInputElement>): void => {
    setRatingValue(Number(evt.target.value));
  }, []);

  const handleTextChange = (evt: ChangeEvent<HTMLTextAreaElement>): void => {
    setTextValue(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const reviewData = {
      comment: textValue,
      rating: ratingValue,
    };
    dispatch(fetchPostReview({reviewData, id: offerId}));
    setRatingValue(0);
    setTextValue('');
  };

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="reviews__form form"
      action="#"
      method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">
            Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {
          RatingTitles.map((item, index) => (
            <RatingInput
              key={item}
              onChange={handleRatingChange}
              isChecked={ratingValue === RatingTitles.length - index}
              value={RatingTitles.length - index}
              id={`${RatingTitles.length - index}-stars`}
              title={item}
              disabled={isFormSending}
            />
          ))
        }
      </div>
      <textarea
        onChange={handleTextChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={textValue}
        disabled={isFormSending}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
            To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your
            stay with at least{' '}
          <b className="reviews__text-amount">{ReviewLength.Min} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
            Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
