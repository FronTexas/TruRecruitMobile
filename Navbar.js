import React, { Component } from 'react';
import {
	View,
	Text
} from 'react-native';

import BackButton from './BackButton';


export default class Navbar extends Component{

	constructor(props){
		super(props);
	}

	render(){
		var titleStyle = {
							alignSelf:'center',
							fontWeight: 'bold',
							color:'#FFF',
							fontSize:25,
						}
		var title = 
		<Text style={titleStyle}>{this.props.title}</Text>;
		
		var subtitleStyle = {
			alignSelf:'center',
			color:'#FFF',
			fontSize: 10
		}
		var subtitle = this.props.subtitle ? 
		<Text style={subtitleStyle}>{this.props.subtitle}</Text> : <View></View>;
		
		var backButton = !this.props.disableBackButton ? <BackButton onBackButtonPressed ={this.props.onBackButtonPressed} navigator={this.props.navigator}></BackButton> : <View></View>

		return(
				<View style={{
						backgroundColor: '#1DBB96',
						height:75,
						flexDirection:'row',
						paddingTop:15,
					}}>
					<View style={{
						flex:.15,
						paddingLeft:15,
						justifyContent:'center'
					}}>
						{backButton}
					</View>
					<View
						style={{
							flex:.7,
							justifyContent: 'center'
						}}
					>
					{title}
					{subtitle}
					</View>
					<View style={{
						flex:.15
					}}></View>
				</View>
		)
	}
}