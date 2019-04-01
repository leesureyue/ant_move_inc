import React from 'react';
import {Table,Button,Divider} from 'antd';
import reqwest from 'reqwest';

class ServiceList extends React.Component{

  constructor(props){
    super(props);
    this.state={
      page:1,pageSize:10,
      list:[],
      loading:true,
    }
  }
  componentWillMount(){
    reqwest({
      url:'/shop/getServiceList',
      method:'get',
      data:{shopId:'',page:this.state.page,pageSize:this.state.pageSize}
    }).then(req=>{
      console.log(req.data);
      this.setState({
        list:req.data,
        loading:!req.success
      })
    })
  }

  render(){
    const column=[{
      title:'服务id',
      dataIndex:'id',
    },{
      title:'服务标题',
      dataIndex:'title'
    },{
      title:'描述',
      dataIndex:'desc'
    },{
      title:'服务评级',
      dataIndex:'rate'
    },{
      title:'价格',
      dataIndex:'price',
    },{
      title:'操作',
      render:(record)=>{
        return (<span>
          <a onClick={()=>{console.log(record)}}>编辑</a>
          <Divider type="vertical" />
          <a onClick={()=>{console.log(record)}}>删除</a>
        </span>)
      }
    }]

    return (
      <div>
        <h2>服务管理</h2>
        <Button>发布新服务</Button>
        <Table title={()=>'服务管理列表'} bordered 
          columns={column}
          loading={this.state.loading}
          rowKey='id'
          pagination={this.state.pagination}
          dataSource={this.state.list}/>
      </div>
    )
  }
}


export default ServiceList;