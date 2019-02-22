import React from 'react';
import GlobalMenu from '../../component/GlobalMenu';
import GlobalFooter from '../../component/GlobalFooter';
import styles from '../index.less';
import classNames from 'classnames';
import { Layout,Icon ,Carousel,Divider
  ,Button,Affix,Input,Card,Tooltip,Row,Col} from 'antd';
  
import moment from 'moment';
import { Comment, Form, List} from 'antd'
import ServiceList from '../../component/ServiceList';
const {Header,Footer,Content} =Layout;
//页面所需数据
const tabList = [{
  key: 'tab1',
  tab: '介绍',
}, {
  key: 'tab2',
  tab: '在线预定',
}];

const contentList = {
  tab1: <p>content1</p>,
  tab2: <p>content 2</p>,
};


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
    author: 'Leesure',
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
//评论面板条数
const CommentList=({comments})=>{
    <List dataSource={comments}
    header={`${comments.length}'条评论'}`}
    itemLayout='horizontal'
    renderItem={props=><Comment {...props}/>}/>

}
/**
 * tabList 面板Tab页  activeKey：当前默认选中的Tab contentList :
 * @param {*} param0 
 */
const ShopDetail=({tabList,activeKey,contentList})=>{
  <div>
    <Row>
        <Col span={18} push={6}>
          <Card
            style={{ width: '100%' }}
            title="店铺详情"
            tabList={tabList}
            activeTabKey={activeKey}
            onTabChange={(key) => { this.onTabChange(key, 'key'); }}
            >
            {contentList[activeKey]}
          </Card>
        </Col> 

        <Col span={6} pull={18}>
        <Carousel autoplay >
            <div><h3>1</h3></div>
            <div><h3>2</h3></div>
            <div><h3>3</h3></div>
            <div><h3>4</h3></div>
        </Carousel></Col>
    </Row>
  </div>
}

//评论面板
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
                <Header className={styles.menuHeader}>
                  <img src={require('../../images/menu-logo.svg')} className={classNames(styles.img,'animated flipInX slower')}/>
                  <GlobalMenu/>
                </Header>
                </Affix>
                                
                <Content style={{margin:'30px'}}>
                    <ShopDetail tabList={tabList} 
                                activeKey={this.state.key}
                                contentList={contentList}/>
                    <Divider>评论</Divider>
                    <ServiceList/>
                </Content>
                <Footer className={styles.indexFooter}>
                  <GlobalFooter className='global-footer' 
                    links={[{title:'SpringBoot',key:'1',href:'http://baidu.com'},{
                    title:'SpringBoot',key:'2',href:'http://baidu.com'
                    }]}
                    copyright='@CopyRight · Leesure 河南大学软件学院'/>
                </Footer> 
            </Layout>
        )
    }
}


export default  DetailPage;