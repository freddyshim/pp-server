import _ from 'lodash';
import { UserDocument } from '../models/User';

export const areUsersEqual = (
  user: UserDocument,
  other: UserDocument
): boolean => {
  return _.isEqual(user, other);
};
