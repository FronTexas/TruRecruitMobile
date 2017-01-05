import React, { Component } from 'react';
import {
	StyleSheet,
	ScrollView,
	ListView,
	View,
	Text
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




import Icon from 'react-native-vector-icons/Ionicons';

export default class AddEventPage extends Component{
	constructor(props){
		super(props);

		this.state = {
	      date: '',
	      time: '20:00',
	      datetime: '2016-05-05 20:00',
	      datetime1: '2016-05-05 20:00'
	    };
	}
	render(){
		return(
			<View style={{backgroundColor:"#FFF"}}>
				<View style={styles.top_nav}>
					<View style={styles.arrow_back_and_list}> 
						<Icon name="ios-arrow-back" size={20} color="#FFF" style={styles.arrow_back} />
					</View> 
					<Text style={styles.add_event_text}>Add Event</Text>
				</View>

				<FormLabel labelStyle={styles.formLabel}>Name</FormLabel>
				<FormInput placeholder="Enter the name of the event"></FormInput>

				<FormLabel labelStyle={styles.formLabel}>Location</FormLabel>
				<FormInput placeholder="Enter the location of the event"></FormInput>

				<FormLabel labelStyle={styles.formLabel}>Time</FormLabel>
		        <DatePicker
		          style={{marginLeft:20, width: 345}}
		          date={this.state.date}
		          mode="date"
		          placeholder="placeholder"
		          format="YYYY-MM-DD"
		          minDate="2016-05-01"
		          maxDate="2016-06-01"
		          confirmBtnText="Confirm"
		          cancelBtnText="Cancel"
		          onDateChange={(date) => {this.setState({date: date});}}
		        />
			</View>
		
		)
	}

	onDateChange = (date) => {
    	this.setState({date: date});
  	};
}

const styles = StyleSheet.create({
	top_nav:{
		backgroundColor: '#1DBB96',
		paddingTop: 30,
		paddingLeft: 10, 
		paddingRight: 10, 
		paddingBottom: 10
	},
	add_event_text:{
		color:"#FFF",
		fontWeight:"bold",
		fontSize: 45,
		marginTop:25
	},
	formLabel:{
		color:"#1DBB96",
		marginTop:20
	}

})