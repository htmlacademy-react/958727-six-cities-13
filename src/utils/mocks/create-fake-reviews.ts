import { name, datatype, system, date, lorem } from 'faker';
import { ReviewType } from '../../types/review';

export const createFakeReviews = (): ReviewType[] =>
  new Array(5).fill(null).map(
    () =>
      ({
        id: datatype.uuid(),
        date: date.past().toDateString(),
        user: {
          name: `${name.firstName()} ${name.lastName()}`,
          avatarUrl: system.filePath(),
          isPro: datatype.boolean(),
        },
        comment: lorem.paragraph(),
        rating: datatype.number(3),
      } as ReviewType)
  );

export const createFakeReview = (): ReviewType =>
  ({
    id: datatype.uuid(),
    date: date.past().toDateString(),
    user: {
      name: `${name.firstName()} ${name.lastName()}`,
      avatarUrl: system.filePath(),
      isPro: datatype.boolean(),
    },
    comment: lorem.paragraph(),
    rating: datatype.number(3),
  } as ReviewType);
