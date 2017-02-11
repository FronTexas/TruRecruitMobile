import * as types from './types';

export function dispatchNewAttendee(attendee){
	return (dispatch,getState) => {
		return saveNewAttendee(attendee);
	}
}

export function saveNewAttendee(attendee){
	return {
		type: types.SAVE_NEW_ATTENDEE,
		attendee:attendee
	}
}