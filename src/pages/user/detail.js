import React from 'react';
import GlobalMenu from '../../component/GlobalMenu';
import GlobalFooter from '../../component/GlobalFooter';
import styles from '../index.less';
import classNames from 'classnames';
import { Layout,Rate ,Carousel,Divider,List
  ,Button,Affix,Tabs,Card,Skeleton,Row,Col} from 'antd';
  
import moment from 'moment';
import reqwest from 'reqwest';
import CommonentList from '../../component/CommonentList';

const {Header,Footer,Content} =Layout;


const ShopOnLineOrder =({dataSource})=> { 
    return (
      <div>
        <List
          dataSource={dataSource}
          renderItem={item=>(
            <List.Item key={item.id}>
              <List.Item.Meta title={item.title} 
              description={item.desc}/>
              <Button icon='dollar'>预定</Button>
              <p>价格：{item.price}</p>
            </List.Item>
        )}
      />
    </div>
  )
}

/**
 * 商品介绍面板
 */
const ShopIntroduce=({shopDetail})=>{
  if(typeof(shopDetail)=='undefined'){
    return (<Skeleton active loading title/>)
  }else{
    return (
      <div>
        <h2>{shopDetail.title}</h2>
        <span>商店评级:</span><Rate defaultValue={shopDetail.rate} disabled/>
        <p>商店简介：{shopDetail.desc}</p>
        <p>地址：{shopDetail.address}</p>
        <p>电话：{shopDetail.phone}</p>
      </div>
    )
  }
}


class ShopDetail extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Row>
        <Col span={8}>
          <Carousel autoplay>
            <div><h3>1</h3></div>
            <div><h3>2</h3></div>
            <div><h3>3</h3></div>
            <div><h3>4</h3></div>
          </Carousel>
        </Col>
        <Col span={16}>
          <Tabs>
            <Tabs.TabPane tab="介绍" key="introduce">
              <ShopIntroduce shopDetail={this.props.shopDetail}/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="在线预定" key="onlineOrder">
              <ShopOnLineOrder dataSource={this.props.shopDetail.serviceList}/>
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
  )}
}

//输出页面
class DetailPage extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        shopDetail:{}
    }

  componentWillMount(){
      reqwest({
        url:'/shop/getShopDetail',
        method:'post',
        data:{shopId:2019032261}
      }).then(response=>{
        console.log(response);
        this.setState({shopDetail:response.data})
      })
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
                                
        <Content>
            <ShopDetail shopDetail={this.state.shopDetail}/> 
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