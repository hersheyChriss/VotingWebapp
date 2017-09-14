import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import './Poll.css';

const SortableItem = SortableElement(({value}) =>
  <li>{value}</li>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

class Poll extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: ['Green', 'Yellow', 'Red', 'Blue'],
		}
	}

	onSortEnd = ({oldIndex, newIndex}) => {
	    this.setState({
	    	items: arrayMove(this.state.items, oldIndex, newIndex),
	    });
	 };

	render() {
		return (
			<div>
				<AppBar
				    title="Vote"
				    iconClassNameRight="muidocs-icon-navigation-expand-more"
				/>
				<SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
			</div>
		);
	}
}

export default Poll;