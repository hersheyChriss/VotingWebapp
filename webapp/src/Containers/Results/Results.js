import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Header from '../../Components/Header/Header';
import Divider from 'material-ui/Divider';
import axios from 'axios';


class Results extends Component{
	constructor(props){
		super(props);

		this.state = {
			winnerWinnerChickenDinners: {1:['Make Voting Great (Eventually)'], 2:['This Could be You!'], 3:['Example Team A','Example Team 73:)']},
			winnersList: [],
		};

		this.styles = {
			list: {
				width: '75%',
				margin: '0 auto',
			},
		}
	}

	componentDidMount = () => {
		axios.get('/api/get_ballot', {pollId: this.props.match.params.id})
			.then(response => {
				this.setState({winnerWinnerChickenDinners: response})
			})
  			.catch(error => {
    			console.log(error);
  			});
		this.createWinnerList();
	}

	createWinnerList(){
		this.setState({winnersList: Object.keys(this.state.winnerWinnerChickenDinners).map((key, i) => 
			<div> 
				<ListItem 
					primaryText={key}  
					initiallyOpen = {true}
					nestedItems={this.createNestedList(this.state.winnerWinnerChickenDinners[key])}
	        	/>
	        	<Divider />
			</div>
			)
		});
	}

	createNestedList = (participants) => {
		var nestedWinners = participants.map((participant, i) => 
			<ListItem
              	key={i}
              	disabled = {true}
               	primaryText={participant}
            />
		);
		return nestedWinners;
	}

	render() {
		return(
			<div>
				<Header	title = 'Results'/>
				<div style={this.styles.list} >	
				    <List>
	      				{this.state.winnersList}
	    			</List>
	    		</div>
			</div>
		);
	}
}
export default Results;