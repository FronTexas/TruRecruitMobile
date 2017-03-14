import createReducer from '../lib/createReducer';
import * as types from '../actions/types'


export const selectedAttendee = createReducer(null,
{
	[types.SELECT_ATTENDEE](state,action){
		return action.attendee;
	}
})

export const selectedAttendeeId = createReducer(null, 
{
	[types.SELECT_SELECTED_ID](state,action){
		return action.selectedAttendeeId;
	}
})

export const attendeePDFLocation = createReducer(null,{
	[types.RESUME_DOWNLOADED](state,action){
		return action.pdfLocation;
	}
})

export const attendees = createReducer({},
{
	[types.UPDATE_ATTENDEES](state,action){
		return action.attendees;
	}
})

