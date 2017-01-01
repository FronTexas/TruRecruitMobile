import React, { Component } from 'react';
import {
	StyleSheet,
	ScrollView,
	ListView,
	View,
	Text,
	TouchableHighlight
} from 'react-native';

export default class EventCard extends Component
{
	constructor(props)
	{
		super(props);
	}

	_goToEventDetails(){
		this.props.navigator.push({
			id:"EventDetailsPage",
			name:"Event Details Page",
			event:{
				eventTitle: this.props.eventTitle,
				eventDate: this.props.eventDate
			}
		})
	}

	render()
	{
		return(
			<TouchableHighlight onPress={this._goToEventDetails.bind(this)}>
				<View style={styles.container}>
					<View style={styles.eventInfoContainer}>
						<Text style={styles.eventTitle}>{this.props.eventTitle}</Text>
						<Text style={styles.eventDate}>{this.props.eventDate}</Text>
					</View>
					<View style={styles.resume_scanned_container}>
						<Text style={styles.resume_scanned_number}>{this.props.resumeScanned}</Text>
						<Text style={styles.resume_scanned_text}>Resume Scanned</Text>
					</View>
				</View>
			</TouchableHighlight>
		
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
		justifyContent: 'space-between'
	},
	eventInfoContainer:{
		flexDirection: 'column'
	},
	resume_scanned_container:{
		flexDirection:'column',
		alignItems:'center'

	},
	eventTitle:{
		fontWeight:'bold',
		fontSize:25,
		color:'#535455'
	},
	eventDate:{
		fontSize:15,
		color:'#1DBB96'
	},
	resume_scanned_number:{
		fontWeight:'bold',
		fontSize:25,
		color:'#535455',
	},
	resume_scanned_text:{
		color:'#535455',
		fontSize:12
	}
})