import React from 'react';
import Link from 'umi/link';
import style from './index.less';
import cookie from 'react-cookies';
import * as userService from '../../service/UserService';
import {
    Menu,Icon,Modal,Form,Input,Checkbox,Avatar,notification
} from 'antd';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
 /**
 * 输出页面
 */
class GlobalMenu extends React.Component{

    constructor(props){
        super(props);
    }
    state = {
      current: '',
      userName:'',
      isLogin: false,
      loginVisible: false,
      registerVisible: false
    }

  componentWillMount(){
    let name  = cookie.load('name');
    if(typeof(name)!='undefined'){
      this.setState({
       userName: name,
       isLogin:true
     })
    }
  }

  //点击导航栏
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
    switch (e.key){
      case 'login':this.showLoginModal() ;break;
      case 'register': this.showRegisterModal();break;
      case 'logout': this.handleLogout();break;
    }
  }


  handleOK=()=>{ 
    this.props.form.validateFields((err, values) => {
      if (!err) {
          let response = userService.login(values).then((data)=>{
          this.props.onCancel();
        }).catch(()=>{
          console.log("error!",err)
        });
      }
    });
    
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
          cookie.save('name',data.result.name)
          this.setState({isLogin:true,userName:data.result.name})
          notification.success({message:'登陆成功',duration:3})
        }).catch((error)=>{
          notification.error({
            description:error,
            duration:null,
            placement:"bottomLeft"
          })
        });
        
        this.setState({loginVisible:false})
      }
    });
    
  }
  //点击取消
  handleCancel=()=>{
    this.setState({loginVisible:false,registerVisible:false})
  }
 
  handleLogout=()=>{
    cookie.remove('name');
    this.setState({isLogin:false})
    notification.success({
      message:'退出成功',duration:3
    })
  }
  render(){
        return (
          <div> 
            <Modal title={<span><Icon type='user'/>登陆</span>}
                visible={this.state.loginVisible}
                onOk={this.handleOK}
                onCancel={this.onCancel} className={style.loginModal}>
                
            <Form className={style.form}>
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
                  <a  style={{float:'right'}} className="login-form-forgot"  href="">忘记密码?</a>
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
                //todo 我是注册界面
              </Form>
          </Modal>

            <Menu className={style.globalMenu}
                    mode="horizontal" 
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                >
            {
              this.state.isLogin ?
              <SubMenu title={
                
                <Avatar  className={style.avatar}>     
                  {this.state.userName}
                </Avatar>
                
              } key='user'>
                <Menu.Item key="logout">
                  退出登陆
                </Menu.Item>
              </SubMenu>:
              <Menu.Item key='login'>
                <Icon  type='user'/>登陆
              </Menu.Item>
            }
            <Menu.Item key="register">
              <Icon type="user" />注册
            </Menu.Item>
            {
              this.state.isLogin && [( 
                <SubMenu title={<span  className="submenu-title-wrapper"><Icon type="setting" />个人中心</span>} key='userCenter'>
                  <MenuItemGroup title={<span><Icon type="profile" />订单管理</span>}>
                    <Menu.Item key="setting:1">订单查询</Menu.Item>
                    <Menu.Item key="setting:2">历史纪录</Menu.Item>
                  </MenuItemGroup>
                  <MenuItemGroup title={<span><Icon type="setting" />个人管理</span>}>
                    <Menu.Item key="setting:3">修改密码</Menu.Item>
                    <Menu.Item key="setting:4">修改个人信息</Menu.Item>
                  </MenuItemGroup>
                </SubMenu>),
                (<Menu.Item key='backManager'>
                  <Link to='/layout'/><Icon type='appstore'/>后台管理
                </Menu.Item>)]
            }
            <SubMenu key='conntant' title={<span><Icon type="phone" />联系我们</span>}>
                  <img src={require('../../images/content-us.png')} width='200px'/>
            </SubMenu>
          </Menu>
          </div>
        )
    }
}
export default Form.create()(GlobalMenu);