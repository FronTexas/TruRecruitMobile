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

import Icon from 'react-native-vector-icons/Ionicons';
import IconFa from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating'

export default class AttendeeProfilePage extends Component
{
	_onStartingPress(rating){
		return
	}

	_handlePress(){
		return
	}
	render()
	{
		return(
			<ScrollView style={styles.container}>
				<View style={styles.profpic_and_name}>
					<Icon name="ios-contact" size={60} style={styles.profpic}></Icon>
					<Text style={styles.name}>{this.props.attendee.attendee_name}</Text>
					<Text style={styles.graduation}>{this.props.attendee.attendee_summary}</Text>
				</View>
				<View style={styles.links_and_resume}>
					<View style={styles.links}>
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
						>
						<Image style={styles.resume_preview} source={require("./img/fron_resume.jpg")}></Image>
					</TouchableOpacity>
				</View>
				<View style={styles.rate_area}>
					<Text style={styles.rate_text}>
						Rate the candidate
					</Text>
					<View style={{width:200}}>
						<StarRating
							maxStars={5}
							rating={3}
							selectedStar={(rating) => this._onStartingPress(rating)}
							starSize={30}
							starColor="#F5C87F"
							emptyStarColor="#CCCCCC"
							></StarRating>
					</View>
				</View>
				<TouchableOpacity
					onPress={() => {this.props.onAttendeePop(); this.props.navigator.pop()}}
				>
					<View style={styles.save_button_area}>
						<View style={styles.save_button}>
					    	<Text style={styles.save_text}>Save</Text>
					    </View>
					</View>
				</TouchableOpacity>
				
			</ScrollView>
		)
	}
}


const styles = StyleSheet.create({
	container:{
		backgroundColor:"#EEF1F7",
	},
	profpic_and_name:{
		backgroundColor: "#1DBB96",
		padding:20,
		justifyContent: 'flex-end'
	},
	profpic:{
		color:"#FFF",
		marginTop:30,
	},
	name:{
		color:"#FFF",
		fontWeight:"bold",
		fontSize:30
	},
	graduation:{
		color:"#FFF",
		fontSize:20
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
		borderRadius: 3,
		marginTop:10,
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