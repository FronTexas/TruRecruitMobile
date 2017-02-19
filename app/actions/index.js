import * as EventActions from './events';
import * as AttendeeActions from './attendees';
import * as RecruiterActions from './recruiter';
import * as FirebaseActions from './firebaseRef';

export const ActionCreators = Object.assign({},
  EventActions,
  AttendeeActions,
  RecruiterActions,
  FirebaseActions
);

