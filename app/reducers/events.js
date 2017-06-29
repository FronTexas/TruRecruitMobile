import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


export const isNoResumeScannedFlagRaised = createReducer(false,{
  [types.RAISED_NO_RESUME_SCANNED_FLAG](state,action){
    return action.val;
  }
})

export const isReadyToEmailResumes = createReducer(false,{
  [types.RAISED_NO_RESUME_SCANNED_FLAG](state,action){
    // No matter the result of NO_RESUME_SCANNED_NOT_READY_TO_EMAIL isReadyToEmailResume is always true since we need to shut down the ActivityIndicator
    return true
  },
	[types.READY_TO_EMAIL_RESUMES](state,action){
		return action.val;
	}
})

export const selected_event = createReducer({},{
  [types.SELECT_EVENT](state,action){
    return action.event
  } 
});

export const events = createReducer(
null,
{
  [types.SET_NEW_EVENTS](state, action) {
    return [action.event,...state.slice(0)]
  },
  [types.UPDATE_EVENTS](state,action){
  	return action.events
  }
}
);
