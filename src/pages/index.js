// 首页 
import { Layout,Menu, Icon ,Modal,Form,Input
  ,Affix,Checkbox} from 'antd';
import React from 'react';
import Link from 'umi/link';

import * as userService from '../service/UserService';

const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class CommonLayout extends React.Component{

  state = {
    current: '',
    visible:false,
    registerVisible:false
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
          console.log("error!")
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
            <Form style={{width:'300px',margin:'auto'}}>
              <Form.Item>
                {getFieldDecorator('name',{
                  rules:[{required:true,message:'请输入用户名'}]
                })(<Input prefix={<Icon type='user' style={{color:'#000'}}/>} placeholder='用户名/手机号'/>)}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator('password',{
                  rules:[{required:true,message:'请输入密码'}]
                })(<Input prefix={<Icon type='lock'/>} placeholder='密码' type='password'/>)}
              </Form.Item>
              <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
        </Form.Item>
            </Form>
      </Modal>

      <Modal title='注册'/>

      <Layout style={{height:'800px'}}>
        <Header style={{position:'fixed',width:'100%'}}>
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
          </Header>
        <Content style={{ padding: '0', marginTop: 64 }}>
             <h1>Test</h1>
        </Content>
        
        <Footer style={{textAlign:'center',color:'#000',backgroundColor:'#eee'}}>
            @CopyRight Leesure 
        </Footer>
      </Layout>
      </div>
    );
  }
}

export default Form.create({})(CommonLayout);