import * as types from './types';
import {zip} from 'react-native-zip-archive';
var Mailer = require('NativeModules').RNMail;
var RNFS = require('react-native-fs');

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
					name: child.val().name
				});
			});

			var storageRef = firebaseRef.storage().ref();
			var listOfAttendeesLength = listOfAttendees.length;
			var counterOfDownloadedResumes = 0;
			var rootLocation = RNFS.DocumentDirectoryPath 
				+ '/' + event.eventId + '_Resumes/' 
			
			var downloadZipAndThenMail = () => {
				listOfAttendees.forEach((attendee) => {
						var attendeeResumesRef = storageRef
							.child('attendees/' + attendee.id + '/resume.pdf');
						attendeeResumesRef.getDownloadURL()
							.then(
								(url) => {
									var pdfLocation = rootLocation 
									+ attendee.name + '_' + Date.now() + '.pdf'
									var downloadOptions = {
										fromUrl: url,
										toFile: pdfLocation
									}
									RNFS.downloadFile(downloadOptions).promise
										.then((res) => {
											counterOfDownloadedResumes += 1
											if(counterOfDownloadedResumes == listOfAttendeesLength){
												var sourcePath = rootLocation;
												var targetPath = RNFS.DocumentDirectoryPath + '/resumes.zip';
											
												zip(sourcePath,targetPath)
													.then((path)=>{
														console.log(path);
														Mailer.mail({
															subject: 'Resumes for ' + event.eventTitle,
															recipients:[''],
															attachment:{
																path,
																type: 'zip',
																name: 'resumes.zip'
															}
														}, (error,event) => {
															if(error){
																AlertIOS.alert('Error', 'Could not send mail. Please send a mail to support@example.com');
															}
														})

													})
													.catch((error)=>{console.log(error)})
											}
										})
										.catch(error => console.log(error))
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
								downloadZipAndThenMail()
							}
							).catch(error =>{
								console.log(`error = ${error}`)
						})
					}else{
						RNFS.mkdir(rootLocation,{
								NSURLIsExcludedFromBackupKey: false	
							});
						downloadZipAndThenMail()
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
			dispatch(updateEvents(events))	
		})
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