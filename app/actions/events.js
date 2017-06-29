import * as types from './types';
import {zip} from 'react-native-zip-archive';
var Mailer = require('NativeModules').RNMail;
var RNFS = require('react-native-fs');
import RNHTMLToPDF from 'react-native-html-to-pdf';


export function toggleNoResumeScannedFlag(){
	return (dispatch,getState) => {
		const {isNoResumeScannedFlagRaised} = getState();
		dispatch({
			type: types.RAISED_NO_RESUME_SCANNED_FLAG,
			val: !isNoResumeScannedFlagRaised
		})
	}
}

export function deleteEvent(eventId){
	return(dispatch,getState) => {
		const {firebaseRef,user} = getState();
		firebaseRef.database().ref('/recruiters/' + user.uid + '/events/' + eventId).remove();
	}
}

export function zipAndEmailResumes({event}){
	return (dispatch,getState) => {
		const {firebaseRef,user} = getState();
		firebaseRef.database()
		.ref('/recruiters/' + user.uid + '/attendees/' + event.eventId)
		.on('value', (snapshot) => {
			var listOfAttendees = []
			snapshot.forEach((child) => {
				listOfAttendees.push({
					id: child.key,
					name: child.val().name,
					rating: child.val().rating,
					notes: child.val().notes ? child.val().notes : ''
				});
			});

			if (listOfAttendees.length == 0) {
				console.log('No resume scanned flag is about to be raised')
				dispatch({
					type:types.RAISED_NO_RESUME_SCANNED_FLAG,
					val:true
				})
			}

			var storageRef = firebaseRef.storage().ref();
			var listOfAttendeesLength = listOfAttendees.length;
			var counterOfDownloadedResumes = 0;
			var rootLocation = RNFS.DocumentDirectoryPath 
				+ '/' + event.eventId + '_Resumes/';

			var downloadZipAndThenMail = (parentLocationForResume,attendee) => {
				var resumeLocation = `${parentLocationForResume}resume.pdf`;
				var attendeeResumesRef = storageRef
					.child('attendees/' + attendee.id + '/resume.pdf');
				attendeeResumesRef.getDownloadURL()
					.then(
						(url) => {
							var ratingAndnotesHTML = `<h1>Rating: ${attendee.rating}</h1>`
							if (attendee.notes){
								ratingAndnotesHTML += `\n<h1>Notes: ${attendee.notes}</h1>`
							}
							var ratingAndNotesDirectory = parentLocationForResume.replace(`${RNFS.DocumentDirectoryPath}/`,'');
							ratingAndNotesDirectory = ratingAndNotesDirectory + 'note'
							var options = {
								html: ratingAndnotesHTML,
								fileName: ratingAndNotesDirectory,
								directory: 'docs'
							}
							RNHTMLToPDF.convert(options)
							var downloadOptions = {
								fromUrl: url,
								toFile: resumeLocation
							}
							RNFS.downloadFile(downloadOptions).promise
								.then((res) => {
									counterOfDownloadedResumes += 1
									if(counterOfDownloadedResumes == listOfAttendeesLength){
										var sourcePath = rootLocation;
										var targetPath = RNFS.DocumentDirectoryPath + '/resumes.zip';
									
										zip(sourcePath,targetPath)
											.then((path)=>{
													Mailer.mail({
													subject: 'Resumes for ' + event.eventTitle,
													recipients:[''],
													attachment:{
														path,
														type: 'zip',
														name: 'resumes.zip'
													}
												}, (error,event) => {
													if(event == "sent" || event == "cancelled"){
														dispatch({
															type: types.READY_TO_EMAIL_RESUMES,
															val:false
														})
													}else if(error){
														AlertIOS.alert('Error', 'Could not send mail. Please send a mail to trurecruit.email@gmail.com');
													}
												})
												dispatch({
													type: types.READY_TO_EMAIL_RESUMES,
													val: true
												})
											})
											.catch((error)=>{console.log(error)})
									}
								})
								.catch(error => console.log(error))
						}
					)
			}
			
			var loopingThroughAttendees = (listOfAttendees) => {
				listOfAttendees.forEach((attendee) => {
					var pdfAndRecruiterCommentLocation = `${rootLocation}${attendee.name}_${Date.now()}/`;
					RNFS.exists(pdfAndRecruiterCommentLocation).then(
						exists => {
							if(exists){	
								RNFS.unlink(pdfAndRecruiterCommentLocation).then(
									() => {
										RNFS.mkdir(pdfAndRecruiterCommentLocation,{
											NSURLIsExcludedFromBackupKey: false	
										});
										downloadZipAndThenMail(pdfAndRecruiterCommentLocation,attendee);
									}
									).catch(error =>{
										console.log(`error = ${error}`)
									})
							}else{
								RNFS.mkdir(pdfAndRecruiterCommentLocation,{
											NSURLIsExcludedFromBackupKey: false	
								});
								downloadZipAndThenMail(pdfAndRecruiterCommentLocation,attendee);
							}
						}	
					)
				})
			}

			RNFS.exists(rootLocation).then(
				(exists) =>{
					if (exists){
						RNFS.unlink(rootLocation).then(
							() => {
								RNFS.mkdir(rootLocation,{
									NSURLIsExcludedFromBackupKey: false	
								});
								loopingThroughAttendees(listOfAttendees);
							}
							).catch(error =>{
								console.log(`error = ${error}`)
							})
					}else{
						RNFS.mkdir(rootLocation,{
								NSURLIsExcludedFromBackupKey: false	
						});
						loopingThroughAttendees(listOfAttendees);
					}
				}
			)
			
		})
	}
}

export function saveNewEvent(event){
	return (dispatch,getState) => {
		const { firebaseRef, user } = getState();
		firebaseRef.database()
		.ref('/recruiters/' + user.uid + '/events/')
		.push()
		.set(event);
	}
}

export function listenToEventsChanges(){
	return (dispatch,getState) => {
		const { firebaseRef, user } = getState();
		if(user){
			firebaseRef.database()
			.ref('/recruiters/' + user.uid + '/events/')
			.on('value', (snapshot) => {
				var events = snapshot.val()
				if(!events){
					dispatch(updateEvents({}));
					return;
				}


				for(let key of Object.keys(events)){
					events[key].eventId = key
				}
				
				var eventKeySorted = Object.keys(events).sort((a,b)=>{return events[b]["eventDate"] - events[a]["eventDate"]})

				var eventsSorted = [];
				eventKeySorted.forEach((key)=>{
					eventsSorted.push(events[key]);
				})
				dispatch(updateEvents(eventsSorted))	
			})
		}
		
	}
}

export function updateEvents(events){
	return {
		type: types.UPDATE_EVENTS,
		events: events
	}
}

export function fetchEvents(){
	return (dispatch,getState) => {
		const { firebaseRef,user } = getState();
		if(user){
			firebaseRef.database().ref('/recruiters/' + user.uid + '/events').once('value')
			.then(
				snap => {
					dispatch({
						type:types.UPDATE_EVENTS,
						events: snap.val()
					});
				}
			)
		}
	}
}

export function selectEvent(event){
	return (dispatch,getState) => {
		dispatch({
			type:types.SELECT_EVENT,
			event
		});
	}
}