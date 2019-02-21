// 入口文件 ,首页 
import { Layout,Menu, Icon ,Modal,Form,Input
  ,Affix,Card} from 'antd';
import React from 'react';
import styles from './index.less';
import classNames from 'classnames';
import 'animate.css';


import GlobalFooter from '../component/GlobalFooter';
import GlobalMenu from '../component/GlobalMenu';

const { Header, Footer, Content } = Layout;
const {Meta} =Card;

//推荐店家面板
class ExcellentStore extends React.Component{


  state={
    cardList:[],
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
        {
          this.state.cardList.map(card=>{
            return (
              <Card  key={card.id}
                  hoverable 
                  extra={<a href="#">了解更多</a>}
                  style={{ width: 240 , float:'left',margin:'10px'}}
                  cover={<img alt="example" 
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                <Meta 
                  title={card.title}
                  description={card.description}/>
              </Card>)
          })
        }
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
            <img src={require('../images/menu-logo.svg')} className={classNames(styles.img,'animated flipInX slower')}/>
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
              <br/>

              <h2>当前位置：杭州市西湖区</h2>
              <img src={require('../images/index-content.png')} className={classNames(styles.img,'animated slideInUp')}/>              
           
           
            
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