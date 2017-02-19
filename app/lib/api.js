const firebase = require('firebase');
 var config = {
    apiKey: "AIzaSyCOwfUwf2-GqcacgkBopnwXb8-HG5Km7hY",
    authDomain: "trurecruit-dd63b.firebaseapp.com",
    databaseURL: "https://trurecruit-dd63b.firebaseio.com",
    storageBucket: "trurecruit-dd63b.appspot.com",
    messagingSenderId: "117008567602"
  };
firebase.initializeApp(config);
_user = null;
import * as types from '../actions/types';

export default class Api{
	static login(credentials,dispatch,payload){
		let email = credentials.email;
		let password = credentials.password;
		firebase.auth().signInWithEmailAndPassword(email,password).catch(
			(error) => {
				console.log('***** ERROR LOGGING IN ******');
				console.log(error.message)
			}
		)

		firebase.auth().onAuthStateChanged(
			user => {
				this._user = user
				let payload = {
					type: types.USER_LOGGED_IN,
					user:user
				}
				if(dispatch) dispatch(payload)
			}
		)
	}

	static saveNewEvent(event){
		firebase.database()
		.ref('/recruiters/' + this._user.uid + '/events/')
		.push()
		.set(event);
	}

	static getEvents(){
		if (this._user){
			return firebase.database().ref('/recruiters/' + this._user.uid + '/events').once('value');
		}else{
			console.log("**** _user is NUll ****")
			return {};
		}

	}
}