import React, { Component } from "react";
import Particles from "react-tsparticles";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import tomoe from "./cloud.png";
import "./App.css";
import sharinganSound from "./Sharingan.mp3";

const particles = {
	detectRetina: true,
	fpsLimit: 60,
	particles: {
		rotate: {
			value: 0,
			random: true,
			direction: "clockwise",
			animation: {
				enable: true,
				speed: 5,
				sync: true,
			},
		},
		move: {
			attract: {
				enable: false,
				rotateX: 600,
				rotateY: 1200,
			},
			bounce: false,
			direction: "none",
			enable: true,
			outMode: "bounce",
			random: false,
			speed: 2,
			straight: false,
		},
		number: {
			density: {
				enable: true,
				area: 800,
			},
			limit: 0,
			value: 50,
		},
		opacity: {
			animation: {
				enable: false,
				minimumValue: 0.1,
				speed: 1,
				sync: false,
			},
			random: false,
			value: 0.5,
		},
		shape: {
			character: {
				fill: false,
				font: "Verdana",
				style: "",
				value: "*",
				weight: "400",
			},
			image: [
				{
					src: tomoe,
					width: 100,
					height: 100,
				},
			],
			polygon: {
				nb_sides: 1,
			},
			stroke: {
				color: "#000000",
				width: 0,
			},
			type: "image",
		},
		size: {
			animation: {
				enable: false,
				minimumValue: 0.1,
				speed: 40,
				sync: false,
			},
			random: false,
			value: 16,
		},
	},
	polygon: {
		draw: {
			enable: false,
			lineColor: "#ffffff",
			lineWidth: 0.5,
		},
		move: {
			radius: 10,
		},
		scale: 1,
		type: "none",
		url: "",
	},
};

function playAudio() {
	new Audio(sharinganSound).play();
}

const initialState = {
	input: "",
	imageUrl: "",
	box: {},
	route: "signin",
	isSignedIn: false,
	user: {
		id: "",
		email: "",
		name: "",
		entries: 0,
		joined: "",
	},
};

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: "",
			imageUrl: "",
			box: {},
			route: "signin",
			isSignedIn: false,
			user: {
				id: "",
				email: "",
				name: "",
				entries: 0,
				joined: "",
			},
		};
	}

	loadUser = (data) => {
		this.setState({
			user: {
				id: data.id,
				email: data.email,
				name: data.name,
				entries: data.entries,
				joined: data.joined,
			},
		});
	};

	CalculateFaceLocation = (data) => {
		const clarifaiFace =
			data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById("inputImage");
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height,
		};
	};

	DisplayFaceBox = (box) => {
		this.setState({ box: box });
	};

	OnInputChange = (event) => {
		this.setState({ input: event.target.value });
	};
	OnButtonSubmit = () => {
		this.setState({ imageUrl: this.state.input });
		fetch("https://nameless-brook-81130.herokuapp.com/imageurl", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				input: this.state.input,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response) {
					fetch("https://nameless-brook-81130.herokuapp.com/image", {
						method: "put",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							id: this.state.user.id,
						}),
					})
						.then((response) => response.json())
						.then((count) => {
							playAudio();
							this.setState(Object.assign(this.state.user, { entries: count }));
						})
						.catch(console.log);
				}
				this.DisplayFaceBox(this.CalculateFaceLocation(response));
			})
			.catch((err) => console.log(err));
	};

	onRouteChange = (route) => {
		if (route === "signout") {
			this.setState(initialState);
		} else if (route === "home") {
			this.setState({ isSignedIn: true });
		}
		this.setState({ route: route });
	};

	render() {
		const { isSignedIn, imageUrl, route, box } = this.state;
		return (
			<div className='App'>
				<Particles className='particles' params={particles} />
				<Navigation
					isSignedIn={isSignedIn}
					onRouteChange={this.onRouteChange}
				/>
				{route === "home" ? (
					<div>
						<Logo />
						<Rank
							name={this.state.user.name}
							entries={this.state.user.entries}
						/>
						<ImageLinkForm
							OnInputChange={this.OnInputChange}
							OnButtonSubmit={this.OnButtonSubmit}
						/>
						<FaceRecognition box={box} imageUrl={imageUrl} />
					</div>
				) : route === "signin" ? (
					<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
				) : (
					<Register
						loadUser={this.loadUser}
						onRouteChange={this.onRouteChange}
					/>
				)}
			</div>
		);
	}
}

export default App;
