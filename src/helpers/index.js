import { getEntityName } from './deleteModalHelper';
import { formatDate } from './formatDate';
import { getColorByPriority } from './getColorByPriority';
import { dbDate, toodayDate, isToday } from './isToday';
import {
  succesMessage,
  nameCheckerError,
  succesRegistrationMessage,
  failedRegistrationMessage,
  failedLogin,
} from './notiflix';
import { setUserPlaceholder } from './setUserPlaceholder';
import { sortByCreatedAt } from './sortByCreatedAt';
import { getDragingColorByPriority } from './getDragingColorByPriority';

export {
  setUserPlaceholder,
  sortByCreatedAt,
  dbDate,
  isToday,
  toodayDate,
  getColorByPriority,
  formatDate,
  getEntityName,
  succesMessage,
  nameCheckerError,
  succesRegistrationMessage,
  failedRegistrationMessage,
  getDragingColorByPriority,
  failedLogin,
};
