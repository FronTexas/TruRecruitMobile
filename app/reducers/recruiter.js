import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


export const recruiter = createReducer(null,{
	[types.SET_RECRUITER_INFO](state,action){
		return action.recruiter;
	}
})

export const isFailedSignup = createReducer(false,{
	[types.USER_LOGGED_IN](state,action){
		return false
	},
	[types.FAILED_TO_CREATE_NEW_USER](state,action){
		return true
	}
})

export const failedSignupMessage = createReducer(null,{
	[types.FAILED_TO_CREATE_NEW_USER](state,action){
		return action.errorMessage
	},
	[types.SIGNUP_SUCCESS](state,action){
		return null
	}
})

export const loginError = createReducer(null,{
	[types.FAILED_TO_LOGIN](state,action){
		return action.error
	},
	[types.USER_LOGGED_IN](state,action){
		return null;
	}
})

export const user = createReducer(null,{
  [types.USER_LOGGED_IN](state,action){
    return action.user;
  },
  [types.USER_SIGNED_OUT](state,action){
  	return null;
  }
})

export const isLoggedIn = createReducer(false,{
  [types.USER_LOGGED_IN](state,action){
    return true;
  },
  [types.USER_SIGNED_OUT](state,action){
  	return false;
  }
})
