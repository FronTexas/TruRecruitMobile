import * as types from './types';
import Api from '../lib/api';

export function login(credentials){
	return (dispatch,getState) => {
		Api.login(credentials).onAuthStateChanged(
			user => {
				dispatch({
					type: types.USER_LOGGED_IN,
					user:user
				})
			}
		)
	}
}