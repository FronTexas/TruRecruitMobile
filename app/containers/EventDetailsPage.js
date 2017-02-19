import React, { Component } from 'react';
import {
	StyleSheet,
	ScrollView,
	ListView,
	View,
	Text
} from 'react-native';

import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import EventDetailsCard from './EventDetailsCard';
import ActionButton from 'react-native-action-button';
import BackButton from './BackButton';
import Navbar from './Navbar';


class EventDetailsPage extends Component
{
	constructor(props){
		super(props);
	}

	_goToScannerPage()
	{
		this.props.navigator.push({
			id: 'ScannerPage',
			name: 'Scanner Page',
			event: this.props.event,
		})
	}

	getDataSource(){
		const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
		console.log(this.props.attendees);
		return ds.cloneWithRows(this.props.attendees);
	}

	render()
	{
		var navbar = <Navbar title={this.props.event.eventTitle} subtitle={this.props.event.eventDatek}></Navbar>
		return(
			<View style={{flex:1,backgroundColor:"#FFF"}}>
				<Navbar navigator = {this.props.navigator} title={this.props.event.eventTitle} subtitle={this.props.event.eventDate}></Navbar>
				<ListView
					dataSource={this.getDataSource()}
					renderRow={(rowData) =>
						<EventDetailsCard
						attendee={rowData}
						navigator={this.props.navigator}
						></EventDetailsCard>
					}
					style = {styles.list_view}
				></ListView>
				<ActionButton
					buttonColor="rgba(0,188,150,1)"
					icon={<Icon name="ios-qr-scanner" style={{color:"#FFF"}} size={30}></Icon>}
					onPress={this._goToScannerPage.bind(this)}
				></ActionButton>
			</View>

		)
	}
}

const styles = StyleSheet.create({
	top_nav:{
		backgroundColor: '#1DBB96',
		height:75
	},
	add_event_text:{
		color:"#FFF",
		alignSelf: 'center',
		fontWeight:"bold",
		fontSize: 30,
		marginLeft: 105,
	},
	list_view:{
		backgroundColor:"#FFF",
	},
	header_title_and_action:{
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'flex-end',
		marginTop:10
	},
	scan_button:{
		flexDirection:'row',
		alignItems:'center'
	},
	add_icon:{
		marginRight: 5,
		color:"#fff"
	},
	scan_text:{
		color:"#fff",
		fontWeight:"600",
		fontSize:20,
		marginTop:-3
	},
	event_list:{
	},
	eventDetailsContainer:{
		flexDirection:'column'
	},
	title:{
		color: '#FFF',
		fontWeight: 'bold',
		fontSize: 45,
		marginLeft:10,
	},
	date:{
	    fontSize:15,
	    fontWeight:'normal'
	},
	arrow_back:{
		marginTop:100
	},
	options_more:{
		alignItems: 'flex-end'
	}
})


function mapStateToProps(state){
	getAttendeesArray = (attendees_object) => {
		var attendees_array = [];
		for(var key in attendees_object){
			attendees_array.push(attendees_object[key]);
		}
		return attendees_array;
	}
	return {
		attendees:  getAttendeesArray(state.attendees[state.selected_event.event_id]),
		event: state.selected_event
	};
}

export default connect(mapStateToProps)(EventDetailsPage);