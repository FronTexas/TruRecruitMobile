import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const firebaseRef = createReducer(null,{
	[types.FIREBASE_REF_SET](state,action){
		return action.value
	}
})