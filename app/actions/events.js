import * as types from './types';
import Api from '../lib/api';

export function saveNewEvent(event){
	return (dispatch,getState) => {
		Api.saveNewEvent(event)
	}
}

export function fetchEvents(){
	return (dispatch,getState) => {
		Api.getEvents().then(
			snap => {
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