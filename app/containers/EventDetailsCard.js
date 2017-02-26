import React, { Component } from 'react';
import {
	StyleSheet,
	ScrollView,
	ListView,
	View,
	Text,
	TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import IconFa from 'react-native-vector-icons/FontAwesome';



export default class EventDetailsCard extends Component
{
	constructor(props)
	{
		super(props);
	}

	formatTimeScanned(timestamp){
		const monthNames = [
		  "January", "February", "March",
		  "April", "May", "June", "July",
		  "August", "September", "October",
		  "November", "December"
		];

		const editMinute = (minute) => {
			return ('' + minute).length == 1 ? 0 + '' + minute : minute;
		}

		const editDate = (date) => {
			var date_str = '' + date;
			var last_char = date_str[date_str.length - 1];
			switch(last_char){
				case '1': 
					return date_str + 'st'
				case '2':
					return date_str + 'nd'
				case '3': 
					return date_str + 'rd'
				default: 
					return date_str + 'th' 
			}
 		}

		let date_object = new Date(timestamp);	
		let hours = date_object.getHours();
		let minute = editMinute(date_object.getMinutes());
		let month = monthNames[date_object.getMonth()];
		let date = editDate(date_object.getDate());
		return 'Scanned on ' + month + ' ' + date + ' ' + hours + ':' + minute;
	}

	render()
	{
		return(
			<TouchableOpacity
				onPress={() => 
						{	
							this.props.selectAttendee(this.props.attendee)
							this.props.navigator.push({
										id:"AttendeeProfilePage",
							})
						}
				}
			>
				<View style={styles.container}>
					<View style={{flexDirection:'row'}}>
						<Icon name="ios-contact" size={40} style={styles.profpic}></Icon>
						<View style={styles.attendee_scan_information}>
							<Text style={styles.attendee_name}>{this.props.attendee.name}</Text>
							<Text style={styles.attendee_summary}>{this.props.attendee.summary}</Text>
							<Text style={[styles.attendee_name,styles.time_scanned]}>{this.formatTimeScanned(this.props.attendee.scanned)}</Text>
						</View>
					</View>
					
					<View refs='starArea' 
						style={
							{
								alignItems:'center',
							}
						}
					>
						<IconFa
							name="star"
							style={
								{
									color:"#F5C87F",
								}
							}
							size={60}
						>
						</IconFa>
						<Text
							style={{
								marginTop:-42,
								backgroundColor:'rgba(0,0,0,0)',
								color:"#FFF",
								fontSize:20,
								fontWeight:'600'
							}}
						>{this.props.attendee.rating}</Text>
					</View>
				</View>
			</TouchableOpacity>
	
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
		justifyContent:'space-between'
	},
	profpic:{
		color:"#CCCCCC",
	},
	attendee_scan_information:{
		flexDirection:'column',
		marginLeft:10,
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