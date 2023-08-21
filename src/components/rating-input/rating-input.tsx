type RatingInputProps = {
    onChange: (value: number) => void;
    defaultValue: number;
    id: string;
    title: string;
}

function RatingInput (props: RatingInputProps): JSX.Element {
  const {
    onChange,
    defaultValue,
    id ,
    title
  } = props;

  const handleInputChange = () => onChange(defaultValue);


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

export default RatingInput;
