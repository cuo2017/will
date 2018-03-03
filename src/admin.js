import React , { Component } from 'react';
import ReactDOM from "react-dom";
import $ from 'jquery';
import { List, Avatar, Row, Col, Select, Card, Input, Menu, Affix, Button, Icon, Divider } from 'antd/lib/';
import 'antd/dist/antd.css';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { BrowserRouter,Switch, Route ,Link } from 'react-router-dom';

import './admin.css';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Option = Select.Option;	








// ========= Components ===========


// ============= 文章管理 ==============




class AManager extends React.Component {
  constructor(){
    super();
    this.state = {
      data: [],
    };
    this.get = this.get.bind(this); //把This传给get();

  }
  get(){
    $.ajax({
      url: '/getBlog',
      type: 'GET',
      dataType: 'json',
      success: data => {
        // this.setState({data:data[0].number});
         let t_data= [];
        for(let i=0;i<data.length;i++){
          
          t_data.push({
            number: data[i].number,
            title: data[i].title,
            content: data[i].content,
          });
          
        }
        this.setState({
            data:t_data,
          });

      }
    });
  }
  render() {
    return (<div>
      <Button type="primary"  onClick={this.get}><Icon type="download" />获取博客列表</Button>
      <List
        itemLayout="horizontal"
        dataSource={this.state.data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a href="#">{item.title}</a>}
              description={item.content}
            />
          </List.Item>
        )}
      />
    </div>)
  }
    
}

const Manager = () => (
  <div className="a-manager">
      <AManager />
  </div>
);



// ============== 文章编辑器 ================

class ASelect extends React.Component {
	constructor(props) {
		super(props)
		this.state = { text: ''}
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(value) {
	    this.setState({ text: value })
	}
	render() {
		return (
			<div>
			    <Select defaultValue="Web" style={{ width: 150 }} onChange={this.handleChange}>
			      	<Option value="Web"><Icon type="global" /><Divider type="vertical"></Divider>Web</Option>
			      	<Option value="App"><Icon type="mobile" /><Divider type="vertical"></Divider>App</Option>
				    <Option value="Sports"><Icon type="dribbble" /><Divider type="vertical"></Divider>Sports</Option>
				    <Option value="Analysis"><Icon type="area-chart" /><Divider type="vertical"></Divider>Analysis</Option>
			    </Select>
			</div>
		)
	}
}


class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '' } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
  }
 
  handleChange(value) {
    this.setState({ text: value })
  }

 
  render() {
    return (
    	<div className="a-editor">
    		<Divider>文章撰写</Divider>
    		<div className="a-editor-title">
    			<Row>
    				<Col span={19}>
    					<Input  placeholder="文章标题" />
					</Col>
					<Col span={1}>
					</Col>
					<Col span={4}>
    					<ASelect/>
    				</Col>

    			</Row>
    			
			</div>
    		<div className="a-editor-quill">
    			<ReactQuill placeholder={`开始你的文章撰写`} value={this.state.text} onChange={this.handleChange} />
    		</div>
    		<Button id="a-editor-button" type="default"><Icon type="upload"/>上传</Button>
    	</div>
      
    )
  }
}


class Slider extends React.Component {
  
  render() {
    return (
      <Menu
      	className="a-slider"
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu key="sub1" title={<span><Icon type="code-o" /><span>Portfolio</span></span>}>
          <MenuItemGroup key="g1" title="Item 1">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="book" /><span>Blog</span></span>}>
          <Menu.Item key="5"><Link to='/editor'>文章管理</Link></Menu.Item>
          <Menu.Item key="6"><Link to='/manager'>文章撰写</Link></Menu.Item>
          
        </SubMenu>
        <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    );
  }
}



class ANav extends React.Component {
	render(){
		return (
			<div className="a-nav">
			</div>
		)
	}
}





// ========= Render ===============

const Content = () => (
	<main>
		<Switch>
      <Route exact path='/' component={Editor}/>
      <Route path='/editor' component={Editor}/>
      <Route path='/manager' component={Manager}/>
    </Switch>
	</main>
)

const Header = () => (
	<div>
		<ANav />
		<Slider />
	</div>
);



const App = () => (
	<div>
		<Header />
		<Content />
	</div>
);




ReactDOM.render(
  <BrowserRouter>
	 <App />
  </BrowserRouter>,
	document.getElementById('app')
);



// ReactDOM.render(
//   <List
//     itemLayout="vertical"
//     size="large"
//     pagination={pagination}
//     dataSource={listData}
//     renderItem={item => (
//       <List.Item
//         key={item.title}
//         actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
//         extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
//       >
//         <List.Item.Meta
//           avatar={<Avatar src={item.avatar} />}
//           title={<a href={item.href}>{item.title}</a>}
//           description={item.description}
//         />
//         {item.content}
//       </List.Item>
//     )}
//   />
// , document.getElementById('app'));