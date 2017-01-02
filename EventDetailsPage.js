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


export default class EventDetailsPage extends Component
{	
	
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
		this.state = {};
		const attendees = [
			{
				name:'Jesse Harrick',
				scanned: '02:42 pm January 20th 2017'
			},
			{
				name:'Raul Camacho',
				scanned: '02:42 pm January 20th 2017'
			},
			{
				name:'Fahran Kamili',
				scanned: '02:42 pm January 20th 2017'
			},
			{
				name:'Elon Musk',
				scanned: '02:42 pm January 20th 2017'
			},
			{
				name:'Steve Jobs',
				scanned: '02:42 pm January 20th 2017'
			}

		]
		this.state.dataSource = ds.cloneWithRows(attendees);
	}

	_goToScannerPage()
	{
		this.props.navigator.push({
			id: 'ScannerPage',
			name: 'Scanner Page'
		})
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
					<View style={styles.eventDetailsContainer}>
						<Text style={styles.title}>{this.props.event.eventTitle}</Text>
						<Text style={[styles.title,styles.date]}>{this.props.event.eventDate}</Text>
					</View>
					<View style={styles.scan_button}>
						<Icon 
							style={styles.add_icon}
							name="ios-qr-scanner" 
							size={30} 
							onPress={this._goToScannerPage.bind(this)}
							></Icon>
							<Text style={styles.scan_text}
							onPress={this._goToScannerPage.bind(this)}>Scan</Text>
					</View>
					
				</View>
		</View>
		)
	}

	render()
	{
		return(
			<ListView
				renderHeader={this._renderHeader.bind(this)}
				dataSource={this.state.dataSource}
				renderRow={(rowData) => 
					<EventDetailsCard
					attendee_name={rowData.name} 
					time_scanned={rowData.scanned}></EventDetailsCard>
				}
				style = {styles.list_view}
			></ListView>	
		)
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
		justifyContent:'space-between',
		alignItems:'flex-end'
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