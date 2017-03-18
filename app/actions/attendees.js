import * as types from './types';
var RNFS = require('react-native-fs');


export function removeDownloadedResume(){
	return (dispatch,getState) => {
		dispatch({
			type:types.REMOVE_DOWNLOADED_RESUME,
		})
	}	
}

export function downloadResume(){
	return (dispatch,getState) => {
		const {firebaseRef, selectedAttendeeID} = getState();
		var storageRef = firebaseRef.storage().ref();
		var attendeeResumesRef = storageRef.child('attendees/' + selectedAttendeeID + '/resume.pdf');
		
		attendeeResumesRef.getDownloadURL()
		.then(
			(url) => {
				var rootLocation = RNFS.DocumentDirectoryPath + '/attendeePageResume/';
				RNFS.unlink(rootLocation).catch((error)=>{console.log(error)});
				RNFS.mkdir(rootLocation,{
					NSURLIsExcludedFromBackupKey: false	
				}).then(() => {
					var pdfLocation = rootLocation + `resume_${Date.now()}.pdf`
					var downloadOptions = {
						fromUrl: url,
						toFile: pdfLocation
					};
					RNFS.downloadFile(downloadOptions).promise.then(
						(downloadResult) => {
							dispatch({
								type: types.RESUME_DOWNLOADED,
								pdfLocation
							})
						}
				)	;
				})						
			}).catch(
				(error)=>{
					console.log(error)
				}
			)

	}
}

export function setSelectedAttendee(attendeeID){
	return (dispatch,getState) => {
		dispatch({
			type: types.SELECT_SELECTED_ATTENDEE_ID, 
			selectedAttendeeID: attendeeID
		});
		const {firebaseRef} = getState();
		firebaseRef.database()
		.ref('/attendees/' + attendeeID)
		.on('value', (snapshot) => {
			if (!snapshot) return
			dispatch({
				type:types.SELECT_ATTENDEE,
				attendee:snapshot.val()
			});	
		});
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
			var recruitersAttendees = snapshot.val();
			if(!recruitersAttendees) {
				dispatch(updateAttendees({},{}));
				return
			} 

			var resumeScanned = Object.keys(recruitersAttendees).length;
			selected_event.resumeScanned = resumeScanned
			var updates = {}
			updates['/recruiters/' + user.uid + '/events/' + selected_event.eventId] = selected_event
			firebaseRef.database().ref().update(updates)

			var attendeeIDs = Object.keys(recruitersAttendees);
			var attendees = {}
			attendeeIDs.forEach((attendeeID) => {
				firebaseRef.database()
				.ref('/attendees/' + attendeeID)
				.on('value', (snap) => {
					attendees[attendeeID] = snap.val();
					if(Object.keys(attendees).length == attendeeIDs.length){
						dispatch(updateAttendees(attendees,recruitersAttendees))
					}
				});
			});
		})

	}
}

export function updateAttendees(attendees,recruitersAttendees){
	return {
		type: types.UPDATE_ATTENDEES,
		attendees: attendees,
		recruitersAttendees
	}
}

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

export function selectAttendee(attendee){
	return (dispatch,getState) => 
	{
		dispatch({
			type:types.SELECT_ATTENDEE,
			attendee
		});
	}
}