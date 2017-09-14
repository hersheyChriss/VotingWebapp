import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import Header from '../../Components/Header/Header';
import teal700 from 'material-ui/styles/colors';

class Create extends Component{
	constructor(props){
		super(props);

		this.state = {
			poll: '',
			numWinners: '',
			candidate: '',
			candidateList: []
		};

		this.styles = {
			list: {
				width: '75%',
				margin: '0 auto',
			},
			candidate: {
        		margin: 10,
      		},
      		wrapper: {
        		display: 'flex',
        		flexWrap: 'wrap',
     		},
     		button: {
     			margin: 12,
     		},
		};
	}

	handleNameChange = (e) => {
		this.setState({poll: e.target.value});
	};

	handleNumberChange = (e) => {
		this.setState({numWinners: e.target.value});
	};

	handleCandidateChange = (e) => {
		this.setState({candidate: e.target.value});
	};

	handleKeyPress = (e) => {
		if(e.key == 'Enter'){
			var candidateObj = {};
			candidateObj.key = this.state.candidateList.length;
			candidateObj.value = this.state.candidate;
			var listCopy = this.state.candidateList.slice();
			listCopy.push(candidateObj);
			this.setState({candidateList: listCopy});
			this.setState({candidate: ""});
  		}
	};

	handleRequestDelete = (e) => {
		this.candidateList = this.state.candidateList;
		const candidateToDelete = this.candidateList.map((candidate) => candidate.e).indexOf(e);
		this.candidateList.splice(candidateToDelete, 1);
		this.setState({candidateList: this.candidateList});
		for (var count = 1; count <= this.state.candidateList.length; count++){
			this.state.candidateList[this.state.candidateList.length - count].e = this.state.candidateList.length - count;
		}
	};	

	handleClick = (e) => {
		var object = {};
		object.pollName = this.state.poll;
		object.numWinners = this.state.numWinners;
		var list = [];
		for (var element = 0; element < this.state.candidateList.length; element++){
			list.push(this.state.candidateList[element].value);
		}
		object.pollCandidates = list;
		console.log(object);
	}

  	renderChip(data) {
    	return (
     		<Chip
      	  		key={data.key}
       	 		onRequestDelete={() => this.handleRequestDelete(data.key)}
       	 		style={this.styles.candidate}
     	 	>
       	 		{data.value}
     	 	</Chip>
    	);
  	}

	render() {
		return(
			<div>
				<Header	title = 'Create Poll'/>

				<div style={this.styles.list} >
					<TextField
	      			floatingLabelText="Poll Name"
	      			type = 'string'
	      			fullWidth = {true}
	      			value = {this.state.poll}
	      			onChange={this.handleNameChange}
	    			/><br />

	    			<TextField
	      			floatingLabelText="Number of Winners"
	      			type = 'number'
	      			fullWidth = {true}
	      			value = {this.state.numWinners}
	      			onChange={this.handleNumberChange}
	    			/><br />

					<TextField
	      			floatingLabelText="Candidates"
	      			type = 'string'
	      			fullWidth = {true}
	      			value = {this.state.candidate}
	      			onChange={this.handleCandidateChange}
	      			onKeyPress={this.handleKeyPress}
	    			/><br />

	    			<div style={this.styles.wrapper}>
        				{this.state.candidateList.map(this.renderChip, this)}
     				</div>

     				<RaisedButton 
	    			label="Submit" 
	    			style={this.styles.button}
	    			primary={true}
	    			onClick = {this.handleClick}
	    			/>
	    		</div>
	    	</div>
	    );
	}
}

export default Create;