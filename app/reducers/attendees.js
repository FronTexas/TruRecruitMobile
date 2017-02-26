import createReducer from '../lib/createReducer';
import * as types from '../actions/types'


export const selectedAttendee = createReducer(null,
{
	[types.SELECT_ATTENDEE](state,action){
		return action.attendee
	}
}
)

export const attendees = createReducer(
{}
,{
	[types.UPDATE_ATTENDEES](state,action){
		return action.attendees;
	}
})