import * as types from './types';

export function setFirebaseRef(ref){
	return {
		type: types.FIREBASE_REF_SET,
		value: ref
	}
}