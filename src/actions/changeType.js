import { CHANGE_TYPE } from './types';

const changeType = (payload) => ({
  type: CHANGE_TYPE,
  payload,
});

export default changeType;
