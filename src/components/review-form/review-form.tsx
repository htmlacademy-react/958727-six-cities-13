import { AuthorizationStatus, RatingTitles, ReviewLength } from '../../const';
import { ChangeEvent, useState } from 'react';
import RatingInput from '../rating-input/rating-input';

type ReviewFormProps = {
    authorizationStatus: string;
}

function ReviewForm(props: ReviewFormProps): JSX.Element | null {

  const { authorizationStatus } = props;
  const [ratingValue, setRatingValue] = useState(0);
  const [textValue, setTextValue] = useState('');

  const isSubmitDisabled = !ratingValue ||
  (textValue.length < ReviewLength.Min) ||
  (textValue.length > ReviewLength.Max);

  const handleRatingChange = (value: number): void => {
    setRatingValue(value);
  };
  const handleTextChange = (evt: ChangeEvent<HTMLTextAreaElement>): void => {
    setTextValue(evt.target.value);
  };

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return null;
  }

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
            Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {
          RatingTitles.map((item, index) => (
            <RatingInput
              key={item}
              onChange={handleRatingChange}
              defaultValue={RatingTitles.length - index}
              id={`${RatingTitles.length - index}-stars`}
              title={item}
            />
          ))
        }
      </div>
      <textarea
        onChange={handleTextChange}
        minLength={ReviewLength.Min}
        maxLength={ReviewLength.Max}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
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
