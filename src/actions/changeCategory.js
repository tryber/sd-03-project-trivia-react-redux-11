import { CHANGE_CATEGORY } from './types';

const changeCategory = (payload) => ({
  type: CHANGE_CATEGORY,
  payload,
});

export default changeCategory;
