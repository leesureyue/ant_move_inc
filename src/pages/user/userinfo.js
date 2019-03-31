import React from 'react';
import GlobalMenu from '../../component/GlobalMenu';
import GlobalFooter from '../../component/GlobalFooter';
import reqwest from 'reqwest';
import {Layout} from 'antd';

import {styles} from './userinfo.less';

const { Header, Footer, Content } = Layout;
class UserInfo extends React.Component{

  constructor(props){
    super(props)
    this.state={
      userInfo:{}
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
  render(){
    return(
      <Layout>
        <GlobalMenu/>
        <Content>
          <div>这是个人详细信息界面 </div>
        </Content>
        <GlobalFooter/>
      </Layout>
    )
  }
}
export default UserInfo;