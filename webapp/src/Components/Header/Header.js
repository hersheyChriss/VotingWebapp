import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div>
				<AppBar
				    title={this.props.title}
				    iconClassNameRight="muidocs-icon-navigation-expand-more"
				/>
			</div>
		);
	}
}

export default Header;
