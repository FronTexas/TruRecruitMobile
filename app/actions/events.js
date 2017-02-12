import * as types from './types';

export function dispatchNewEvent(event){
	return (dispatch,getState) => {
		dispatch({
			type: types.SET_NEW_EVENTS,
			event: event
		});
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