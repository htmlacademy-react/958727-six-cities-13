import { UserType } from './user';

export type ReviewType = {
    id: string;
    date: string;
    user: UserType;
    comment: string;
    rating: number;
};

export type PostReviewType = Pick<ReviewType, 'comment' | 'rating'>
