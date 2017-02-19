import * as EventActions from './events';
import * as AttendeeActions from './attendees';
import * as RecruiterActions from './recruiter';

export const ActionCreators = Object.assign({},
  EventActions,
  AttendeeActions,
  RecruiterActions
);

