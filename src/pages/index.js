// 入口文件 ,首页 
import { 
  Layout,Row, Col ,Rate,Form,Input,Affix,Card,List,Icon
} from 'antd';
import React from 'react';
import styles from './index.less';
import reqwest from 'reqwest';
import {withRouter} from 'react-router';
import { Link } from 'dva/router';
import classNames from 'classnames';
import 'animate.css';
import GlobalFooter from '../component/GlobalFooter';
import GlobalMenu from '../component/GlobalMenu';

const { Header, Footer, Content } = Layout;
const {Meta} =Card;

//推荐店家面板
@withRouter
class ExcellentStore extends React.Component{
  
    constructor(props){
    super(props); 
  }

  state={loading:false}
  render(){
    return (
      <List
        grid={{gutter:16,column:4}}
        dataSource={this.props.shopList}
        renderItem={item=>(
          <List.Item>
            <Card title={item.shopTitle} hoverable
                loading={this.props.shopList.length==0?true:false}
                extra={<Link to={{pathname:'/shop/detail',state:{id:item.shopId}}}>了解更多</Link>}
                style={{ width: 240 , float:'left',margin:'10px'}}
                cover={<img alt="example" 
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              >
              <Rate count={5} disabled value={item.rate}/>
              <Meta 
                title={item.shopTitle}
                description={item.shopIntroduce}/>
            </Card>
          </List.Item>
        )}/>
    )
  }
}

//步骤介绍
class StepIntroduce extends React.Component{
  render(){
    return (
      <div className={styles.stepIntroduce}>
        <Row gutter={16}>
          <Col span={8} className='animated fadeInRight'>
            <div>
              <img src={require('../images/big-incentives.png')}/>
              <span className={styles.spanTitle}>01.浏览网页</span>
              <p className={styles.spanText}>占位占位占位占位</p>
            </div>
          </Col>

          <Col span={8} className='animated fadeInRight' >
            <div>
              <img src={require('../images/Building-Accountability1.png')}/>
              <span className={styles.spanTitle}>02.选择店家</span>
              <p className={styles.spanText}>占位占位占位</p>
            </div>
          </Col>

          <Col span={8} className='animated fadeInRight' >
            <div>
              <img src={require('../images/Stay-Fully-Protected1.png')}/>
              <span className={styles.spanTitle}>03.坐等搬家</span>
              <p className={styles.spanText}>占位占位占位</p>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}


class CommonLayout extends React.Component{
  state = {
    current: '',
    visible:false,
    registerVisible:false,
    shopList:[]
  }
  getShopList=(param)=>{
    reqwest({
      url:'/shop/queryByConditions',
      method:'post',
      data:{address:param,name:param}
    }).then(response=>{
      this.setState({shopList:response.data})
    })
  }
  componentWillMount(){
     this.getShopList('_');
  }
  render(){
    return (
      <div>
      <Layout>
        <Affix>
          <Header className={styles.menuHeader}>
             <GlobalMenu/>
          </Header>
        </Affix>

        <Content className={styles.indexContent}> 
              <h1 className ='animated zoomIn'> Welcome to Ant Moving </h1>
              <h2 className='animated fadeIn slower'> 
                  this is a site platform for  houseing   moving </h2>
              <h2>当前位置：杭州市西湖区</h2>
              <Input.Search placeholder='请输入附近的店家'  
                            onSearch={value=>{this.getShopList(value)}}
                            size='large' enterButton
                            className={styles.contentInput}/>
          <ExcellentStore shopList={this.state.shopList}/> 
          <img src={require('../images/index-welcome.png')} className={classNames(styles.img,'animated slideInUp')}/>              
          <StepIntroduce/>
        </Content>
        <Footer className={styles.indexFooter}>
            <GlobalFooter/>
        </Footer>
      </Layout>
      </div>
    );
  }
}

export default Form.create({})(CommonLayout);