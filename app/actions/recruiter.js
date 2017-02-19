import * as types from './types';

export function login(credentials){
	return (dispatch,getState) => {
		const { firebaseRef } = getState();
		const { email, password } = credentials;
		firebaseRef
		.auth()
		.signInWithEmailAndPassword(email,password)
		.catch(
			(error) => {
				console.log("*** Error Logging In ***");
			}
		)

		firebaseRef.auth().onAuthStateChanged(
			user => {
				dispatch({
					type: types.USER_LOGGED_IN, 
					user: user
				})
			}
		)
	}

}