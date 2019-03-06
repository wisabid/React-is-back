import React from 'react';

const User = (props) => {
	let age = props.age?props.age:'NA'
	if (props.children) {
		return (
			<li>{props.children} | {age}</li>
			)
		}
		else {
			return (
				<li style={{color:"orange"}}>No name found</li>
				)
		}
}

export default User;