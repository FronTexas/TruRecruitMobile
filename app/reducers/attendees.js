import createReducer from '../lib/createReducer';
import * as types from '../actions/types'

export const attendees = createReducer(
{
	'hacktx': 
	{	
		1: {
			id: 1,
			name:'Fahran Kamili',
			summary: 'Somebody',
			scanned: Date.now(),
			rating:3
		},
		2: {
			id: 2,
			name:'Steve Jobs',	
			summary: 'CEO at Apple',
			scanned:  Date.now(),
			rating:3
		}
	},
	'utjobfair':
	{	
		3: {
			id: 3,
			name:'Elon Musk',
			summary: 'CEO at Tesla',
			scanned:  Date.now(),
			rating:3

		},
		4: {
			id: 4,
			name:'Steve Jobs',	
			summary: 'CEO at Apple',
			scanned:  Date.now(),
			rating:3
		}
	}
	,
	'pennapps':
	{	
		5: {
				id: 5,
				name:'Elon Musk',
				summary: 'CEO at Tesla',
				scanned:  Date.now(),
				rating:3
	
			},
		6: {
			id:6,
			name:'Steve Jobs',	
			summary: 'CEO at Apple',
			scanned:  Date.now(),
			rating:3
		}
	}
}
,{
	[types.SAVE_NEW_ATTENDEE](state,action){
		let event_id = action.event_id;
		let attendee = action.attendee;
		let new_attendee_list = {...state[event_id]}
		new_attendee_list[attendee.id] = attendee
		console.log(new_attendee_list);
		return {...state,[event_id]: new_attendee_list}
	}
})