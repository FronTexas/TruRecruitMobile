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


export default class EventCard extends Component
{
	constructor(props)
	{
		super(props);
		this.state={
			modalVisible:false
		}
	}

	_goToEventDetails(){
		this.props.navigator.push({
			id:"EventDetailsPage",
			name:"Event Details Page",
			event:{
				eventTitle: this.props.eventTitle,
				eventDate: this.props.eventDate
			},
			previousPageTitle: "Events"
		})
	}

	render()
	{
		return(
			<View>
				<TouchableOpacity onPress={this._goToEventDetails.bind(this)}>
					<View style={[styles.shadow,styles.container]}>
						<View style={styles.eventInfoContainer}>
							<Text style={styles.eventTitle}>{this.props.eventTitle}</Text>
							<Text style={styles.eventDate}>{this.props.eventLocation}</Text>
							<Text style={styles.eventDate}>{this.props.eventDate}</Text>
						</View>
						<View style={styles.resume_scanned_container}>
							<Text style={styles.resume_scanned_number}>{this.props.resumeScanned}</Text>
							<Text style={styles.resume_scanned_text}>Resume Scanned</Text>
						</View>
					</View>
				</TouchableOpacity>
				<View style={{alignItems:'flex-start',marginTop:-30}}>
					<TouchableOpacity
						onPress={this.props.onSendEmailClick()}
					>
								<View id="send_email_button" style={[styles.shadow,{
												backgroundColor:"#1DBB96",
												width:50,
												height:50,
												borderRadius:100,
												alignItems:'center',
												justifyContent:'center',
												marginLeft:10
											}]}>
							<Icon name="md-mail" size={20} style={{color:"#FFF"}}></Icon>
						</View>
					
					</TouchableOpacity>
				</View>
			</View>
	
		
		)
	}

}

const styles = StyleSheet.create({
	modal:{
		justifyContent:'center',
		alignItems:'center',
		height:300,
		width:300
	},
	shadow:{
		shadowOffset:{
          width:0,
          height:0
        },
   		shadowColor:'black',
    	shadowOpacity:0.2
	},
	container:{
		flexDirection: 'row',
		paddingLeft:20,
		paddingRight:20,
		paddingTop: 10,
		paddingBottom:20,
		borderBottomColor:'#ecf0f1',
		borderBottomWidth:1,
		margin:10,
		justifyContent: 'space-between',
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
		fontSize:12,
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