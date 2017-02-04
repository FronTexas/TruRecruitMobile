import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const searchedRecipes = createReducer({}, {
  [types.SET_SEARCHED_RECIPES](state, action) {
    let newState = {}
    state.events.forEach((event) => {
    	newState.push(event);
    });
    newState.shift(action.event);
    action.recipes.forEach( (recipe) => {
      newState[recipe.id] = recipe
    });
    return newState;
  },
});

