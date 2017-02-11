import createReducer from '../lib/createReducer';
import * as types from '../actions/types'

export const attendees = createReducer(
{
	'hacktx': [
			{
				name:'Fahran Kamili',
				summary: 'Somebody',
				scanned: '02:42PM January 20th 2017',
				rating:3

			},
			{
				name:'Steve Jobs',	
				summary: 'CEO at Apple',
				scanned: '02:42PM January 20th 2017',
				rating:3
			}

	],
	'utjobfair':[
		{
			name:'Elon Musk',
			summary: 'CEO at Tesla',
			scanned: '02:42PM January 20th 2017',
			rating:3

		},
		{
			name:'Steve Jobs',	
			summary: 'CEO at Apple',
			scanned: '02:42PM January 20th 2017',
			rating:3
		}
	],
	'pennapps':
		[
			{
				name:'Elon Musk',
				summary: 'CEO at Tesla',
				scanned: '02:42PM January 20th 2017',
				rating:3

			},
			{
				name:'Steve Jobs',	
				summary: 'CEO at Apple',
				scanned: '02:42PM January 20th 2017',
				rating:3
			}
		]
}
,{
	[types.SAVE_NEW_ATTENDEE](state,action){
		let newState = [action.attendee];
		state.forEach((attendee) => newState.push(attendee));
		return newState;
	}
})