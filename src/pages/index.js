// 首页 
import { Layout,Menu, Icon ,Modal,Form,Input
  ,Affix,Card} from 'antd';
import React from 'react';
import styles from './index.less';
import classNames from 'classnames';
import 'animate.css';


import GlobalFooter from '../component/GlobalFooter';
import GlobalMenu from '../component/GlobalMenu';

const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const {Meta} =Card;

class CommonLayout extends React.Component{

  state = {
    current: '',
    visible:false,
    registerVisible:false,
    cardList:[{
      id:'1',
      title:"Europe Street 1",
      description:"www.instagram.com"
    },{
      id:'2',
      title:"Europe Street 2",
      description:"www.instagram.com"
    },{
      id:'3',
      title:"Europe Street 3",
      description:"www.instagram.com"
    },{
      id:'4',
      title:"Europe Street 4",
      description:"www.instagram.com"
    }]
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
            
              <h1 className ='animated fadeInLeft slow'> Welcome to Ant Moving </h1>
              <Input.Search placeholder='请输入附近的店家' 
                            onSearch={value=>{console.log(value)}}
                            size='large' enterButton
                            style={{maxWidth:'500px',margin:'auto'}}/>
              <br/>
              <img src={require('../images/index-content.png')} className={classNames(styles.img,'animated slideInUp')}/>  
                        
          
            <br/>当前位置：杭州西湖区
            

            <div style={{background: '#aaa'}}>
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