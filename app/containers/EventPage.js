import React, { Component } from 'react';
import {
	StyleSheet,
	ScrollView,
	ListView,
	View,
	Text,
	TouchableOpacity,
	Button,
	ActivityIndicator,
	Animated,
} from 'react-native';

import {connect} from 'react-redux';
import _ from 'underscore';

import IconFa from 'react-native-vector-icons/FontAwesome';
import EventCard from './EventCard';
import ActionButton from 'react-native-action-button';
import BackButton from './BackButton';
import Navbar from './Navbar';


import LinearGradient from 'react-native-linear-gradient';
var Modal = require('react-native-modalbox');

import{
	FormLabel,FormInput
} from 'react-native-elements';

const NAVBAR_HEIGHT = 80;

class EventPage extends Component
{

	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
		this.state = {};
		this.state.emailInputs = [];
		this.state.events = null;
		this.state.scrollY = new Animated.Value(0);
	}

	sendResumesToEmail(focusedEvent){
		this.props.zipAndEmailResumes({
			event: focusedEvent,
		});
	}

	closeModal(){
		this.refs.send_email_modal.close()
	}

	componentDidMount(){
		this.props.listenToEventsChanges();
		this.props.hideTabBar(false);
	}

	addEmailInput(){
		var currentEmailInputs = this.state.emailInputs.splice();
		const newFormInput = <FormInput placeholder="Enter email" onPress={this.addEmailInput.bind(this)}></FormInput>;
		currentEmailInputs.push(newFormInput);
		this.setState({emailInputs:currentEmailInputs});
	}

	getDataSource(){
		const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
		return ds.cloneWithRows(this.state.events);
	}

	componentWillReceiveProps(nextProps){
		const {events} = nextProps;
		if(events) this.setState({events});
	}

	render()
	{
		var body = null;
		if (this.state.events && !_.isEmpty(this.state.events)){
			body = <ListView
						dataSource={this.getDataSource()}
						renderRow={(rowData) =>{
								return <EventCard
								event = {rowData}
								navigator={this.props.navigator}
								onSendEmailClick={() => this.sendResumesToEmail(rowData)}
								onLongPress = {() => {this.setState({eventIdToDelete:rowData.eventId}); this.refs.send_email_modal.open()}}
								{...this.props}
								style={{marginTop:30}}
								></EventCard>
							}
						}
						style = {styles.list_view}
						removeClippedSubviews={false}
						onScroll={Animated.event(
					      [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
					    )}
					    scrollEventThrottle={12}
						>
					</ListView> 
		}else if(this.state.events){
			body = 
				<View style={{flex:1,justifyContent:'center',marginTop:-50,alignItems:'center'}}>
					<View style={{flexDirection:"row"}}>
						<IconFa style={{color:"#7f8c8d",alignSelf:"center"}} size={80} name="calendar-o"></IconFa>
						<View style={{alignSelf:"flex-end",marginLeft:10}}>
							<Text style={{fontWeight:"600", fontSize:35,color:"#7f8c8d"}}>No events</Text>
							<Text style={{fontWeight:"600", fontSize:35,color:"#7f8c8d"}}>created yet</Text>
						</View>
					</View>
				</View>
		}else{
			body = <ActivityIndicator
						style={{
						    alignItems: 'center',
						    justifyContent: 'center',
						    flex:1
						  }}
						  size="large"
					>
					</ActivityIndicator>
		}
		return(
			<View style={{flex:1}}>
				{body}
				<Navbar
					navigator={this.props.navigator} 
					title='Events'
					hasScrollView={true}
					minHeight={NAVBAR_HEIGHT}
					maxHeight={300}
					gradient={{
						default:'#1DBB96',
						stretched: '#43E2BD'
					}}
					scrollY={this.state.scrollY}
					disableBackButton={true}
					>
				</Navbar>
				<Modal position={"center"}
				ref={"send_email_modal"} backdrop={true} style={{height:200,width:300}}>
					<View
						id="modal-container"
						style={{
							flex:1,
							paddingTop:30
						}}
					>
						<Text style={{alignSelf:'center', fontWeight:'bold', fontSize:20}}>Delete the event?</Text>
						<View
							style={{flex:1,justifyContent:'flex-end',padding:20}}
						>

						<View style={{flexDirection:'row',justifyContent:'space-around'}}>
							<TouchableOpacity onPress={() => {
								this.props.deleteEvent(this.state.eventIdToDelete);
								this.closeModal();
							}}>
									<View
										id="cancel-button"
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
										id="send-button"
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
				<ActionButton
				buttonColor="rgba(0,188,150,1)"
				backgroundTappable={true}
				onPress={this._goToAddEventPage.bind(this)}></ActionButton>
			</View>

		)
	}


	_handleAddEventPop(events){
		const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
		this.setState({dataSource:ds.cloneWithRows(events),events:events});
	}

	_goToAddEventPage(){
		this.props.navigator.push({
			id:"AddEventPage",
			name:"Add Event Page",
			events: this.state.events,
			onAddEventPop: this._handleAddEventPop.bind(this)
		})
	}
}

const styles = StyleSheet.create({
	list_view:{
		backgroundColor:"#FFF",
		flex:1,
		marginTop:NAVBAR_HEIGHT
	},
	arrow_back_and_list:{
		flexDirection:"row",
		justifyContent: 'space-between',
	},
	shadow:{
		shadowOffset:{
          width:0,
          height:0
        },
   		shadowColor:'black',
    	shadowOpacity:0.2
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
		justifyContent:'space-between',
		marginTop:10
	},
	event_list:{
	},
	title:{
		color: '#FFF',
		fontWeight: 'bold',
		fontSize: 45,
		marginLeft: 10,
	},
	arrow_back:{
		marginBottom: 10,
	},
	options_more:{
		alignItems: 'flex-end'
	},
	header:{
		height: 75,
		backgroundColor: '#1DBB96',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	events:{
		alignSelf: 'center',
		marginTop: 10,
		fontSize: 30,
		fontWeight: 'bold',
		color: 'white',
	},
})

function mapStateToProps(state){
	return {
		events: state.events
	};
}

export default connect(mapStateToProps)(EventPage)

