import React from 'react';
import GlobalMenu from '../../component/GlobalMenu';
import GlobalFooter from '../../component/GlobalFooter';
import reqwest from 'reqwest';
import {Layout,Menu,Form,Input} from 'antd';

import styles from './userinfo.less';
const { TextArea } = Input
const {Content ,Sider} = Layout;

const NormalUserInfo = Form.create('user_info')(
  class extends React.Component{
    render(){
      return(
        <div>
          <h2 >基本设置</h2>
          <Form className={styles.normal_form}>
            <Form.Item label='昵称'>
              {
                this.props.form.getFieldDecorator('name',{
                  rules:[{required:true}]
                })(
                  <Input/>
                )
              }
            </Form.Item> 
            <Form.Item label='邮箱'>
              {
                this.props.form.getFieldDecorator('email',{
                  rules:[{type: 'email', message: 'The input is not valid E-mail!'}]
                })(
                  <Input/>
                )
              }
            </Form.Item>
            <Form.Item label='个人简介'>
              {
                this.props.form.getFieldDecorator('introduce',{
                  rules:[{required:true}]
                })( <TextArea 
                  placeholder="我是一直小小的咸鱼，想翻身" 
                  autosize={{ minRows: 3, maxRows: 6 }} />)
              }
            </Form.Item> 
            <Form.Item label='电话'>
              {
                this.props.form.getFieldDecorator('phone',{
                  rules:[{required:true}]
                })(<Input/>)
              }
            </Form.Item>
            <Form.Item label='地址'>
              {
                this.props.form.getFieldDecorator('address',{
                  rules:[{required:true}]
                })(<Input/>)
              }
            </Form.Item>
          </Form>
        </div>
      )
    }
  }
)

class SecurityContent extends React.Component{
  render(){
    return(
      <div>
        <h2>安全设置</h2>
        
      </div>
    )
  }
}

class UserInfo extends React.Component{
  constructor(props){
    super(props)
    this.state={
      userInfo:{},
      currentKey:'1'
    }
  }
  componentWillMount(){
    reqwest({
      url:'/user/getUserInfo',
      method:'post',
      data:{userId:1549983823996}
    }).then(req=>{
      console.log(req.data);
      this.setState({userInfo:req.data})
    })
  }

  handleClick = (e) => {
    this.setState({currentKey:e.key})
  }

  render(){
     
    return(
      <Layout>
        <GlobalMenu/>
        <Content>
          <Layout>
            <Sider width={200} style={{ background: '#fff' }}>
            <Menu mode="inline" 
            defaultSelectedKeys={[this.state.currentKey]} 
            onClick={this.handleClick}>
              <Menu.Item key="1">基本设置</Menu.Item>
              <Menu.Item key="2">安全设置</Menu.Item>
            </Menu>
            </Sider> 
            <Content className={styles.user_info_content}>
              {this.state.currentKey=='1' && <NormalUserInfo />}
              {this.state.currentKey=='2' &&  <SecurityContent/>}
            </Content>
          </Layout>
      </Content>
      <GlobalFooter/>
    </Layout>
  )
  }
}
export default UserInfo;