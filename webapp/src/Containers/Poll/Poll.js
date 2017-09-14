import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import s from './Poll.css';

const SortableItem = SortableElement(({value}) =>
  <ListItem primaryText={value}></ListItem>
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
		}

		this.styles = {
			list: {
				width: '50%',
				margin: '0 auto',
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
				<AppBar
				    title="Vote"
				    iconClassNameRight="muidocs-icon-navigation-expand-more"
				/>
				<Paper style={this.styles.list} zDepth={2} >
					<SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
				</Paper>
			</div>
		);
	}
}

export default Poll;