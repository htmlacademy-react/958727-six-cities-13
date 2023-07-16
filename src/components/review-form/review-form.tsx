import { AuthorizationStatus, RatingTitles, ReviewLength } from '../../const';
import { ChangeEvent, useCallback, useState } from 'react';

type ReviewFormProps = {
    authorizationStatus: string;
}

type RatingInputProps = {
    onChange: (value: number) => void;
    defaultValue: number;
    id: string;
    title: string;
}

function RatingInput(props: RatingInputProps): JSX.Element {
  const {
    onChange,
    defaultValue,
    id ,
    title
  } = props;

  const handleInputChange = useCallback(() => onChange(defaultValue), [defaultValue, onChange]);


  return (
    <>
      <input
        onChange={handleInputChange}
        className="form__rating-input visually-hidden"
        name="rating"
        defaultValue={defaultValue}
        id={id}
        type="radio"
      />
      <label
        htmlFor={id}
        className="reviews__rating-label form__rating-label"
        title={title}
      >
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </>
  );
}

function ReviewForm(props: ReviewFormProps): JSX.Element | null {

  const { authorizationStatus } = props;
  const [ratingValue, setRatingValue] = useState(0);
  const [textValue, setTextValue] = useState('');

  const onRatingChange = (value: number): void => {
    setRatingValue(value);
  };
  const handleTextChange = (evt: ChangeEvent<HTMLTextAreaElement>): void => {
    setTextValue(evt.target.value);
  };

  return (
    authorizationStatus === AuthorizationStatus.Auth ?
      <form className="reviews__form form" action="#" method="post">
        <label className="reviews__label form__label" htmlFor="review">
            Your review
        </label>
        <div className="reviews__rating-form form__rating">
          {
            [...RatingTitles.keys()].reverse().map((item) => (
              <RatingInput
                key={item}
                onChange={onRatingChange}
                defaultValue={item + 1}
                id={`${item + 1}-stars`}
                title={RatingTitles[item + 1]}
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
            disabled={
              !ratingValue ||
                (textValue.length < ReviewLength.Min) ||
                (textValue.length > ReviewLength.Max)
            }
          >
            Submit
          </button>
        </div>
      </form> : null
  );
}

export default ReviewForm;
