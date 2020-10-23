import React from "react";
import "./ImageLinkForm.css";
import sharingan from "../Logo/Sharing-color.png";

const ImageLinkForm = ({ OnInputChange, OnButtonSubmit }) => {
	return (
		<div>
			<p className='f3 white'>{"Activate the sharingan to detect faces"}</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input
						className='f4 pa2 w-80 center'
						type='text'
						onChange={OnInputChange}
					/>
					<button className='w-10 grow center dib ' onClick={OnButtonSubmit}>
						<img className='sharingan' src={sharingan} alt='' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ImageLinkForm;
