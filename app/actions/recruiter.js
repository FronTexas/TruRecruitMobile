import * as types from './types';
import Api from '../lib/api';

export function login(credentials){
	return (dispatch,getState) => {
		Api.login(credentials,dispatch)
	}
}