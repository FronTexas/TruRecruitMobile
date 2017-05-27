import React, { Component } from 'react';
import {
	StyleSheet,
	ScrollView,
	ListView,
	View,
	Text,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native';

import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';


class EventCard extends Component
{
	constructor(props)
	{
		super(props);
		this.state={
			modalVisible:false,
			isWaitingForEmailingResume:false
		}
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

	_goToEventDetails(){
		this.props.selectEvent(this.props.event);
		this.props.navigatorWrapper(false).push({
			id:"EventDetailsPage",
			name:"Event Details Page",
		})
	}

	componentWillReceiveProps(nextProps){
		const {isReadyToEmailResumes} = nextProps;
		if(isReadyToEmailResumes){
			this.setState({isWaitingForEmailingResume:false});
		}
	}

	render()
	{
		var sendEmailButtonContent = this.state.isWaitingForEmailingResume? 
			<ActivityIndicator
							style={{
							    alignItems: 'center',
							    justifyContent: 'center',
							    flex:1
							  }}
							  color="white"
							  size="small"
						>
			</ActivityIndicator>
			:
			<Icon name="md-mail" size={20} style={{color:"#FFF"}}></Icon>

		return(
			<View>
				<TouchableOpacity 
					onPress={this._goToEventDetails.bind(this)}
					onLongPress={(e)=>{
						this.props.onLongPress();
					}}
					>
					<View style={[styles.shadow,styles.container]}>
						<View style={styles.eventInfoContainer}>
							<Text style={styles.eventTitle}>{this.props.event.eventTitle}</Text>
							<Text style={styles.eventDate}>{this.props.event.eventLocation}</Text>
							<Text style={styles.eventDate}>{this.formatTimeScanned(this.props.event.eventDate)}</Text>
						</View>
						<View style={styles.resume_scanned_container}>
							<Text style={styles.resume_scanned_number}>{this.props.event.resumeScanned}</Text>
							<Text style={styles.resume_scanned_text}>Resume Scanned</Text>
						</View>
					</View>
				</TouchableOpacity>
				<View style={{alignItems:'flex-start',marginTop:-30}}>
					<TouchableOpacity
						onPress={ () => {
							this.setState({isWaitingForEmailingResume:true})
							this.props.onSendEmailClick();
						}}
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
									{sendEmailButtonContent} 
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
		fontSize:15,
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

function mapStateToProps(state){
	const {isReadyToEmailResumes} = state;
	return {
		isReadyToEmailResumes
	};
}

export default connect(mapStateToProps)(EventCard);