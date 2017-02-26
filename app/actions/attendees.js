import * as types from './types';

export function saveNotes(notes){
	return (dispatch,getState) => {
		const { firebaseRef, user, selected_event, selectedAttendee } = getState();
		selectedAttendee["notes"] = notes 
		var updates = {}
		updates['/recruiters/' 
		+ user.uid 
		+ '/attendees/'
		+ selected_event.eventId 
		+ '/' 
		+ selectedAttendee.id] = selectedAttendee	
		firebaseRef.database().ref().update(updates)
	}	
}

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
			var attendees = snapshot.val();
			if(!attendees) return 

			var resumeScanned = Object.keys(attendees).length;
			selected_event.resumeScanned = resumeScanned
			var updates = {}
			updates['/recruiters/' + user.uid + '/events/' + selected_event.eventId] = selected_event
			firebaseRef.database().ref().update(updates)
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

export function selectAttendee(attendee){
	return (dispatch,getState) => {
		dispatch({
			type:types.SELECT_ATTENDEE,
			attendee
		});
	}
}