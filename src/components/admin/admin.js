import moment from 'moment';

import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import $, {jQuery} from 'jquery';
import { Tag, message, Upload, List, Avatar, Row, Col, Select, Card, Input, Menu, Affix, Button, Icon, Divider } from 'antd/lib/';


import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



import { BrowserRouter,Switch, Route ,Link } from 'react-router-dom';

import 'antd/dist/antd.css';
import '../../static/admin.css';



const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Option = Select.Option;	

// ============= 文章管理 ==============




class DeleteButton extends React.Component {
  constructor(props){
    super(props);
    this.delete = this.delete.bind(this);
  }
  delete(){
    $.ajax({
      url: '/deleteBlog',
      type: 'POST',
      dataType: 'json',
      data:{"number": this.props.data},
      success: data => {
        message.success("成功删除博客" + this.props.data);
      },
    });
  }

  render(){
    return(
      <div>
        <a onClick = {this.delete}>删除</a>
      </div>
    )
  }


}



class AManager extends React.Component {
  constructor(){
    super();
    
    this.state = {
      data: [],
    };
    this.get = this.get.bind(this); //把This传给get();
    this.componentDidMount = () => {
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
              img: data[i].img,
              number: data[i].number,
              description: data[i].description,
            });
            
          }
          this.setState({
              data:t_data,
            });
        }
      });
    }
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
            img: data[i].img,
            number: data[i].number,
            description: data[i].description,
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
      <Button type="primary"  onClick={this.get}><Icon type="download" />更新博客列表</Button>
      <List
        itemLayout="horizontal"
        dataSource={this.state.data}
        renderItem={item => (
          <List.Item actions={[<DeleteButton data={item.number}/>]}>
            <List.Item.Meta
              avatar={<Avatar src={item.img} />}
              title={<a href="#">{item.title} </a>}
              description={<p>{item.description} </p>}>
              </List.Item.Meta>
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


const blog = {
  "number": String,
  "date": String,
  "location": String,
  "title": String,
  "kind": String,
  "content": String,
  "img": String,
  "description": String,
  "good":String,
};
class BlogUpload extends React.Component {
  constructor(){
    super();
    this.state={
    }
    this.test = this.test.bind(this);

  }

  test(){

    blog.date = moment(new Date()).format('LLLL');
    blog.title = $("#aeb-title").val().toString();
    blog.location = $("#aeb-location").val();
    blog.description = $("#aeb-description").val();
    blog.content = $('.ql-editor').html();
    blog.good = '0';
    $.ajax({
      url: '/getBlog',
      type: 'GET',
      dataType: 'json',
      success: data => {
        let i = data.length;
        blog.number = i;
        $.ajax({
          url: '/addBlog',
          type: 'POST',
          dataType: 'json',
          data: blog,
          success: () => {
            message.success('成功上传博客' + data.length);
          }
        });
      },

    });
    
    
    
    

    console.log(blog);
    
    

  }
  render(){
    return (
      <div className="a-editor-title-part">
        <Button id="a-editor-button" type="primary" onClick={this.test}><Icon type="upload"/>发布文章</Button>
      </div>
    )
  }

}

const props = {
  name: 'file',
  action: '/uploadImg',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      console.log(info.file.response.data.url);
      blog.img = info.file.response.data.url;

    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
class ImgUpload extends React.Component{
  constructor(props) {
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
  }
  handleUpload(){
  }
  render(){
    return(
      <div className="a-editor-upload a-editor-title-part">
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Click to Upload
          </Button>
        </Upload>
      </div>
    )
  }
  
}




class ASelect extends React.Component {
	constructor(props) {
		super(props);
    blog.kind = 'Web';
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(value) {
    blog.kind = value;
	}
	render() {
		return (
			<div className="a-editor-title-part">
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
  					<Col span={9}>
              <Input  id="aeb-title" className="a-editor-title-part a-editor-title-part-title" placeholder="文章标题" />
              <Input  id="aeb-location" className="a-editor-title-part" placeholder="地理位置" />
              <Input  id="aeb-description" className="a-editor-title-part" placeholder="文章简介" />
              <ASelect />
              <ImgUpload />
              
              <BlogUpload />

  					</Col>
            <Col span={1}>
            </Col>
  					<Col span={14}>
              <div className="a-editor-quill">
                <ReactQuill placeholder={`开始你的文章撰写`} value={this.state.text} onChange={this.handleChange} />
              </div>
    				</Col>  
    			</Row>
			  </div>
    	</div>
      
    )
  }
}









const Content = () => (
	<main>
		<Switch>
	      <Route exact path='/admin/' component={Manager}/>
	      <Route path='/admin/editor' component={Editor}/>
	      <Route path='/admin/manager' component={Manager}/>
	    </Switch>
	</main>
)


// ======= HEADER ===============
class Slider extends React.Component {
  
  render() {
    return (
      <Menu
      	className="a-slider"
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['4']}
        defaultOpenKeys={['sub2']}
        mode="inline"
      >
        <SubMenu key="sub1" title={<span><Icon type="code-o" /><span>Portfolio</span></span>}>
            <Menu.Item key="1">添加项目</Menu.Item>
            <Menu.Item key="2">管理项目</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="book" /><span>Blog</span></span>}>
          <Menu.Item key="3"><Link to='/admin/editor'>文章撰写</Link></Menu.Item>
          <Menu.Item key="4"><Link to='/admin/manager'>文章管理</Link></Menu.Item>
          
        </SubMenu>
        <SubMenu key="sub3" title={<span><Icon type="folder" /><span>Asset</span></span>}>
          <Menu.Item key="5">资源上传</Menu.Item>
          <Menu.Item key="6">资源管理</Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" title={<span><Icon type="mobile" /><span>Contact</span></span>}>
          <Menu.Item key="7">联系方式编辑</Menu.Item>
          <Menu.Item key="8">网站管理</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}



class ANav extends React.Component {
	render(){
		return (
			<Menu className="a-nav" mode="horizontal">
        <Button type="dashed">  
          <Link to='/'><Icon type="home"/>HOME</Link>
        </Button>
			</Menu>
		)
	}
}


const Header = () => (
	<div>
		<ANav />
		<Slider />
	</div>
);


const Admin = () => (
  
	  <div>
	    <Header />
    	<Content />
	  </div>
);

module.exports = {
	Admin: Admin,
}