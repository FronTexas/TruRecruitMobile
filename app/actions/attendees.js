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

export function listenToAttendeesChanges(){
	return (dispatch,getState) => {
		const { firebaseRef, user , selected_event } = getState();
		firebaseRef.database()
		.ref('/recruiters/' + user.uid + '/attendees/' + selected_event.eventId)
		.on('value', (snapshot) => {
			dispatch(updateAttendees(snapshot.val()))
		})
	}
}

export function updateAttendees(attendees){
	return {
		type: types.UPDATE_ATTENDEES,
		attendees: attendees
	}
}