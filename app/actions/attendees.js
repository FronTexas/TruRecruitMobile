import * as types from './types';

export function saveNewAttendee(attendee){
	return (dispatch,getState) => {
		const { firebaseRef, user, selected_event } = getState();

		const attendee_generated_id = attendee.id ? attendee.id : firebaseRef.database()
		.ref('/recruiters/' + user.uid + '/attendees/' + selected_event.eventId)
		.push().key

		attendee.id = attendee_generated_id;

		var updates = {}
		updates['/recruiters/' 
		+ user.uid 
		+ '/attendees/'
		+ selected_event.eventId 
		+ '/' 
		+ attendee_generated_id] = attendee

		firebaseRef.database().ref().update(updates)
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