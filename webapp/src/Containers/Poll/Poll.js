import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Reorder from 'material-ui/svg-icons/action/reorder';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';
import axios from 'axios';

import s from './Poll.css';
import Header from '../../Components/Header/Header';

const DragHandle = SortableHandle(() => <Reorder style={{position: 'absolute', right: '2%'}} />);

const SortableItem = SortableElement(({value}) =>
  <Paper style={{width: '100%', margin: '20px 0px 20px auto', height: '4em'}}>
  	<div style={{height: '100%', margin: '0 auto', display: 'flex', alignItems: 'center', position: 'relative'}}>
  		<Toggle 
  			label={value.label}
  			style={{width: '85%', marginLeft: '2%'}}
  			iconStyle={{display: 'none'}}
  			disabled={value.disabled}
  		>
  		</Toggle>
  		<DragHandle />
  	</div>
  </Paper>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <List>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </List>
  );
});

class Poll extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			items: [],
		}

		this.styles = {
			list: {
				width: '75%',
				margin: '0 auto',
			},
			paper: {
				margin: 10,
				width: '50%',
			},
			button: {
				float: 'right'
			}
		}
	}

	componentDidMount = () => {
		var pollId = this.props.match.params.id;
		axios.get('api/submit_vote', {pollId: pollId})
			.then(response => {
				this.createItems(response.data.candidates);
				this.setState({title: response.data.pollName});
			})
			.catch(error => {
				console.log(error)
			});
	}

	createItems = (candidates) => {
		var items = [];
		for (var i = 0; i < candidates.length; i++) {
			var item = {};
			item.disabled = true;
			item.label = candidates[i];
			items.push(item);
		}
		this.setState({items: items});
	}

	onSortEnd = ({oldIndex, newIndex}) => {
		if (newIndex > oldIndex) {
			for (var i = newIndex; i >= 0; i--) {
				this.state.items[i].disabled = false;
			}
		}
		else {
			this.state.items[oldIndex].disabled = false;
			for (var i = newIndex - 1; i >= 0; i--) {
				this.state.items[i].disabled = false;
			} 
		}
	    this.setState({
	    	items: arrayMove(this.state.items, oldIndex, newIndex),
	    });
	 };

	 handleClick = () => {
	 	var resultObj = {};
		for (var i =  0; i < this.state.items.length; i++) {
			if (!this.state.items[i].disabled) {
				resultObj[i + 1] = this.state.items[i].label;
			}
			else {
				break;
			}
		}
		console.log(resultObj);
	 }


	render() {

		return (
			<div>
				<Header title="Vote" />
				<div style={this.styles.list} >
					<SortableList useDragHandle={true} items={this.state.items} onSortEnd={this.onSortEnd} />
					<RaisedButton primary={true} style={this.styles.button} label="submit" onClick={this.handleClick} />
				</div>
					

			</div>
		);
	}
}

export default Poll;