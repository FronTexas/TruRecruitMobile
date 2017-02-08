import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const events = createReducer(
 [
      {
        eventTitle:"HackTX",
        eventLocation: "The University of Texas at Austin",
        eventDate:"February 20th 2017",
        resumeScanned: 2
      },
      {
        eventTitle:"UT Job Fair",
        eventLocation: "The University of Texas at Austin",
        eventDate:"February 25th 2017",
        resumeScanned: 2
      },
      {
        eventTitle:"PennApps",
        eventLocation: "The University of Pennsilvynia",
        eventDate:"March 20th 2017",
        resumeScanned: 2
      },
  ]
, {
  [types.SET_NEW_EVENTS](state, action) {
    let newState = []
    state.forEach((event) => {
    	newState.push(event);
    });
    newState.unshift(action.event);
    return newState;
  },
});

