import createReducer from '../lib/createReducer';
import * as types from '../actions/types'


export const profilePictureURLDictionary = createReducer({},
{
	[types.PROFILE_PICTURE_DOWNLOADED](state,action){
		const {id,url} = action;
		var modifiedState = {...state};
		modifiedState[id] = url
		return modifiedState;
	}
})

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

export const attendees = createReducer(null,
{
	[types.UPDATE_ATTENDEES](state,action){
		var {attendees,recruitersAttendees} = action;
		var newAttendees = {...attendees,...recruitersAttendees};
		Object.keys(newAttendees).forEach((attendeeID) => {
			if (attendeeID in attendees)
			{
				newAttendees[attendeeID] = {...newAttendees[attendeeID],...attendees[attendeeID]}
			}else{
				newAttendees[attendeeID] = attendees[attendeeID];
			}
		});	
		return newAttendees;
	}
})

