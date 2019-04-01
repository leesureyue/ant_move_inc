import React from 'react';
import Link from 'umi/link';
import cookie from 'react-cookies';
import classNames from 'classnames';
import styles from './index.less' 
import reqwest from 'reqwest';
import {
    Row,Col,
    Menu,Icon,Modal,Form,Input,Checkbox,Avatar,notification
} from 'antd';

const SubMenu = Menu.SubMenu; 



const  LoginCreateForm =Form.create('login')(
  class extends React.Component{
    render(){
      return (
        <Modal title={<span><Icon type='user'/>登陆</span>}
          visible={this.props.visible}
          onOk={this.props.onOk}
          onCancel={this.props.onCancel} 
          className={styles.loginModal}>
                  
          <Form className={styles.form}>
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
    )
}}
)
const RegisterCreateForm =Form.create('register')(
  class extends React.Component{
    render(){
      return (
        <Modal 
        title={<span><Icon type='user'/>注册</span>}
        visible={this.props.visible}
        onOk={this.props.onOk}
        onCancel={this.props.onCancel}>
        <Form style={{maxWidth:'300px'}}>
          <Form.Item>
            {this.props.form.getFieldDecorator('name',{
              rules:[{required:true,message:'请输入用户名'}]
            })(<Input prefix={<Icon type='user' style={{color:'#000'}}/>} allowClear
                    placeholder='请输入用户名'/>)}
          </Form.Item>
          <Form.Item>
            {this.props.form.getFieldDecorator('password',{
              rules:[{required:true,message:'请输入密码'}]
            })(<Input.Password prefix={<Icon type='lock'/>} 
                  placeholder='密码' 
                  type='password'/>)}
          </Form.Item>
          <Form.Item>
            {this.props.form.getFieldDecorator('phone',{
              rules:[{required:true,message:'请输入手机号码'}]
            })(<Input prefix={<Icon type='phone' style={{color:'#000'}}/>} allowClear
                    placeholder='请输入手机号码'/>)}
          </Form.Item>
        </Form>
    </Modal>
  )
}})

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

  //处理注册窗口传入的参数
  handleRegister=()=>{ 
    this.props.form.validateFields((err, values) => {
      if (!err) {
          reqwest({
            url:'/user/register',
            method:'post',
            data:values,
          }).then(res=>{
            cookie.save('name',res.name)
            this.setState({registerVisible:false,name:res.name})
          })
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
  //点击确定-登陆
  handleLogin=()=>{
    const {  form: { validateFields } } = this.props;
    validateFields((err, values) => {
      if (!err) {
        reqwest({
          url:'/user/login',
          method:'post',
          data:values,
        }).then(res=>{
          cookie.save('name',res.name);
          res.success && this.setState({loginVisible:false,userName:res.name});
        })
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
      <LoginCreateForm visible={this.state.loginVisible}
      onCancel={this.handleCancel} 
      onOk={this.handleLogin}/>

      <RegisterCreateForm visible={this.state.registerVisible}
        onCancel={this.handleCancel} onOk={this.handleRegister}
      />

      <Menu className={styles.globalMenu}
        mode="horizontal" 
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
      >
            
      {
        this.state.userName ?
        <SubMenu title={
          
          <Avatar  className={styles.avatar}>     
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
                  <Menu.Item key="setting:1">
                    <Link to={'/user/order'}>订单管理</Link>
                  </Menu.Item>
                  <Menu.Item key="setting:2">
                    <Link to={'/user/info'}>个人管理</Link>
                  </Menu.Item> 
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


class GlobalMenuWrapper extends React.Component{

  render(){
     return(
      <Row className={classNames(styles.globalMenu)}>
      <Col span={6}> 
        <a href='/'>
        <img src={require('../../images/menu-logo.svg')} className={classNames(styles.img,'animated flipInX slower')}/>
        </a>
      </Col>
      <Col span={18}>
        <GlobalMenu/>
      </Col>
    </Row>
     )
  }
}
export default Form.create()(GlobalMenuWrapper);