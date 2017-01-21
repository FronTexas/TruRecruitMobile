import React, { Component } from 'react';
import {
	StyleSheet,
	ScrollView,
	ListView,
	View,
	Text
} from 'react-native';


import Icon from 'react-native-vector-icons/Ionicons';
import EventDetailsCard from './EventDetailsCard';
import ActionButton from 'react-native-action-button';
import BackButton from './BackButton';



export default class EventDetailsPage extends Component
{	
	
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
		this.state = {};
		const attendees = this.props.attendees ? this.props.attendees : [
			{
				name:'Elon Musk',
				summary: 'CEO at Tesla',
				scanned: '02:42PM January 20th 2017',
				rating:3

			},
			{
				name:'Steve Jobs',
				summary: 'CEO at Apple',
				scanned: '02:42PM January 20th 2017',
				rating:3
			}

		]
		this.state.dataSource = ds.cloneWithRows(attendees);
		this.state.attendees = attendees;
	}

	_goToScannerPage()
	{
		alert('length of attendees = ' + this.state.attendees.length)
		this.props.navigator.push({
			id: 'ScannerPage',
			name: 'Scanner Page',
			event: this.props.event,
			attendees: this.state.attendees
		})
	}


	_renderHeader()
	{
		const SearchBar = require('react-native-search-bar');
		return(
			<View style={styles.top_nav}>
				<View style={styles.arrow_back_and_list}> 
					<BackButton navigator={this.props.navigator} style={styles.arrow_back}></BackButton>
				</View> 

				<View style={styles.header_title_and_action}> 
					<View style={styles.eventDetailsContainer}>
						<Text style={styles.title}>{this.props.event.eventTitle}</Text>
						<Text style={[styles.title,styles.date]}>{this.props.event.eventDate}</Text>
					</View>
				</View>
		</View>
		)
	}

	render()
	{
		return(
			<View style={{flex:1,backgroundColor:"#FFF"}}>
				<ListView
					renderHeader={this._renderHeader.bind(this)}
					dataSource={this.state.dataSource}
					renderRow={(rowData) => 
						<EventDetailsCard
						attendee_name={rowData.name} 
						attendee_summary={rowData.summary}
						time_scanned={rowData.scanned}
						rating={rowData.rating}
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
	list_view:{
		backgroundColor:"#FFF",
	},
	arrow_back_and_list:{
		flexDirection:"row",
		justifyContent: 'space-between',
	},
	top_nav:{
		backgroundColor: '#1DBB96',
		paddingTop: 30,
		paddingLeft: 10, 
		paddingRight: 10, 
		paddingBottom: 10
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
		marginBottom:10
	},
	options_more:{
		alignItems: 'flex-end'
	}
})