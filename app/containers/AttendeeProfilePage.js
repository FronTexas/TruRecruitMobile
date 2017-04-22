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
	TouchableOpacity,
	WebView,
	Linking,
	ActivityIndicator
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
		this.state.attendee = this.props.attendee ? this.props.attendee : {
			name: 'Loading',
			summary: 'Loading'
		}
		this.state.attendeePDFLocation = null;
		this.state.linkToOpen = null;
		this.toggleScannerPagesQRReadAlready = this.props.toggleScannerPagesQRReadAlready;
	}

	_onStarPress(rating){
		var modifiedAttendee = {...this.state.attendee};
		modifiedAttendee.rating = rating;
		this.setState({attendee:modifiedAttendee})
	}

	_handleSave(){
		var scanned = this.state.attendee.scanned ? this.state.attendee.scanned : Date.now();
		var aboutToBeSavedAttendee = {...this.state.attendee};
		aboutToBeSavedAttendee.scanned = scanned;
		this.props.saveNewAttendee(aboutToBeSavedAttendee);
		if(this.toggleScannerPagesQRReadAlready) toggleScannerPagesQRReadAlready();
		this.props.navigator.pop();
	}

	componentDidMount(){
		this.props.removeDownloadedResume();
 		this.props.setSelectedAttendee(this.props.attendeeID);
		this.props.downloadResume();
	}

	componentWillReceiveProps(nextProps){
		const { attendee,attendeePDFLocation } = nextProps;
		if (attendee) this.setState({attendee});
		if (attendeePDFLocation) this.setState({attendeePDFLocation});
	}			 	  	 	   	 	  	  		 	 	 	

	render()
	{
		var links = this.state.attendee.links;
		var linkTags = []
		var linkTags = links ? 
			Object.keys(links).map((key)=>{
					var iconStyleDict = {
						"github": styles.github_icon,
						"linkedin": styles.linkedin_icon
					}
		
					var iconLinkStyle = key in iconStyleDict ? iconStyleDict[key] :  styles.default_icon;
					var iconName = key in iconStyleDict ? key : 'external-link'
		
					return (
						<View key={key} style={styles.link}>
							<IconFa style={[styles.link_icon,iconLinkStyle]} size={25} name={iconName}></IconFa>
							<TouchableOpacity
								onPress={() => {
									Linking.openURL(links[key]).catch(err => console.error('An error occurred', err));
								}}
							>
								<Text style={styles.link_text}>{links[key]}</Text>
							</TouchableOpacity>
						</View>
					)
			})
			:
			<View></View>
		return (
				<View style={{flex:1}}>
							<Navbar onBackButtonPressed = {() => { if(this.toggleScannerPagesQRReadAlready) toggleScannerPagesQRReadAlready();
								this.props.navigator.pop()}} navigator={this.props.navigator} title={this.state.attendee.name}></Navbar>
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
											{
												linkTags
											}
										</View>
										<TouchableOpacity
											onPress={() => this.props.navigator.push({
												id: "ResumeViewPage",
											}) }
											style={styles.shadow}
										>
											{
												this.state.attendeePDFLocation ?
												<PDFView
													src={this.state.attendeePDFLocation}
													style={styles.resume_preview}
													zoom={1}
												>
												</PDFView>
												:
												<ActivityIndicator
													style={[{
															    alignItems: 'center',
															    justifyContent: 'center',
															    flex:1
															  },styles.resume_preview]}
												>
												</ActivityIndicator>
											}
										</TouchableOpacity>
									</View>
									<View style={styles.rate_area}>
										<Text style={styles.rate_text}>
											Rate the candidate
										</Text>
										<View style={{width:200}}>
											<StarRating
												maxStars={5}
												rating={this.state.attendee.rating}
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
												this._handleSave();
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
	default_icon:{
		color:"#000000"
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
		attendee: selectedAttendee,
		attendeePDFLocation: attendeePDFLocation
	}
}

export default connect(mapStateToProps)(AttendeeProfilePage);
