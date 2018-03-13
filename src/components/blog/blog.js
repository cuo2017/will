import moment from 'moment';

import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Tag, message, Upload, List, Avatar, Row, Col, Select, Card, Input, Menu, Affix, Button, Icon, Divider } from 'antd/lib/';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import 'lodash';

import { BrowserRouter,Switch, Route ,Link } from 'react-router-dom';

import 'antd/dist/antd.css';
import '../../static/blog.css';

// ========= Blog =================

class BlogHeader extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      current: 'all',
    }
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(e){
    this.setState({
      current: e.key,
    });
  }
  render(){
    return(
        <Menu className="blog-header"
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal">
          <Menu.Item key="home">  
            <Link to='/'><Icon type="home"/>HOME</Link>
          </Menu.Item>
          <Menu.Item disabled>
            <Divider type="vertical"/>
          </Menu.Item>
          <Menu.Item key="all">
            <Link to='/blog'><Icon type="book" />All Blogs</Link>
          </Menu.Item>
          <Menu.Item key="web">
            <Link to='/blog/web/Web'><Icon type="global" />Web Development</Link>
          </Menu.Item>
          <Menu.Item key="app">
            <Link to='/blog/app/App'><Icon type="mobile" />App Development</Link>
          </Menu.Item>
          <Menu.Item key="sports">
            <Link to ='/blog/sports/Sports'><Icon type = "dribbble" />Sports</Link>
          </Menu.Item>
          <Menu.Item key="analysis">
            <Link to ='/blog/analysis/Analysis'><Icon type = "area-chart" />Analysis</Link>
          </Menu.Item>

        </Menu>
      );
  }
}

const { Meta } = Card;
class BlogBoardLeft extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    $('.card-like').click(function(event) {
      /* Act on the event */
      alert('asd');
    });
  }
  render(){
    return (
      <div onLoad={this.handleClick} className = "blog-board-left">
        <Card style = {{ width: 300 }}
              cover = { <img alt="example" src="http://cuostudio.com:7000/images/1.png" /> }
              actions = { [ <Icon type="profile" />  , <div ><IconText className="card-like" type="like-o" text="0"/></div> ] }
        >
          <Meta
            avatar={<Avatar src="http://cuostudio.com:7000/images/cuo.png" />}
            title="Will"
            description="A Learner aims to be A Coder"
          />
          {/*<div ><IconText type="like-o" text="0"/></div>*/}
        </Card>
      </div>
    );
  }
}








let listData = [];


const pagination = {
  pageSize: 10,
  current: 1,
  total: listData.length,
  onChange: (() => {}),
};
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class BlogBoardList extends React.Component {  
  constructor(props){
    super(props);
    this.state = {
      data:[],
      good:'like-o',
      kind: undefined,
    };
    // this.props.match.params.kind
    this.get = this.get.bind(this);
    this.componentDidMount = () => {
      this.get();
      this.setState({
        'kind':this.props.match.params.kind
      });
    }
    
    // loadash插件帮忙解决过度渲染的问题
    this.shouldComponentUpdate = (nextProps, nextState) => {
      if (!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)) {
         return true
      } 
      else {
         return false
      }
    };
  }

  get(){
    $.ajax({
      url: '/getBlogByConditions',
      type: 'POST',
      dataType: 'json',
      data:{"kind":this.props.match.params.kind},
      success:data => {
        listData =[];
        for (let i = 0; i < data.length; i++) {
          listData.push({
            number: data[i].number,
            href: data[i].title,
            title: data[i].title,
            img: data[i].img,
            description: data[i].description,
            content: data[i].content,
            date:data[i].date,
            kind:data[i].kind,
            good:data[i].good,
            goodState: 'like-o',
            comment:data[i].comment.length,
          });
        }
        
        this.setState({
          data:listData,
        });
      }
    });
    console.log(this.props.match.params.kind);
  }

  render(){
      
      this.get();
      return (
        <div className="blog-board-right">
          <List
            itemLayout="vertical"
            size="large"
            pagination={pagination}
            dataSource={this.state.data}
            renderItem={item => (
              <Link to={'/blog/blogs/'+item.kind+'/'+item.number}>
                <List.Item
                  key={item.title}
                  actions={[ <IconText type={item.goodState} text={item.good}/>,<IconText type='message' text={item.comment} />]}
                  extra={<img width={272} height={200} alt="logo" src={item.img} />}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={
                            <div className="blog-board-right-title">
                              {item.title}
                              <br />
                              <Tag color="volcano">{item.kind}</Tag>
                            </div>
                          }
                    description={'#'+item.number +', '+ item.description + ' on ' +item.date}
                  />
                  <div className="blog-item-content" dangerouslySetInnerHTML={{__html:item.content}}></div>
                  <div style={{marginTop:10}}>【查看更多】</div>
                </List.Item>
              </Link>
            )}
          />
        </div>
      );


    
  }
}


class BlogBoardContent extends React.Component{
  constructor(props){
    super(props);
    this.state={
      number:'',
      good:'like-o',
      data:{},
      kind:undefined,
    }
    this.good = this.good.bind(this);
    this.componentDidMount = ()=> {
      let BlogNumber = this.props.match.params.number;
      let BlogKind = this.props.match.params.kind;
      this.setState({'kind':this.props.match.params.kind});
      $.ajax({
        url: '/getBlogByConditions',
        type: 'POST',
        dataType: 'json',
        data:{'kind':this.state.kind},
        success: data => {
          listData =[];

          for (let i = 0; i < data.length; i++) {
            listData.push({
              href: '#',
              title: data[i].title,
              img: data[i].img,
              description: data[i].description,
              content: data[i].content,
              date:data[i].date,
              kind:data[i].kind,
              good:data[i].good,
              location:data[i].location,
              goodState:this.state.good
            });
          }
          this.setState({
            number:BlogNumber,
            data:listData[BlogNumber]
          })
        }
      });
    }
  }



  good(){
    if(this.state.good === 'like-o'){
      $.ajax({
        url: '/updateBlog',
        type: 'POST',
        dataType: 'json',
        data: {"condition":{"number":this.state.number},"update":{"good":parseInt(this.state.data.good) + 1}},
      })
      .done( () => {
        let number = this.state.number;
        $.ajax({
          url: '/getBlogByConditions',
          type: 'POST',
          dataType: 'json',
          data:{'number':this.state.number},
          success: data => {
            listData =[];
            for (let i = 0; i < data.length; i++) {
                listData.push({
                  number: this.state.number,
                  href: data[i].title,
                  title: data[i].title,
                  img: data[i].img,
                  description: data[i].description,
                  content: data[i].content,
                  date:data[i].date,
                  kind:data[i].kind,
                  good:data[i].good,
                });
              }
              this.setState({
                data:listData[0],
                good:'like'
              });
              message.success('这是本文第'+listData[0].good +'次点赞');
            }
        });
      });
    }
    else{
      message.warning('只能点赞一次');
    }
  }

  render(){

    return (
      <div className="blog-board-content">
        <div className="blog-board-content-header">
          <h1>{this.state.data.title}</h1> 
          <p>{this.state.data.location + ' on ' + this.state.data.date}</p>
          <div className="close">
            <Link to='/blog'>
              <Icon type="close" />
            </Link>
          </div>
        </div>
        <Divider />
        <div className="blog-board-content-body" >
          <div className="blog-board-content-body-img">
            <img src={this.state.data.img}></img>
          </div>
          <div className="blog-board-content-body-content" dangerouslySetInnerHTML={{__html:this.state.data.content}}>
          </div>
          <Divider />
          <div className="blog-board-content-body-good" onClick={this.good}>
            <Icon type={this.state.good} /><span> </span>{this.state.data.good}
          </div>
        </div>
      </div>  
    );
  }
}



const BlogBoardRight = () => (
  <main>
    <Switch>
      <Route exact path='/blog' component={BlogBoardList}></Route>
      <Route exact path='/blog/web/:kind' component={BlogBoardList}></Route>
      <Route exact path='/blog/app/:kind' component={BlogBoardList}></Route>
      <Route exact path='/blog/sports/:kind' component={BlogBoardList}></Route>
      <Route exact path='/blog/analysis/:kind' component={BlogBoardList}></Route>
      <Route path='/blog/blogs/:kind/:number' component={BlogBoardContent} />

    </Switch>
  </main>
);

const BlogBoard = () => (
  <div className="blog-board">
    <BlogBoardLeft />
    <BlogBoardRight />
  </div>
)


const BlogContent = () => (
  <main>
    <Switch>
      <Route exact path='/blog' component={BlogBoard}/>
      <Route path='/blog/' component={BlogBoard}/>
    </Switch>
  </main>
);

const Blog = () => (
  <div>
    <BlogHeader />
    <BlogContent />
  </div>
);


module.exports = {
  Blog:Blog,
}