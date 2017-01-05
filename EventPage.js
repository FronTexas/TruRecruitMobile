import React, { Component } from 'react';
import {
	StyleSheet,
	ScrollView,
	ListView,
	View,
	Text
} from 'react-native';


import Icon from 'react-native-vector-icons/Ionicons';
import EventCard from './EventCard'
import ActionButton from 'react-native-action-button'

export default class EventPage extends Component
{	
	
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
		this.state = {};
		const events = [
			{
				eventTitle:"HackTX",
				eventDate:"February 20th 2017",
				resumeScanned: 200
			},
			{
				eventTitle:"UT Job Fair",
				eventDate:"February 25th 2017",
				resumeScanned: 420
			},
			{
				eventTitle:"PennApps",
				eventDate:"March 20th 2017",
				resumeScanned: 69
			},
		]
		this.state.dataSource = ds.cloneWithRows(events);
		this.state.selectedEvent = null;
	}


	_renderHeader()
	{
		const SearchBar = require('react-native-search-bar');
		return(
			<View style={styles.top_nav}>
				<View style={styles.arrow_back_and_list}> 
					<Icon name="ios-arrow-back" size={20} color="#FFF" style={styles.arrow_back} />
					<Icon name="ios-list" size={30} color="#FFF" style={styles.options_more} />
				</View> 

				<SearchBar
				    ref='searchBar'
				    placeholder='Search'
				    onChangeText={() => {}}
				    onSearchButtonPress={() => {}}
				    onCancelButtonPress={() => {}}
				    hideBackground={true}/>

				<View style={styles.header_title_and_action}> 
					<Text style={styles.title}>Events</Text>
				</View>
			</View>
		)
	}

	render()
	{
		return(
			<View style={{flex:1}}>
				<ListView
					renderHeader={this._renderHeader.bind(this)}
					dataSource={this.state.dataSource}
					renderRow={(rowData) => 
						<EventCard 
						eventTitle={rowData.eventTitle} 
						eventDate={rowData.eventDate}
						resumeScanned={rowData.resumeScanned}
						navigator={this.props.navigator}></EventCard>
					}
					style = {styles.list_view}>
				</ListView>	
				<ActionButton 
				buttonColor="rgba(0,188,150,1)"
				backgroundTappable={true}
				onPress={this._goToAddEventPage.bind(this)}></ActionButton>
			</View>
			
		)
	}

	_goToAddEventPage(){
		this.props.navigator.push({
			id:"AddEventPage",
			name:"Add Event Page"
		})
	}
}

const styles = StyleSheet.create({
	list_view:{
		backgroundColor:"#FFF"
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
		alignItems:'flex-end',
		justifyContent:'space-between'
	},
	event_list:{
	},
	title:{
		color: '#FFF',
		fontWeight: 'bold',
		fontSize: 45,
		marginLeft:10,
	},
	arrow_back:{
		marginBottom:10
	},
	options_more:{
		alignItems: 'flex-end'
	}
})