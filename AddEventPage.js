import React, { Component } from 'react';
import {
	StyleSheet,
	ScrollView,
	ListView,
	View,
	Text,
	TouchableOpacity,
	DatePickerIOS
} from 'react-native';

import{
	FormLabel,FormInput
} from 'react-native-elements'

import {
	Form,
	DatePickerField,
	Separator
} from 'react-native-form-generator'

import DatePicker from 'react-native-datepicker'
import BackButton from './BackButton'


var moment = require('moment');

import Icon from 'react-native-vector-icons/Ionicons';

export default class AddEventPage extends Component{
	constructor(props){
		super(props);

		this.state={
			eventTitle: null,
			eventDate: new Date(),
			eventLocation: null,
			showDatePicker: false,
		}
	}
	render(){
		const datePicker = this.state.showDatePicker ?
		<View style={styles.datePicker_area}>
			<DatePickerIOS
				date={this.state.eventDate}
				onDateChange={(eventDate) => this.setState({eventDate:eventDate})}
				mode="date">
			</DatePickerIOS>
			<TouchableOpacity
				onPress={() => this.setState({showDatePicker:false})}
			>
			<Text style={styles.done_datePicker_text}>Done</Text>
			</TouchableOpacity>
		</View>
		: <View></View>;

		const saveButton = !this.state.showDatePicker ?
		<View style={styles.saveButton_area}>
			<TouchableOpacity
				onPress={() =>
					this.props.navigator.push(
					{
						id:"EventPage",
						eventCreated: {
							eventTitle: this.state.eventTitle,
							eventDate: this.state.eventDate,
							eventLocation: this.state.eventLocation,
							resumeScanned: 0
						}
					})}
				>
				<View style={styles.save_add_event_button}>
					<Text style={styles.save_text}>Save</Text>
				</View>
			</TouchableOpacity>
		</View> : <View></View>

		return(
			<View style={{backgroundColor:"#FFF",flex:1}}>
				<View style={styles.top_nav}>
					<View style={styles.arrow_back_and_list}>
						<BackButton navigator={this.props.navigator} style={styles.arrow_back}></BackButton>
					</View>
					<Text style={styles.add_event_text}>Add Event</Text>
				</View>

				<FormLabel labelStyle={styles.formLabel}>Name</FormLabel>
				<FormInput
					placeholder="Enter the name of the event"
					onChangeText={(eventTitle) => this.setState({eventTitle: eventTitle})}></FormInput>

				<FormLabel labelStyle={styles.formLabel}>Location</FormLabel>
				<FormInput
					placeholder="Enter the location of the event"
					onChangeText={(eventLocation) => this.setState({eventLocation: eventLocation})}></FormInput>

				<FormLabel labelStyle={styles.formLabel}>Time</FormLabel>
				<TouchableOpacity
					onPress={() => this.setState({showDatePicker: !this.state.showDatePicker})}
					style={styles.set_date_touchable}
				>
				<Text style={styles.date_text}>{this.state.eventDate? moment(this.state.eventDate).format('MM/DD/YYYY') : 'Set the date of the event'}</Text>
				</TouchableOpacity>

				{datePicker}

				{saveButton}


			</View>

		)
	}

	onDateChange = (eventDate) => {
    	this.setState({eventDate: eventDate});
  	};
}

const styles = StyleSheet.create({
	top_nav:{
		backgroundColor: '#1DBB96',
		paddingTop: 10,
		paddingLeft: 10,
		paddingRight: 10,
		flexDirection: 'row'
	},
	add_event_text:{
		color:"#FFF",
		alignSelf: 'center',
		fontWeight:"bold",
		fontSize: 25,
		marginLeft: 105,
	},
	formLabel:{
		color:"#1DBB96",
		marginTop:20
	},
	set_date_touchable:{
		marginLeft:20,
		marginTop:10,
	},
	date_text:{
		fontSize:20
	},
	done_datePicker_text:{
		color: '#1DBB96',
		marginLeft:150,
		fontWeight: 'bold',
		fontSize: 30
	},
	saveButton_area:{
		alignItems:'center'
	},
	save_add_event_button:{
		backgroundColor: '#1DBB96',
		paddingLeft:20,
		paddingRight:20,
		paddingTop:10,
		paddingBottom:10,
		borderRadius:20,
		width:150,
		alignItems:'center',
		marginTop:30
	},
	save_text:{
		color:"#FFF",
		fontSize:20,
		fontWeight:"600"
	}

})
