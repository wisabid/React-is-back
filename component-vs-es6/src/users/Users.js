import React, { Component } from 'react';
import User from './User'

function Testing() {
	return (
		<p>I'am also a User</p>
		)
}

class Users extends Component {
	render() {
		return (
			<div>
				<h1>List of {this.props.title}</h1>
				<ul style={{listStyle:"none"}} alt="Always use double braces for style">
					<User age="2">Alfie</User>
					<User>Alvin</User>
					<User age="35">Abid</User>
					<Testing />
					<User></User>
					<User age="28">Shabz</User>
				</ul>				
			</div>
			)
	}
}

export default Users;