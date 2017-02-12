import * as types from './types';

export function dispatchNewAttendee(attendee){
	return (dispatch,getState) => {
		dispatch({
			type: types.SAVE_NEW_ATTENDEE,
			attendee: attendee, 
			event_id: getState().selected_event.event_id		
		});
	}
}