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

	render()
	{
		return(
			<TouchableOpacity
				onPress={() => this.props.navigator.push({
					id:"AttendeeProfilePage",
					attendee:{
						name: this.props.attendee_name,
						summary:this.props.attendee_summary,
					},
					
				})}
			>
				<View style={styles.container}>
					<View style={{flexDirection:'row'}}>
						<Icon name="ios-contact" size={40} style={styles.profpic}></Icon>
						<View style={styles.attendee_scan_information}>
							<Text style={styles.attendee_name}>{this.props.attendee_name}</Text>
							<Text style={styles.attendee_summary}>{this.props.attendee_summary}</Text>
							<Text style={[styles.attendee_name,styles.time_scanned]}>{this.props.time_scanned}</Text>
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
						>{this.props.rating}</Text>
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