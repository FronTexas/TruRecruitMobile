import React,{Component} from 'react';

import {
	View,
	Animated
} from 'react-native';

export default class FadeInOut extends Component{
	constructor(props){
		super(props);
		this.state = 
		{
	      view: this.props.children,
	      opacity: new Animated.Value(this.props.isVisible ? 1 : 0)
	    };
	}

	componentWillReceiveProps(nextProps){
		var isVisible = this.props.isVisible;
		var shouldBeVisible = nextProps.isVisible;

		if (isVisible && !shouldBeVisible){
			Animated.timing(this.state.opacity,{
				toValue:0,
				duration: 200
			}).start()
		}

		if(!isVisible && shouldBeVisible){
			Animated.timing(this.state.opacity,{
				toValue: 1, 
				duration:200
			}).start()
		}
	}

	insertView(){
		this.setState({
			view: this.props.children
		})
	}	

	removeView(){
		this.setState({
			view:null
		})
	}

	render(){
		return (<Animated.View
			pointerEvents={this.props.isVisible ? 'auto' : 'none'}
			style={[
				this.props.style,
				{
					opacity: this.state.opacity,
					flex:1
				}
			]}
		>
			{this.state.view}
		</Animated.View>)
	}
}
