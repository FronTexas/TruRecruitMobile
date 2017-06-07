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
	ActivityIndicator,
	Animated
} from 'react-native';

import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFa from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import BackButton from './BackButton';
import Navbar from './Navbar';
import PDFView from 'react-native-pdf-view';

var Modal = require('react-native-modalbox');


const NAVBAR_HEIGHT = 80;

class RecruiterProfilePage extends Component
{
	constructor(props){
		super(props);
		this.state = {};
		this.state.recruiter = this.props.recruiter ? this.props.recruiter : {
			name: 'Loading',
			summary: 'Loading'
		}
		this.state.scrollY = new Animated.Value(0);
		this.state.isLoggedIn = false;
	}

	componentDidMount(){
		this.props.getRecruiterInfo();
		this.props.hideTabBar(false)
	}

	componentWillReceiveProps(nextProps){
		const {recruiter,isLoggedIn} = nextProps;
		if(isLoggedIn != this.state.isLoggedIn){
			this.setState({isLoggedIn})
			if (!isLoggedIn){
				this.props.changeIsLoginMode(true);
			}
		}
		noRecruiterInThisComponent = !(this.state.recruiter.name == 'Loading')
		if(recruiter && noRecruiterInThisComponent){
			this.setState({recruiter})
		}
		
	}

	closeModal(){
		this.refs.signOutConfirmationModal.close()
	}

	render()
	{	
		var profPicView = this.state.profilePictureURL ?
		<Image style={[{width:80,height:80,borderRadius:40},styles.shadow]} source={{uri: this.state.profilePictureURL}}></Image>
		:
		<Icon name="ios-contact" size={80} style={styles.profpic}></Icon>
		return (
			<View style={{flex:1}}>
				<ScrollView 
					style={{
						backgroundColor:"#EEF1F7",
						marginTop: NAVBAR_HEIGHT,
					}}
					onScroll={Animated.event(
				      [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
				    )}
				    scrollEventThrottle={12}
					>
						<View id='user-profile' 
							style={{
								alignItems: 'center',
								marginTop:20
							}}
							>
								{profPicView}
								<Text style={styles.name}>{this.state.recruiter.name}</Text>
								<Text style={styles.summary}>{this.state.recruiter.company}</Text>
						</View>
						<TouchableOpacity
							style={{
								marginTop:25,
								alignSelf:'center'
							}}
							onPress={()=>{
								this.refs.signOutConfirmationModal.open()
							}}
						>
							<Text
								style={{
									fontWeight:'bold',
									color:"#e74c3c",
									fontSize:25
								}}
							>Sign Out</Text>
						</TouchableOpacity>

				</ScrollView>
				<Navbar 
						disableBackButton={true}
						navigatorWrapper={this.props.navigatorWrapper} 
						title="Profile"
						hasScrollView={true}
						minHeight={NAVBAR_HEIGHT}
						maxHeight={300}
						gradient={{
							default:'#1DBB96',
							stretched: '#43E2BD'
						}}
						scrollY={this.state.scrollY}
				></Navbar>
				<Modal position={"center"}
				ref={"signOutConfirmationModal"} backdrop={true} style={{height:200,width:300}}>
					<View
						id="modal-container"
						style={{
							flex:1,
							paddingTop:30
						}}
					>
						<Text style={{alignSelf:'center', fontWeight:'bold', fontSize:20}}>Are you sure?</Text>
						<View
							style={{flex:1,justifyContent:'flex-end',padding:20}}
						>

						<View style={{flexDirection:'row',justifyContent:'space-around'}}>
							<TouchableOpacity onPress={() => {
								this.props.signOut();
								this.closeModal();
							}}>
									<View
										id="yes-button"
										style={[styles.shadow,{
													padding:15,
													backgroundColor:'#e74c3c',
													borderRadius:30,
													width:100,
													alignItems:'center'
												}]}
									>
										<Text style={{color:"#FFF",fontWeight:'600'}}>Yes</Text>
									</View>
							</TouchableOpacity>

							<TouchableOpacity onPress={() => {
								this.closeModal();
							}}>
									<View
										id="no-button"
										style={[styles.shadow,{
													padding:15,
													backgroundColor:'#1DBB96',
													borderRadius:30,
													width:100,
													alignItems:'center'
												}]}
									>
										<Text style={{color:"#FFF",fontWeight:'600'}}>No</Text>
									</View>
							</TouchableOpacity>
						</View>


						</View>
					</View>
				</Modal>
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

	name:{
		fontWeight:"bold",
		fontSize:30,
		color:'#535455'
	},
	summary:{
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
	const {recruiter,isLoggedIn} = state;
	return{
		recruiter,
		isLoggedIn
	}
}

export default connect(mapStateToProps)(RecruiterProfilePage);
