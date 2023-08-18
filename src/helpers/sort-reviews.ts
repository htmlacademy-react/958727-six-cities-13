import { ReviewType } from '../types/review';

export const sortReviews = (reviews: ReviewType[]): ReviewType[] => reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
