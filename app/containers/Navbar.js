import React, { Component } from 'react';
import {
	View,
	Text,
	Animated
} from 'react-native';

import BackButton from './BackButton';


export default class Navbar extends Component{

	constructor(props){
		super(props);
		this.state={
			headerScrollDistance : this.props.maxHeight - this.props.minHeight
		}
	}

	render(){
		var {title} = this.props;
		var fontSize = 25
		if(title.length > 12){
			fontSize = Math.ceil(400 / title.length);
		}
		var titleStyle = {
							alignSelf:'center',
							fontWeight: 'bold',
							color:'#FFF',
							fontSize
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
		
		var backButton = !this.props.disableBackButton ? <BackButton onBackButtonPressed ={this.props.onBackButtonPressed} navigatorWrapper={this.props.navigatorWrapper}></BackButton> : <View></View>

		const height = this.props.scrollY ? this.props.scrollY.interpolate({
				    inputRange: [this.state.headerScrollDistance * -1, 0],
				    outputRange: [this.props.maxHeight,this.props.minHeight],
				    extrapolate: 'clamp',
		}) : 80;

		const backgroundColor = this.props.scrollY ? this.props.scrollY.interpolate({
			inputRange: [this.state.headerScrollDistance* -1 , 0],
			outputRange:[this.props.gradient.stretched,this.props.gradient.default],
			extrapolate:'clamp'
		}) : '#1DBB96'
		return(
				
				<Animated.View
					id="header"
					style={{
						position: this.props.hasScrollView ? 'absolute' : 'relative',
						top:0,
						left:0,
						right:0,
						overflow:'hidden',
						flexDirection:'row',
						backgroundColor,
						height
					}}
				>
					<View style={{
						flex:.15,
						paddingLeft:15,
						justifyContent:'center',
						paddingTop: 10
					}}>
						{backButton}
					</View>
					<View
						style={{
							flex:.7,
							justifyContent: 'center',
							paddingTop:10
						}}
					>
					{title}
					{subtitle}
					</View>
					<View style={{
						flex:.15
					}}></View>
				</Animated.View>
				
		)
	}
}