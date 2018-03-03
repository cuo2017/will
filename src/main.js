import React , { Component } from "react";
import ReactDOM from "react-dom";
import { Affix, Button, Icon, Divider } from 'antd/lib/';
import 'antd/dist/antd.css';
import { BrowserRouter,Switch, Route ,Link } from 'react-router-dom';
import $ from 'jquery';


import './style.css';


const TITLE = 'Welcome';
const SLOGAN = `To Will's Personal Web`;
const OPTION_1 = 'PORTFOLIO';
const OPTION_2 = 'BLOG';
const OPTION_3 = 'ASSET';
const OPTION_4 = 'CONTACT';

// Components for Front

const Board = () => (
	<div className="front">
		<div className="front-title">
			<div className="title">
				<h1>{TITLE}</h1>
				<h2>{SLOGAN}</h2>
			</div>
		</div>
		<div className="front-option">
			<div className="button">
				<div className="button-content">
					
					<p><Link to='/'><Icon className="icon" type="code-o"/>{OPTION_1}</Link></p>
				</div>
			</div>
			<div className="button">
				<div className="button-content">
					{/*<p ><Link id="blog" to='/blog'><Icon className="icon" type="book"/>{OPTION_2}</Link></p>*/}
					<p id="blog"><Icon className="icon" type="book"/>{OPTION_2}</p>
				</div>
			</div><div className="button">
				<div className="button-content">
					<p><Link to='/'><Icon className="icon" type="bulb"/>{OPTION_3}</Link></p>
				</div>
			</div><div className="button">
				<div className="button-content">
					<p><Link to='/'><Icon className="icon" type="message"/>{OPTION_4}</Link></p>
				</div>
			</div>
		</div>
	</div>
)

const Foot = () => (
		<div className="footer">
			<p> <Icon type="copyright" /> 2018 C.U.O studio </p>
		</div>
)
const Will = () => ( 
	<div>
		<Board />
		<Foot />
	</div>
)


// Components for BLOG



// ========== router =========

// const Main = () => (
// 	<main>
//     	<Switch>
//       		<Route exact path='/blog' exec = { blog()} />
//     	</Switch>
//   	</main>	
// )


const App = () => (
	<div>
		<Will />
		{/*<Main />*/}
	</div>
)


// ========== render =========
					
ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
	,
	document.getElementById('app')
);


$("#blog").click(function(event) {


	/* Act on the event */

	// =========== Components for Blog =======
	const Panel = () => (
		<div className="b-Panel">
			<Affix>
				<Button id="home" type="primary"><Icon type="home" /></Button>
			</Affix>
		</div>
	);

	const Blog = () => (
		<div>
			<Panel />
		</div>
	);


	// ============ render =============

	ReactDOM.render(
		<BrowserRouter>
			<Blog />
		</BrowserRouter>
		,
		document.getElementById('app')
	);


	// ============== Go Back ===========
	$("#home").click(function(event) {
		/* Act on the event */
		ReactDOM.render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
			,
			document.getElementById('app')
		);
	});

});



