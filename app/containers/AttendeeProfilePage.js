import React, { Component } from 'react';
import {
	StyleSheet,
	ScrollView,
	ListView,
	View,
	Text,
	Image,
	Dimensions,
	Button,
	TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFa from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import BackButton from './BackButton';
import Navbar from './Navbar';
import PDFView from 'react-native-pdf-view';

class AttendeeProfilePage extends Component
{
	constructor(props){
		super(props);
		this.state = {};
		this.state.attendee = this.props.scannedAttendee ? this.props.scannedAttendee : null
		this.state.attendee = this.props.attendee ? this.props.attendee : {
			name: 'Loading',
			summary: 'Loading'
		}
		this.state.rating = this.props.attendee && this.props.attendee.rating ? this.props.attendee.rating : 0;
		this.state.attendeePDFLocation = this.props.attendeePDFLocation
	}

	_onStarPress(rating){
		this.setState({rating})
	}

	componentWillMount(){
		// Existence of attendeeID implies that this attendee is aquired through scanning a QR code
		if(this.props.attendeeID){
			this.props.setSelectedAttendee(this.props.attendeeID);
		}
		this.props.downloadResume();
	}

	componentWillReceiveProps(nextProps){
		const { scannedAttendee,attendeePDFLocation } = nextProps;
		if (scannedAttendee) this.setState({attendee:scannedAttendee});
		if (attendeePDFLocation) this.setState({attendeePDFLocation})
	}			 	  	 	   	 	  	  		 	 	 	

	render()
	{
		return (
			<View style={{flex:1}}>
				<Navbar onBackButtonPressed = {() => {this.props.navigator.pop()}} navigator={this.props.navigator} title={this.state.attendee.name}></Navbar>
				<ScrollView style={{
						backgroundColor:"#EEF1F7"
					}}>
					<View id='attendee-profile' 
						style={{
							alignItems: 'center'
						}}
						>
							<Icon name="ios-contact" size={80} style={styles.profpic}></Icon>
							<Text style={styles.name}>{this.state.attendee.name}</Text>
							<Text style={styles.graduation}>{this.state.attendee.summary}</Text>
					</View>
					<View id="links-and-resume" style={{
							flex: 1,
							backgroundColor:"#EEF1F7",
							paddingLeft:20,
							paddingTop:10,
							paddingRight:20
						}}
						>
						<View id='links'>
							<View style={styles.link}>
								<IconFa style={[styles.link_icon,styles.github_icon]} size={25} name="github"></IconFa>
								<Text style={styles.link_text}>github.com/frontexas</Text>
							</View>
							<View style={styles.link}>
								<IconFa style={[styles.link_icon,styles.linkedin_icon]} size={25} name="linkedin"></IconFa>
								<Text style={styles.link_text}>linkedin.com/in/fahrankamili</Text>
							</View>
						</View>
						<TouchableOpacity
							onPress={() => this.props.navigator.push({
								id: "ResumeViewPage",
							}) }
							style={styles.shadow}
						>
							<PDFView
								src={this.state.attendeePDFLocation}
								style={styles.resume_preview}
							>
							</PDFView>
						</TouchableOpacity>
						
					</View>
					<View style={styles.rate_area}>
						<Text style={styles.rate_text}>
							Rate the candidate
						</Text>
						<View style={{width:200}}>
							<StarRating
								maxStars={5}
								rating={this.state.rating}
								selectedStar={(rating) => this._onStarPress(rating)}
								starSize={30}
								starColor="#F5C87F"
								emptyStarColor="#CCCCCC"
								></StarRating>
						</View>
					</View>
					<TouchableOpacity
						onPress=
						{ () => 
							{
								var scanned = this.state.attendee.scanned ? this.state.attendee.scanned : Date.now();
								var aboutToBeSavedAttendee = {...this.state.attendee};
								aboutToBeSavedAttendee.scanned = scanned;
								aboutToBeSavedAttendee.rating = this.state.rating;
								this.props.saveNewAttendee(aboutToBeSavedAttendee);
								this.props.navigator.pop();
							}
						}
					>
						<View style={styles.save_button_area}>
							<View style={styles.save_button}>
						    	<Text style={styles.save_text}>Save</Text>
						    </View>
						</View>
					</TouchableOpacity>
				</ScrollView>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	shadow:{
		shadowOffset:{
          width:0,
          height:0
        },
   		shadowColor:'black',
    	shadowOpacity:0.2
	},
	container:{
		backgroundColor:"#EEF1F7",
	},
	profpic:{
		color:'#535455'
	},
	name:{
		fontWeight:"bold",
		fontSize:30,
		color:'#535455'
	},
	graduation:{
		fontSize:20,
		color:'#535455'
	},
	links_and_resume:{
		flex: 1,
		backgroundColor:"#EEF1F7",
		paddingLeft:20,
		paddingTop:10,
		paddingRight:20
	},
	links:{

	},
	link:{
		flexDirection:'row',
		alignItems:'center',
		marginBottom: 10
	},
	link_icon:{
		marginRight:5
	},
	github_icon:{
		color: "#000000"
	},
	linkedin_icon:{
		color:"#1483BA",
		marginTop:-5
	},
	link_text:{
		color:"#3498DB",
		fontWeight:"600"
	},
	resume_preview:{
		width: 335,
		height:423.34,
	},
	rate_area:{
		alignItems:'center',
		marginTop:20
	},
	rate_text:{
		marginBottom:10,
		fontWeight:"600",
		color:"#2B394E"
	},
	save_button_area:{
		alignItems:'center',
		marginBottom:30
	},
	save_button:{
		backgroundColor:"#1DBB96",
		padding:15,
		width:150,
		alignItems:'center',
		borderRadius:30,
		marginTop:15
	},
	save_text:{
		color:"#FFF",
		fontWeight:"600",
		fontSize:25
	}

})

function mapStateToProps(state){
	const {selectedAttendee, attendeePDFLocation} = state;
	return{
		scannedAttendee: selectedAttendee,
		attendeePDFLocation: attendeePDFLocation
	}
}

export default connect(mapStateToProps)(AttendeeProfilePage);
