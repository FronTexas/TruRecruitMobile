import * as types from './types';

export function dispatchNewEvent(event){
	return (dispatch,getState) => {
		dispatch(setNewEvent({event:event}));
	}
}

export function setNewEvent({event}){
	return {
		type: types.SET_NEW_EVENTS,
		event,
	}
}