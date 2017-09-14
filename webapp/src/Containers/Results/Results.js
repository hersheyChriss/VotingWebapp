import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Header from '../../Components/Header/Header';
import Divider from 'material-ui/Divider';


class Results extends Component{
	constructor(props){
		super(props);

		this.state = {
			winnerWinnerChickenDinners: [['1']['Team1', 'Team2'], ['2']['Team3'], ['3']['Team4']]
		};

		this.styles = {
			list: {
				width: '75%',
				margin: '0 auto',
			},
		}
	}

	render() {
		return(
			<div>
				<Header	title = 'Results'/>
				<div style={this.styles.list} >	
				    <List>
	      				<ListItem 
	      					primaryText="First"  
	      					disabled = {true}
	      					initiallyOpen = {true}
	      					nestedItems={[
				                <ListItem
				                	disabled = {true}
				                  	key={1}
				                  	primaryText="Team1"
				                />,
				                <ListItem
				                	disabled = {true}
				                  	key={2}
				                  	primaryText="Team2"
				                />,
			                ]}
			            />
	      				<Divider />

	      				<ListItem 
	      					primaryText="Second"
	      					disabled = {true}
	      				/>
	      				<Divider />
	     				<ListItem 
	     					primaryText="Third"
	     					disabled = {true}  
	     				/>
	    			</List>
	    		</div>
			</div>
		);
	}
}
export default Results;