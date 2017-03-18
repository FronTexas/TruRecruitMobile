import * as types from './types';

export function createNewUser(email,password){
	return (dispatch,getState) => {
		const {firebaseRef} = getState();
		firebaseRef.auth().createUserWithEmailAndPassword(email,password)
		.then(user=>{
			console.log(`user = ${JSON.stringify(user)}`);
			firebaseRef.database().ref(`recruiters/${user.uid}`).set({
				attendees:{},
				company:"",
				email:user.email,
				events:{},
				name:""
			},error=>{
				if(error){
					console.log(error)
				}else{
					dispatch({
						type: types.USER_LOGGED_IN, 
						user: user
					})
				}
			})
		})
		.catch(error=>{
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorMessage);
			dispatch({
				type: types.FAILED_TO_CREATE_NEW_USER,
			})
		})
	}
}

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