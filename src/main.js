import React , { Component } from "react";
import ReactDOM from "react-dom";
import { Icon,Divider } from 'antd';
import 'antd/dist/antd.css';



import './style.css';





const TITLE = 'Welcome';
const SLOGAN = `To Will's Personal Web`;
const OPTION_1 = 'PORTFOLIO';
const OPTION_2 = 'BLOG';
const OPTION_3 = 'ASSET';
const OPTION_4 = 'CONTACT';

// Components

// class Anime extends React.Component {
// 	render(){
// 		return (
// 			<Motion 
// 				defaultStyle={{x: 0}} 
// 				style={{x: spring(10)}}>
// 			  {value => <div>{value.x}</div>}
// 			</Motion>
// 			);
// 	}
// }

class Board extends React.Component {
	render(){
		return (
			<div className="front">
				<div className="front-title">
					<div className="title">
						<h1>{TITLE}</h1>
						<p>{SLOGAN}</p>
					</div>
				</div>
				<div className="front-option">
					<div className="button">
						<div className="button-content">
							
							<p><Icon className="icon" type="code-o"/>{OPTION_1}</p>
						</div>
					</div>
					<div className="button">
						<div className="button-content">
							<p><Icon className="icon" type="book"/>{OPTION_2}</p>
						</div>
					</div><div className="button">
						<div className="button-content">
							<p><Icon className="icon" type="bulb"/>{OPTION_3}</p>
						</div>
					</div><div className="button">
						<div className="button-content">
							<p><Icon className="icon" type="message"/>{OPTION_4}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


class Will extends React.Component {
	render(){
		return (
			<Board />
		);
	};
}
// ===========================
ReactDOM.render(
	<Will/>,
	document.getElementById('app')
	);