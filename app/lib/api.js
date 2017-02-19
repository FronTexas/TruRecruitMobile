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

export default class Api{
	static login(credentials){
		let email = credentials.email;
		let password = credentials.password;
		firebase.auth().signInWithEmailAndPassword(email,password).catch(
			(error) => {
				console.log('***** ERROR LOGGING IN ******');
				console.log(error.message)
			}
		)
		return firebase.auth();
	}

	static getEvents(){
		_user = firebase.auth().currentUser;
		if (_user){
			return firebase.database().ref('/recruiters/' + _user.uid + '/events').once('value');
		}else{
			console.log("**** _user is NUll ****")
			return {};
		}

	}
}