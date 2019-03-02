// 入口文件 ,首页 
import { 
  Layout,Row, Col ,Rate,Form,Input,Affix,Card,List,Icon
} from 'antd';
import React from 'react';
import styles from './index.less';
import Link from 'umi/link';
import classNames from 'classnames';
import 'animate.css';
import GlobalFooter from '../component/GlobalFooter';
import GlobalMenu from '../component/GlobalMenu';

const { Header, Footer, Content } = Layout;
const {Meta} =Card;

//推荐店家面板
class ExcellentStore extends React.Component{
  state={
    cardList:[{
      id:1,
      title:'title',
      description: 'description'
    },{
      id:2,
      title:'title',
      description:'description'
    },{
      id:3,
      title:'title',
      description:'descript'
    },{
      id:4,
      title:'title',
      description:'description'
    }],
    pageHeight:''
  }

  componentWillMount(){

    //todo send request 
  }

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <List header={<Link to='/shop/detail'><Icon type='user'/>推荐店家</Link>}
              grid={{gutter:16,column:4}}
              dataSource={this.state.cardList}
              renderItem={item=>(
                <List.Item>
                  <Card title={item.title} hoverable
                      extra={<a href="#">了解更多</a>}
                      style={{ width: 240 , float:'left',margin:'10px'}}
                      cover={<img alt="example" 
                      src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                    <Rate count={5} disabled value={item.id}/>
                    <Meta 
                      title={item.title}
                      description={item.description}/>
                  </Card>
                </List.Item>
              )}/>
      </div>
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
  }
  render(){
    return (
      <div>
      <Layout>
        <Affix>
        <Header className={styles.menuHeader}>
        <a href='/'>
            <img src={require('../images/menu-logo.svg')} className={classNames(styles.img,'animated flipInX slower')}/>
        </a>
            <GlobalMenu/>
          </Header></Affix>
        <Content className={styles.indexContent}>
            
              <h1 className ='animated zoomIn'> Welcome to Ant Moving </h1>
              <h2 className='animated fadeIn slower'> 
                  this is a site platform for  houseing   moving </h2>
              <Input.Search placeholder='请输入附近的店家'  
                            onSearch={value=>{console.log(value)}}
                            size='large' enterButton
                            className={styles.contentInput}/>

          <StepIntroduce/>
          <h2>当前位置：杭州市西湖区</h2>
          <ExcellentStore/> 
           
          <img src={require('../images/index-welcome.png')} className={classNames(styles.img,'animated slideInUp')}/>              
         
        </Content>
        <Footer className={styles.indexFooter}>
            <GlobalFooter className='global-footer' 
            links={[{title:'SpringBoot',key:'1',href:'http://baidu.com'},{
              title:'SpringBoot',key:'2',href:'http://baidu.com'
            }]}
            copyright='@CopyRight · Leesure 河南大学软件学院'/>
        </Footer>
      </Layout>
      </div>
    );
  }
}

export default Form.create({})(CommonLayout);