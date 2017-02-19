import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import update from 'react-addons-update'; // ES6


export const user = createReducer({},{
  [types.USER_LOGGED_IN](state,action){
    return action.user;
  }
})

export const isLoggedIn = createReducer(false,{
  [types.LOGIN](state,action){
    
  }
})
