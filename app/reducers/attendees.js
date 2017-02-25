import createReducer from '../lib/createReducer';
import * as types from '../actions/types'

export const attendees = createReducer(
{}
,{
	[types.SAVE_NEW_ATTENDEE](state,action){
		let event_id = action.event_id;
		let attendee = action.attendee;
		let new_attendee_list = {...state[event_id]}
		new_attendee_list[attendee.id] = attendee
		console.log(new_attendee_list);
		return {...state,[event_id]: new_attendee_list}
	},
	[TYPES.UPDATE_ATTENDEES](state,action){
		return action.attendees;
	}
})