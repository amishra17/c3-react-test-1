import React from "react";
import PropTypes from 'prop-types'
import "./UserProfile.css";

export const UserProfile = props => {
	const containerID = `profile#${props.id}`
	return (
		<div id={containerID}>
			<div>
				<img className="avatar" src={props.avatar} alt=""/>
			</div>
			<div className="user-container">
				<div className="title">
					<label>
						{props.name}
					</label>
				</div>
				<div className="delete-btn">
	 				<a id={props.id} onClick={props.onDeleteClick}>Delete</a>
				</div>
			</div>
		</div>
		)
}

UserProfile.defaultProps = {
	id: 4,
	  name: "Eve Holt",
	  avatar:
	    "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
}

UserProfile.propTypes = {
	id: PropTypes.number,
	name: PropTypes.string,
	avatar: PropTypes.string
}