import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';




export default class BackButton extends Component{

	_handleBackButtonPressed(){
		if(this.props.onBackButtonPressed){
			return this.props.onBackButtonPressed
		}else{
			return () => this.props.navigatorWrapper(false).pop()
		}
	}
	render(){
		return(
			<TouchableOpacity
				onPress={this._handleBackButtonPressed()}
			>
				<View>
					<Icon name="ios-arrow-back" size={40} color="#FFF"/>
				</View>
			</TouchableOpacity>
		)
	}
}
