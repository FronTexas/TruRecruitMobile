import _ from 'underscore';
import * as types from './types';
var RNFS = require('react-native-fs');

export function downloadProfilePic(attendeeID){
	return (dispatch,getState) => {
		const {firebaseRef} = getState();

		var storageRef = firebaseRef.storage().ref();
		var profPicRef = storageRef.child(`/attendees/${attendeeID}/profilePicture.jpg`);

		profPicRef.getDownloadURL()
		.then(
			(url) => {
				dispatch({
					type: types.PROFILE_PICTURE_DOWNLOADED,
					id:attendeeID,
					url
				})
			}
		)
		.catch((error) =>
		{
			console.log(`error = ${JSON.stringify(error)}`);
		})
	}
}

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
		const {firebaseRef,user,selected_event} = getState();

		dispatch({
			type: types.SELECT_SELECTED_ATTENDEE_ID, 
			selectedAttendeeID: attendeeID
		});

		firebaseRef.database()
		.ref('/attendees/' + attendeeID)
		.on('value', (snapshot) => {
			if (!snapshot) return;
			var sourceAttendee = snapshot.val();
			sourceAttendee.id = attendeeID
			firebaseRef.database()
			.ref(`/recruiters/${user.uid}/attendees/${selected_event.eventId}/${attendeeID}`)
			.on('value',(snapshot)=>{
				if (!snapshot){
					dispatch({
						type:types.SELECT_ATTENDEE,
						attendee:sourceAttendee
					});
					return;
				}
				var recruiterAttendee = snapshot.val();
				if(!recruiterAttendee){
					dispatch({
						type:types.SELECT_ATTENDEE,
						attendee:sourceAttendee
					});
					return;
				}
				var mergedAttendee = {
					email: sourceAttendee.email,
					name: sourceAttendee.name,
					links: sourceAttendee.links ? sourceAttendee.links : null,
					summary: sourceAttendee.summary,
					notes: recruiterAttendee.notes ? recruiterAttendee.notes : null,
					rating: recruiterAttendee.rating ? recruiterAttendee.rating : 0,
					scanned: recruiterAttendee.scanned ? recruiterAttendee.scanned : 0,
					id: attendeeID
				}
				dispatch({
					type: types.SELECT_ATTENDEE,
					attendee: mergedAttendee
				})
			})
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

export function notifyAttendee(attendee){
	return (dispatch,getState)=>{
		var {firebaseRef,user} = getState();

		firebaseRef.database()
		.ref(`attendees/${attendee.id}`)
		.once('value')
		.then((snap)=>{
			var current_attendee = snap.val();
			var recruiter_who_scanned_you = current_attendee.recruiter_who_scanned_you ? current_attendee.recruiter_who_scanned_you : [];
			if(!_.some(recruiter_who_scanned_you,(o)=>{return _.has(o,user.email)}))
			{
				recruiter_who_scanned_you.push({
					email:user.email,
					name: user.name, 
					company: user.company
				});
				current_attendee.recruiter_who_scanned_you = recruiter_who_scanned_you;
				var updates = {};
				updates[`/attendees/${attendee.id}` ] = current_attendee;
				firebaseRef.database().ref().update(updates);
			}
		});
	}
}

export function updateAttendees(attendees,recruitersAttendees){
	return {
		type: types.UPDATE_ATTENDEES,
		attendees: attendees,
		recruitersAttendees
	}
}