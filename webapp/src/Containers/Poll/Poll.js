import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import Card from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import s from './Poll.css';
import Header from '../../Components/Header/Header';

const SortableItem = SortableElement(({value}) =>
  <Paper style={{width: '100%', margin: '20px 0px 20px auto', height: 100}}>
  	<p style={{fontSize: '2em'}}>{value}</p>
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
			items: ['Green', 'Yellow', 'Red', 'Blue'],
			show: false,
		}

		this.styles = {
			list: {
				width: '50%',
				margin: '0 auto',
			},
			paper: {
				margin: 10,
				width: '50%',
			}
		}
	}

	onSortEnd = ({oldIndex, newIndex}) => {
	    this.setState({
	    	items: arrayMove(this.state.items, oldIndex, newIndex),
	    });
	 };


	render() {
	console.log(s.list);
		return (
			<div>
				<Header title="Vote" />
				<div style={this.styles.list} >
					<SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
				</div>
					

			</div>
		);
	}
}

export default Poll;