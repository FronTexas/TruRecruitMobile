import createReducer from '../lib/createReducer';
import * as types from '../actions/types'


export const selectedAttendee = createReducer(null,
{
	[types.SELECT_ATTENDEE](state,action){
		return action.attendee;
	}
})

export const selectedAttendeeID = createReducer(null, 
{
	[types.SELECT_ATTENDEE](state,action){
		return action.attendee.id;
	},
	[types.SELECT_SELECTED_ATTENDEE_ID](state,action){
		return action.selectedAttendeeID;
	}
})

export const attendeePDFLocation = createReducer(null,{
	[types.RESUME_DOWNLOADED](state,action){
		return action.pdfLocation;
	},
	[types.REMOVE_DOWNLOADED_RESUME](state,action){
		return null;
	}
})

export const attendees = createReducer({},
{
	[types.UPDATE_ATTENDEES](state,action){
		return action.attendees;
	}
})

