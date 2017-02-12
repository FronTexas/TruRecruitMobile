import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import update from 'react-addons-update'; // ES6

export const selected_event = createReducer({},{
  [types.SELECT_EVENT](state,action){
    return action.event
  }
});

export const events = createReducer(
  [
        {
          event_id: 'hacktx',
          eventTitle:"HackTX",
          eventLocation: "The University of Texas at Austin",
          eventDate:"February 20th 2017",
          resumeScanned: 2,
        },
        {
          event_id: 'utjobfair',
          eventTitle:"UT Job Fair",
          eventLocation: "The University of Texas at Austin",
          eventDate:"February 25th 2017",
          resumeScanned: 2
        },
        {
          event_id: 'pennapps',
          eventTitle:"PennApps",
          eventLocation: "The University of Pennsilvynia",
          eventDate:"March 20th 2017",
          resumeScanned: 2
        },
    ],
{
  [types.SET_NEW_EVENTS](state, action) {
    console.log("****** ACTION IN EVENTS *******")
    console.log(action.event);
    return [action.event,...state.slice(0)];
  }
}
);
