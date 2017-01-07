import React, { Component } from 'react';
import {
	StyleSheet,
	ScrollView,
	ListView,
	View,
	Text,
	TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';


export default class EventDetailsCard extends Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return(
			<View style={styles.container}>
				<Icon name="ios-contact" size={40} style={styles.profpic}></Icon>
				<View style={styles.attendee_scan_information}>
					<Text style={styles.attendee_name}>{this.props.attendee_name}</Text>
					<Text style={styles.attendee_summary}>{this.props.attendee_summary}</Text>
					<Text style={[styles.attendee_name,styles.time_scanned]}>{this.props.time_scanned}</Text>
				</View>
			</View>
		)
	}

}

const styles = StyleSheet.create({
	container:{
		paddingLeft:20,
		paddingRight:20,
		paddingTop: 10,
		paddingBottom:10,
		borderBottomColor:'#ecf0f1',
		borderBottomWidth:1,
		flexDirection: 'row',
	},
	profpic:{
		color:"#CCCCCC",
	},
	attendee_scan_information:{
		flexDirection:'column',
		marginLeft:10
	},
	attendee_name:{
		fontWeight:"bold",
		fontSize:20,
		color:'#535455'
	},
	attendee_summary:{
		fontSize:12,
		color:"#534555"
	},
	time_scanned:{
		fontWeight:"normal",
		color:"#CCCCCC",
		fontSize:12
	}

	
})