import { StatusCodeMap } from '../const';

export const shouldDisplayError = (status: number) => !!StatusCodeMap[status];
