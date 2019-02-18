import React from 'react';
import GlobalMenu from '../../component/GlobalMenu';
import ServiceList from '../../component/ServiceList';

import { Layout,Icon ,Carousel,Divider
    ,Button,Affix,Input,Card,Tooltip,Row,Col} from 'antd';

import moment from 'moment';
import { Comment, Form, List} from 'antd'
const {Header,Footer,Content} =Layout;


const CommentList=({comments})=>{
    <List dataSource={comments}
    header={`${comments.length}'条评论'}`}
    itemLayout='horizontal'
    renderItem={props=><Comment {...props}/>}/>

}


const Editor = ({
  onChange, onSubmit, submitting, value,
}) => (
  <div>
    <Form.Item>
      <Input.TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        评论一下
      </Button>
    </Form.Item>
  </div>
);

const data = [
  {
    actions: [<span>Reply to</span>],
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <p>We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.</p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(1, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    actions: [<span>Reply to</span>],
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <p>We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.</p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(2, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
];


const tabList = [{
  key: 'tab1',
  tab: '介绍',
}, {
  key: 'tab2',
  tab: '上门服务',
}];

const contentList = {
  tab1: <p>content1</p>,
  tab2: <ServiceList/>,
};

const tabListNoTitle = [{
  key: 'article',
  tab: 'article',
}, {
  key: 'app',
  tab: 'app',
}, {
  key: 'project',
  tab: 'project',
}];

const contentListNoTitle = {
  article: <p>article content</p>,
  app: <p>app content</p>,
  project: <p>project content</p>,
};



class DetailPage extends React.Component{

    constructor(props){
        super(props);
    }


    state = {
        likes: 0,
        dislikes: 0,
        action: 'disliked',
        key: 'tab1',
        noTitleKey: 'app',
    }

  like = () => {
    this.setState({
      likes: 1,
      dislikes: 0,
      action: 'liked',
    });
  }
  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  }

  dislike = () => {
    this.setState({
      likes: 0,
      dislikes: 1,
      action: 'disliked',
    });
  }

handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
          ...this.state.comments,
        ],
      });
    }, 1000);
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }
    render(){
        const actions = [
            <span>
                <Tooltip title="Like">
                <Icon
                    type="like"
                    theme={this.state.action === 'liked' ? 'filled' : 'outlined'}
                    onClick={this.like}
                />
                </Tooltip>
                <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                {this.state.likes}
                </span>
            </span>,
            <span>
                <Tooltip title="Dislike">
                <Icon
                    type="dislike"
                    theme={this.state.action === 'disliked' ? 'filled' : 'outlined'}
                    onClick={this.dislike}
                />
                </Tooltip>
                <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                {this.state.dislikes}
                </span>
            </span>,
            <span>Reply to</span>,
            ];
        return (
            <Layout>
                <Affix>
                <Header>
                <GlobalMenu /> 
                </Header> 
                </Affix>               
                <Content style={{margin:'30px'}}>

                    <p>商家详情页面:</p>

                    <div>

                        <Row>
                           <Col span={18} push={6}><Card
                            style={{ width: '100%' }}
                            title="店铺详情"
                            extra={<a href="#">More</a>}
                            tabList={tabList}
                            activeTabKey={this.state.key}
                            onTabChange={(key) => { this.onTabChange(key, 'key'); }}
                            >
                            {contentList[this.state.key]}
                        </Card></Col>

                            <Col span={6} pull={18}>
                            <Carousel autoplay >

                                <div style={{height:'400px',backgroundColor:'#000'}}><h3>1</h3></div>
                                <div><h3>2</h3></div>
                                <div><h3>3</h3></div>
                                <div><h3>4</h3></div>
                            </Carousel></Col>
                        </Row>
                        
                        
                    </div>
                
                
                    <Divider>评论区</Divider>
                    <List
                        className="comment-list"
                        header={`${data.length} replies`}
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                        <Comment
                            actions={actions}
                            author={item.author}
                            avatar={item.avatar}
                            content={item.content}
                            datetime={item.datetime}
                        />
                        )}
                    />,
                </Content>
                <Footer>
                    页脚
                </Footer>
            </Layout>
        )
    }
}


export default  DetailPage;