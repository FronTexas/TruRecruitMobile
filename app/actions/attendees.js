import * as types from './types';

export function saveNotes(notes){
	return (dispatch,getState) => {
		const { user, selected_event, selectedAttendee } = getState();
		var modifiedSelectedAttendee = {...selectedAttendee};
		modifiedSelectedAttendee["notes"] = notes; 
		dispatch({
			type:types.SELECT_ATTENDEE,
			attendee: modifiedSelectedAttendee
		});
	}	
}

export function fetchSelectedAttendee(attendeeID){
	return (dispatch,getState) => {
		const {firebaseRef} = getState();
		firebaseRef.database()
		.ref('/attendees/' + attendeeID)
		.on('value', (snapshot) => {
			if (!snapshot) return
			dispatch(selectAttendee(snapshot.val()))
		});
	}
}

export function setSelectedAttendeeId(id){
		return {
			type: types.SELECT_SELECTED_ATTENDEE_ID, 
			selectedAttendeeId: id
		}
}

export function saveNewAttendee(attendee){
	return (dispatch,getState) => {
		const { firebaseRef, user, selected_event } = getState();
		var updates = {}
		updates['/recruiters/' 
		+ user.uid 
		+ '/attendees/'
		+ selected_event.eventId 
		+ '/' 
		+ attendee.id] = attendee
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