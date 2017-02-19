import * as types from './types';
import Api from '../lib/api';

export function dispatchNewEvent(event){
	return (dispatch,getState) => {
		dispatch({
			type: types.SET_NEW_EVENTS,
			event: event
		});
	}
}

export function fetchEvents(){
	return (dispatch,getState) => {
		Api.getEvents().then(
			snap => {
				console.log('**** SNAP VAL ****');
				console.log(snap.val());
				dispatch({
					type:types.FETCH_EVENTS,
					events: snap.val()
				});
			}
		)
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