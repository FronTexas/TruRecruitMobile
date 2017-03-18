import React, { Component } from 'react';
import {
	StyleSheet,
	ScrollView,
	ListView,
	View,
	Text,
	ActivityIndicator
} from 'react-native';

import _ from 'underscore';
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
		this.state = {};
		this.state.attendees = {};
	}

	_goToScannerPage()
	{
		this.props.navigator.push({
			id: 'ScannerPage',
			name: 'Scanner Page',
			event: this.props.event,
		})
	}

	componentWillMount(){
		this.props.listenToAttendeesChanges();
	}
	componentWillReceiveProps(nextProps){
		const {attendees} = nextProps;
		if(attendees) this.setState({attendees});
	}

	getDataSource(){
		const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
		return ds.cloneWithRows(this.state.attendees);
	}

	formatTimeScanned(timestamp){
		const monthNames = [
		  "January", "February", "March",
		  "April", "May", "June", "July",
		  "August", "September", "October",
		  "November", "December"
		];

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
		let year = date_object.getUTCFullYear();
		let month = monthNames[date_object.getMonth()];
		let date = editDate(date_object.getDate());
		return month + ' ' + date + ' ' + year
	}

	render()
	{
		return(
			<View style={{flex:1,backgroundColor:"#FFF"}}>
				<Navbar navigator = {this.props.navigator} title={this.props.event.eventTitle} subtitle={this.formatTimeScanned(this.props.event.eventDate)}></Navbar>
				{!_.isEmpty(this.state.attendees) ? 
					<ListView
					dataSource={this.getDataSource()}
					renderRow={(rowData) =>
						<EventDetailsCard
						attendee={rowData}
						navigator={this.props.navigator}
						{...this.props}
						></EventDetailsCard>
					}
					style = {styles.list_view}
					removeClippedSubviews={false}
					></ListView>
					:
					<ActivityIndicator
						style={{
						    alignItems: 'center',
						    justifyContent: 'center',
						    flex:1
						  }}
						  size="large"
					>
					</ActivityIndicator>
				}
				
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
	const {selected_event,attendees} = state
	return {
		event: selected_event,
		attendees: attendees
	};
}

export default connect(mapStateToProps)(EventDetailsPage);
