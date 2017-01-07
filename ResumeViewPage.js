import React, { Component } from 'react';
import {
	StyleSheet,
	ScrollView,
	ListView,
	View,
	Text,
	Image,
	TextInput,
	Dimensions,
	Button,
	WebView,
	TouchableOpacity
} from 'react-native';

import PDFView from 'react-native-pdf-view';
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons';

export default class ResumeViewPage extends Component{

	constructor(props){
		super(props);
		this.state = 
		{
			isNoteTakingMode : false
		}
	}

	_onNoteTakingActionPress(){
		this.setState({isNoteTakingMode:!this.state.isNoteTakingMode})
	}
	render(){
		const noteTakingView = this.state.isNoteTakingMode ? 
			<ScrollView style={styles.noteTakingScrollView}>
					<View style={{justifyContent:'space-between',top:20,flexDirection:'row',padding:10}}>
						<Text style={styles.noteTakingModeText}>Note taking mode</Text>
						<TouchableOpacity 
							onPress={() => this.setState({isNoteTakingMode:!this.state.isNoteTakingMode})}
						>
							<Text style={styles.doneText}>Done</Text>
						</TouchableOpacity>
					</View>
					<TextInput
			        	style={styles.note_textInput}
				        onChangeText={(text) => this.setState({text})}
				        value={this.state.text}
				        multiline={true}
				        placeholder={'Starts Typing Here'}
				          placeholderTextColor="white"

				    >
				    </TextInput>			
			</ScrollView>
			
			: <View></View>
		const actionButton = !this.state.isNoteTakingMode ? 
		<ActionButton 
				buttonColor="rgba(0,188,150,1)"
				backgroundTappable={true}
				onPress={this._onNoteTakingActionPress.bind(this)}
				icon={<Icon name={'md-create'} style={styles.takeNoteIcon} size={20}></Icon>}></ActionButton>
		: <View></View>
		return(
		<View style={{flex:1,backgroundColor:"#FFF"}}>
			<WebView 
				source={{uri:'resume.pdf'}}
				scalesPageToFit={true}>
			</WebView>
			{noteTakingView}	
			{actionButton}
		</View>
		)
	
	}
}

const styles = StyleSheet.create({
	takeNoteIcon:{
		color:"#FFF"
	},
	PDFView:{
		flex:1
	},
	noteInput:{
		width:1000,
		height:1000
	},
	hello:{
		fontSize:50,
		color:"#FFF"
	},
	noteTakingScrollView:{
		position:'absolute',
		height:1000,
		width:Dimensions.get('window').width,
		top:0,
		backgroundColor:"#000",
		opacity:0.9
	},
	note_textInput:{
		color:"#FFF",
		top:35,
		height:1000,
		width:Dimensions.get('window').width,
		borderWidth:1,
		fontSize:30,
		padding:10,
		fontWeight:"600",
	},
	noteTakingModeText:{
		color:"#FFF",
		fontWeight:"600",
		padding:10,
		borderWidth:0.5,
		borderColor:"#FFF",
		borderRadius:5
	},
	doneText:{
		fontWeight:'600',
		color:"#FFF",
		fontSize:20,
		marginTop:10
	}

})