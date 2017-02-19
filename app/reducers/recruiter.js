import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import update from 'react-addons-update'; // ES6
import Api from '../lib/api';


export const user = createReducer({},{
  [types.USER_LOGGED_IN](state,action){
    return action.user;
  }
})

export const isLoggedIn = createReducer(false,{
  [types.LOGIN](state,action){
    
  }
})

export const events = createReducer(
{},
{
  [types.SET_NEW_EVENTS](state, action) {
    console.log("****** ACTION IN EVENTS *******")
    console.log(action.event);
    return [action.event,...state.slice(0)];
  },
  [types.FETCH_EVENTS](state,action){
    return action.events;
  }
}
);
