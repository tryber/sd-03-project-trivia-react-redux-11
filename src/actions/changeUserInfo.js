import { CHANGE_USER_INFO } from './types';

const actionName = (name, gravatarEmail) => ({
  type: CHANGE_USER_INFO,
  name,
  gravatarEmail,
});

export default actionName;
