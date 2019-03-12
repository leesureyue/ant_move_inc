import React from 'react';
import GlobalMenu from '../../component/GlobalMenu';
import GlobalFooter from '../../component/GlobalFooter';
import styles from '../index.less';
import classNames from 'classnames';
import { Layout,Rate ,Carousel,Divider,List
  ,Button,Affix,Input,Card,Skeleton,Row,Col} from 'antd';
  
import moment from 'moment';
import reqwest from 'reqwest';
import CommonentList from '../../component/CommonentList';

const {Header,Footer,Content} =Layout;
//页面所需数据
const tabList = [{
  key: 'tab1',
  tab: '介绍',
}, {
  key: 'tab2',
  tab: '在线预定',
}];

/**
 * 服务在线预定
 * @param {} param0 
 */
const ShopOnLineOrder=({dataList,onClick})=>{
  return (
    <div>
      <List
        dataSource={dataList}
        renderItem={item=>(
          <List.Item key={item.id}>
            <List.Item.Meta title={item.title} 
            description={item.description}/>
            <Button icon='dollar' onClick={onClick}>预定</Button>
            
            <p>价格：{item.price}</p>
          </List.Item>
        )}
        />
    </div>
  )
}

const ContentList =({dataList,activeKey,onClick})=> {
  return (<div>
    {activeKey ==='tab1'?<ShopIntroduce shopDetail={dataList}/>
        :<ShopOnLineOrder dataList={dataList.serviceList} onClick={onClick}/>}
  </div>)
};

/**
 * 商品详情Tab展示以及轮播图
 * tabList 面板Tab页  activeKey：当前默认选中的Tab contentList :
 * @param {*} param0 
 */
const ShopDetail=({tabList,activeKey,shopDetail,onChange,onClick})=>(
  <div>
    <Row>
        <Col span={18} push={6}>
          <Card
            style={{ width: '100%' }}
            title="店铺详情"
            tabList={tabList}
            activeTabKey={activeKey}
            onTabChange={onChange}
            >
            <ContentList  activeKey={activeKey} dataList={shopDetail} 
                          onClick={onClick}/>
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
)

/**
 * 商品介绍面板
 * 商品的评级
 * shopDetail 渲染的数据
 */
const ShopIntroduce=({shopDetail})=>{
  if(typeof(shopDetail)=='undefined'){
    return (
      <Skeleton active loading title/>
    )
  }else{
    return (
      <div>
        <h2>{shopDetail.title}</h2>
        <span>商店评级:</span><Rate defaultValue={shopDetail.rate} disabled/>
        <p>地址：{shopDetail.address}</p>
        <p>电话：{shopDetail.phone}</p>
      </div>
    )
  }
}
//输出页面
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

  componentWillMount(){
      reqwest({
        url:'/shop/detail',
        method:'post',
        data:{id:1}
      }).then(response=>{
         this.setState({shopDetail:response.data})
      })
    }

  
  onTabChange = (key) => {
    this.setState({ key:key});
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
    });
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }
  onClick=()=>{
    this.props.history.push({pathname:'/shop/cart',state:{id:1}})
  }
    render(){
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
                        shopDetail={this.state.shopDetail}
                        dataList={this.state.dataList}
                        onClick={this.onClick}
                        onChange={this.onTabChange}/>
                        
            <Divider>评论</Divider>
            <CommonentList/>
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