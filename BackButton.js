import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default class BackButton extends Component{
	render(){
		return(
			<TouchableOpacity
				onPress={()=>this.props.navigator.pop()}
			>
				<Icon name="ios-arrow-back" size={40} color="#FFF"/>
			</TouchableOpacity>
		)
	}
}
