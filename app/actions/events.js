import * as types from './types';

export function dispatchNewEvent(event){
	return (dispatch,getState) => {
		dispatch(setNewEvent({event}));
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

export function setNewEvent({event}){
	return {
		type: types.SET_NEW_EVENTS,
		event,
	}
}