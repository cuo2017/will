import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import {  Icon } from 'antd/lib/';
import '../static/style.css';

const TITLE = 'Welcome';
const SLOGAN = `To Will's Personal Web`;
const OPTION_1 = 'PORTFOLIO';
const OPTION_2 = 'BLOG';
const OPTION_3 = 'ASSET';
const OPTION_4 = 'ADMIN';

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
        <p ><Link id="blog" to='/blog'><Icon className="icon" type="book"/>{OPTION_2}</Link></p>
        {/*<p id="blog"><Link to='/'><Icon className="icon" type="book"/>{OPTION_2}</Link></p>*/}
      </div>
    </div><div className="button">
      <div className="button-content">
        <p><Link to='/'><Icon className="icon" type="bulb"/>{OPTION_3}</Link></p>
      </div>
    </div><div className="button">
      <div className="button-content">
        <p><Link to='/admin'><Icon className="icon" type="message"/>{OPTION_4}</Link></p>
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
);
module.exports = {
	Will:Will,
}

  