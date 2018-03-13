
import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import {  Icon } from 'antd/lib/';
import 'antd/dist/antd.css';

import { BrowserRouter,Switch, Route } from 'react-router-dom';

// import update from 'react-addons-update'; 
//Immutability

// import PureRenderMixin from 'react-addons-pure-render-mixin';

import { Will } from '../components/front.js';
import { Admin } from '../components/admin/admin.js';
import { Blog } from '../components/blog/blog.js';


const MainContent = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Will}/>
      <Route path='/admin' component={Admin}/>
      <Route path='/blog' component={Blog}>
      </Route>
    </Switch>
  </main>
);

const App = () => (
	<div>
    <MainContent />
	</div>
);




ReactDOM.render(
  <BrowserRouter>
	 <App />
  </BrowserRouter>,
	document.getElementById('app')
);

// ======== loading ============

