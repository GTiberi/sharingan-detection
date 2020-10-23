import React from "react";
import Tilty from "react-tilty";
import sharingan from "./Uchiha_Sym_Tr.png";
import "./Logo.css";

const Logo = () => {
	return (
		<div className='ma4 mt0'>
			<Tilty
				className='Tilt br2 shadow-2'
				options={{ max: 45 }}
				style={{ height: 150, width: 150 }}
			>
				<div className='Tilt-inner pa3'>
					<img src={sharingan} alt='Logo' />
				</div>
			</Tilty>
		</div>
	);
};
export default Logo;
