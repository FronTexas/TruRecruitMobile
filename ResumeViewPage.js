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
	TouchableOpacity,
	LayoutAnimation
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
		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
		this.setState({isNoteTakingMode:!this.state.isNoteTakingMode})
	}
	render(){
		scrollViewNoteTakingStyle = this.state.isNoteTakingMode? 
		{
			flex : 1, 
			height:1000,
			top:0,
		} :
		{
			flex : 0,
			height: 0
		}

		textInputNoteTakingStyle = this.state.isNoteTakingMode ? 
		{
			height: 1000, 
			padding: 10
		} :
		{
			height: 0,
			padding: 0
		}


		const noteTakingView = 
			<ScrollView style={[scrollViewNoteTakingStyle,
					{
						width:Dimensions.get('window').width, 
						position:'absolute',
						backgroundColor:"#000",
						opacity:0.9}]
					}>
					<View refs = 'noteTakingHeader' style={{justifyContent:'space-between',top:20,flexDirection:'row',padding:10}}>
						<Text style={{
							color:"#FFF",
							fontWeight:"600",
							padding:10,
							borderWidth:0.5,
							borderColor:"#FFF",
							borderRadius:5 }}>Note taking mode</Text>
						<TouchableOpacity 
							onPress={this._onNoteTakingActionPress.bind(this)}
						>
							<Text style={styles.doneText}>Done</Text>
						</TouchableOpacity>
					</View>
					<TextInput
			        	style={[textInputNoteTakingStyle , {width: Dimensions.get('window').width ,color: "#FFF", fontSize: 30, fontWeight: "600",top:35}]}
				        onChangeText={(text) => this.setState({text})}
				        value={this.state.text}
				        multiline={true}
				        placeholder={'Starts Typing Here'}
				        placeholderTextColor="white"
				    >
				    </TextInput>			
			</ScrollView>

		const actionButton = !this.state.isNoteTakingMode ? 
			<ActionButton 
					buttonColor="rgba(0,188,150,1)"
					backgroundTappable={true}
					onPress={this._onNoteTakingActionPress.bind(this)}
					icon={<Icon name={'md-create'} style={styles.takeNoteIcon} size={20}></Icon>}></ActionButton>
			: <View></View>


		return(
		<View style={{flex:1,backgroundColor:"#EEF1F7"}}>
			<WebView 
				source={{uri:'resume.pdf'}}
				scalesPageToFit={true}
				style={{backgroundColor:"#EEF1F7"}}
			>
			</WebView>
			<View
				style={
					{
						position:'absolute',
						top:30,
						width: Dimensions.get('window').width,
						paddingRight:20,
						alignItems:'flex-end'
					}
				}
			>
				<TouchableOpacity
					onPress={() => this.props.navigator.pop()}
				>
					<Text style={
					{
						fontSize:30,
						fontWeight:'600',
						color:"#FFF",
						backgroundColor:'rgba(52,52,52,0)',
						shadowOffset:{
							width:0,
							height:0
						},
						shadowColor:'black',
						shadowOpacity:0.5
					}
					}>Done</Text>
				</TouchableOpacity>
			
			</View>
			
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