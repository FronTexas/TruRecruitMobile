import createReducer from '../lib/createReducer';
import * as types from '../actions/types'

export const attendees = createReducer(
{}
,{
	[types.UPDATE_ATTENDEES](state,action){
		return action.attendees;
	}
})