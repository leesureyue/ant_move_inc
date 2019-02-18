// 首页 
import { Layout,Menu, Icon ,Modal,Form,Input
  ,Affix,Checkbox,Card} from 'antd';
import React from 'react';
import Link from 'umi/link';

import GlobalFooter from '../component/GlobalFooter';

import * as userService from '../service/UserService';

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
  //点击导航栏
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
    switch (e.key){
      case 'login':this.showModal() ;break;
      case 'register': this.showRegisterModal();break;
    }
  }


  //弹出登陆窗
  showModal=()=>{
    this.setState({visible:true})
  }
  showRegisterModal=()=>{
    this.setState({registerVisible:true})
  }
  //点击确定
  handleOK=()=>{
    const {  form: { validateFields } } = this.props;
    validateFields((err, values) => {
      if (!err) {
        let response = userService.login(values).then((data)=>{
          console.log(data)
        }).catch(()=>{
          console.log("error!",err)
        });
        
        this.setState({visible:false})
      }
    });
    console.log("click Ok!")
  }
  //点击取消
  handleCancel=()=>{
    this.setState({visible:false})
  }

  render(){
    const { form: { getFieldDecorator } } = this.props;
    
    return (
      <div>
      <Modal title={<span><Icon type='user'/>登陆</span>}
            visible={this.state.visible}
            onOk={this.handleOK}
            style={{maxWidth:'400px'}}
            onCancel={this.handleCancel}>
            <Form style={{maxWidth:'300px',margin:'auto'}}>
              <Form.Item>
                {getFieldDecorator('name',{
                  rules:[{required:true,message:'请输入用户名'}]
                })(<Input prefix={<Icon type='user' style={{color:'#000'}}/>} allowClear
                         placeholder='邮箱/手机号'/>)}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator('password',{
                  rules:[{required:true,message:'请输入密码'}]
                })(<Input.Password prefix={<Icon type='lock'/>} 
                      placeholder='密码' 
                      type='password'/>)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('vsCode',{
                  rules:[{required:true,message:'We must make sure you are a human'}]
                })(<Input style={{maxWidth:'150px'}}/>)}
                
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>记住我</Checkbox>
                )}
                <a  style={{float:'right'}} className="login-form-forgot" href="">忘记密码?</a>
        </Form.Item>
            </Form>
      </Modal>

      <Modal title='注册'/>
      
      <Layout>
        <Affix>
        <Header style={{width:'100%',boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)'}}>
        <Menu style={{lineHeight: '64px',textAlign:'right'}}
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            theme='dark'
          >
            <Menu.Item key="login">
              <Icon type="login" /> 登陆
            </Menu.Item>
            <Menu.Item key="register">
              <Icon type="user" />注册
            </Menu.Item>
            <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />个人中心</span>}>
              <MenuItemGroup title="Item 1">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup title="Item 2">
                <Menu.Item key="setting:3">Option 3</Menu.Item>
                <Menu.Item key="setting:4">Option 4</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <Menu.Item key="contant">
              <a href="https://ant.design" target="_blank" rel="noopener noreferrer"><Icon type="phone" />联系我们</a>
            </Menu.Item>
            <Menu.Item key='backManager'>
              <Link to='/layout'/><Icon type='appstore'/>后台管理
            </Menu.Item>
          </Menu>
          </Header></Affix>
        <Content style={{ padding: '0', marginTop: 64 }}>
            <div style={{textAlign:'center'}}>
              <img src={require('../assets/logo.svg')}/>
              <br/>
              <Input.Search placeholder='请输入附近的店家' 
                            onSearch={value=>{console.log(value)}}
                            size='large' enterButton
                            style={{maxWidth:'500px',margin:'auto'}}/>

                          
                        
                        <br/>当前位置：杭州西湖区
            </div>

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

        <Footer style={{textAlign:'center',color:'#000',backgroundColor:'#eee'}}>
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