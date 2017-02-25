import * as types from './types';

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