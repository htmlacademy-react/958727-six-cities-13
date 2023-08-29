import { ChangeEvent } from 'react';

type RatingInputProps = {
    onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
    value: number;
    id: string;
    title: string;
    isChecked: boolean;
    disabled: boolean;
}

function RatingInput (props: RatingInputProps): JSX.Element {
  const {
    onChange,
    value,
    id ,
    title,
    isChecked,
    disabled = false,
  } = props;

  return (
    <>
      <input
        onChange={onChange}
        className="form__rating-input visually-hidden"
        name="rating"
        checked={isChecked}
        value={value}
        id={id}
        type="radio"
        disabled={disabled}
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

export default RatingInput;
