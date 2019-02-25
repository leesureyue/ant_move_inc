import React from 'react';
import Link from 'umi/link';
import style from './index.less';
import cookie from 'react-cookies';
import * as userService from '../../service/UserService';

import {
    Menu,Icon,Modal,Form,Input,Checkbox
} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class GlobalMenu extends React.Component{

    constructor(props){
        super(props);
        
    }
    state={
      current: '',
      userName:'登陆',//当前用户的登陆名
      loginVisible:false,
      registerVisible:false
    }


  componentWillMount(){
    //todo 发送请求，自动登陆,从cookie中取值
    
    let user = {name:'lee',password:'123'}
    if(typeof(user)!="undefined"){
     this.setState({userName:user.name});
    }else{//如果没有cookie 下·
      this.setState({userName:'登陆'});
    }
  }

  //点击导航栏
  handleClick = (e) => {
    console.log(e.key);
    this.setState({
      current: e.key,
    });
    switch (e.key){
      case 'login':this.showLoginModal() ;break;
      case 'register': this.showRegisterModal();break;
    }
  }


  

  //弹出登陆窗
  showLoginModal=()=>{
    this.setState({loginVisible:true,registerVisible:false})
  }
  //弹出注册窗口
  showRegisterModal=()=>{
    this.setState({registerVisible:true,loginVisible:false})
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
        
        this.setState({loginVisible:false})
      }
    });
    console.log("click Ok!")
  }
  //点击取消
  handleCancel=()=>{
    this.setState({loginVisible:false,registerVisible:false})
  }
 

  render(){
        return (
          <div>
            <Modal title={<span><Icon type='user'/>登陆</span>}
            visible={this.state.loginVisible}
            onOk={this.handleOK}
            style={{maxWidth:'400px'}}
            onCancel={this.handleCancel}>
            <Form style={{maxWidth:'300px',margin:'auto'}}>
              <Form.Item>
                {this.props.form.getFieldDecorator('name',{
                  rules:[{required:true,message:'请输入用户名'}]
                })(<Input prefix={<Icon type='user' style={{color:'#000'}}/>} allowClear
                         placeholder='邮箱/手机号'/>)}
              </Form.Item>

              <Form.Item>
                {this.props.form.getFieldDecorator('password',{
                  rules:[{required:true,message:'请输入密码'}]
                })(<Input.Password prefix={<Icon type='lock'/>} 
                      placeholder='密码' 
                      type='password'/>)}
              </Form.Item>
              <Form.Item>
                {this.props.form.getFieldDecorator('vsCode',{
                  rules:[{required:true,message:'We must make sure you are a human'}]
                })(<Input style={{maxWidth:'150px'}}/>)}
                
              </Form.Item>
              <Form.Item>
                {this.props.form.getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>记住我</Checkbox>
                )}
                <a  style={{float:'right'}} className="login-form-forgot" href="">忘记密码?</a>
        </Form.Item>
            </Form>
      </Modal>



      <Modal 
        title={<span><Icon type='user'/>注册</span>}
        visible={this.state.registerVisible}
        onOk={this.handleOK}
        style={{maxWidth:'400px'}}
        onCancel={this.handleCancel}>
          <Form style={{maxWidth:'300px'}}>

          </Form>
      </Modal>


      <Menu className={style.globalMenu}
              mode="horizontal" 
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
          >

            <Menu.Item key="login">
              
              <Icon type="login" /> {this.state.userName}
            </Menu.Item>
            <Menu.Item key="register">
              <Icon type="user" />注册
            </Menu.Item>
            <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />个人中心</span>}>
              <MenuItemGroup title={<span><Icon type="profile" />订单管理</span>}>
                <Menu.Item key="setting:1">订单查询</Menu.Item>
                <Menu.Item key="setting:2">历史纪录</Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup title={<span><Icon type="setting" />个人管理</span>}>
                <Menu.Item key="setting:3">修改密码</Menu.Item>
                <Menu.Item key="setting:4">修改个人信息</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <SubMenu key='conntant' title={<span><Icon type="phone" />联系我们</span>}>
                  <img src={require('../../images/content-us.png')} width='200px'/>
            </SubMenu>
            <Menu.Item key='backManager'>
              <Link to='/layout'/><Icon type='appstore'/>后台管理
            </Menu.Item>
          </Menu>
          </div>

        )
    }
}

export default Form.create({})(GlobalMenu);