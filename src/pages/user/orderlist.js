import React from 'react';
import  {Layout,List,Card} from 'antd';
import reqwest from 'reqwest';
import classNames from 'classnames';
import GlobalMenu from '../../component/GlobalMenu';
import GlobalFooter from '../../component/GlobalFooter'
const {Header,Content,Footer} =Layout;

class OrderList extends React.Component{

  constructor(props){
    super(props);
    this.state={
      orderList:[]
    }
  }

  componentWillMount(){
    reqwest({
      url:'/user/queryOrder',
      method:'post',
      data:{userId:1549983823996}
    }).then(req=>{ 
      this.setState({orderList:req.data})
    })
  }
  render(){
    return(
      <Layout>
        <GlobalMenu/>
        <List 
        loading={this.state.orderList.length==0?true:false}
        dataSource ={this.state.orderList}
        renderItem={item=>(
          <List.Item>
            <Card title={item.address}>
              <Card.Meta
              title={item.destination}/>
            </Card>
          </List.Item>
        )}
      />
      <GlobalFooter/>
    </Layout>
    )
  }
}

export default OrderList;