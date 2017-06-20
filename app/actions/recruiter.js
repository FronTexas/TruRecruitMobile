import * as types from './types';
import {AsyncStorage} from 'react-native';


export function signOut(){
	return(dispatch,getState) => {
		const {firebaseRef} = getState();
		firebaseRef.auth().signOut().then(() => {
			dispatch({
				type: types.USER_SIGNED_OUT
			})
		})
	}
}

export function getRecruiterInfo(){
	return (dispatch, getState) => {
		const {firebaseRef,user} = getState();
		firebaseRef.database().ref(`recruiters/${user.uid}`).on('value',snap => {
			var recruiter = snap.val();
			dispatch({
				type: types.SET_RECRUITER_INFO,
				recruiter
			})
		})

	}
}

export function removeLoggedInUser(){
	AsyncStorage.removeItem('user').then((error)=>{
		console.log(`error = ${error}`)})
}

export function setUser(user){
	return (dispatch,getState)=>{
		dispatch({
			type: types.USER_LOGGED_IN, 
			user: user
		})
	}
}

export function createNewUser({email,password,firstName,lastName,company}){
	return (dispatch,getState) => {
		const {firebaseRef} = getState();
		firebaseRef.auth().createUserWithEmailAndPassword(email,password)
		.then(user =>{
			firebaseRef.database().ref(`recruiters/${user.uid}`).set({
				email,
				name:`${firstName} ${lastName}`,
				company,
				attendees:{},
				events:{},
			},error=>{
				if(error){
					console.log(error)
				}else{
					dispatch({
						type:types.SIGNUP_SUCCESS
					})
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
				errorMessage
			})
		})
	}
}

export function login(credentials){
	return (dispatch,getState) => {
		const { firebaseRef } = getState();
		const { email, password } = credentials;

		firebaseRef.auth().signOut().then(()=>{
			firebaseRef
			.auth()
			.signInWithEmailAndPassword(email,password)
			.catch(
				(error) => {
					dispatch({
						type:types.FAILED_TO_LOGIN, 
						error
					})
				}
			)
			firebaseRef.auth().onAuthStateChanged(
			user => {
				if(user){
					dispatch({
						type: types.USER_LOGGED_IN, 
						user: user
					})
					AsyncStorage.setItem('user',JSON.stringify(user));
				}
			}
		)

		})

		
	}

}