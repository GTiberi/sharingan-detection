import React from "react";

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const Rank = ({ name, entries }) => {
	return (
		<div>
			<div className='white f3'>{`${capitalizeFirstLetter(
				name
			)}, your current rank is...`}</div>
			<div className='white f1'>{entries}</div>
		</div>
	);
};
export default Rank;
