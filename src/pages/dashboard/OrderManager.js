import React from 'React';
import {Table} from 'antd';
import reqwest from 'reqwest';

//订单管理表格
class OrderTable extends React.Component{
  constructor(props){
    super(props);
    this.state={
      page:1,
      pageSize:10,
      list:[],
      loading:true,
      pagination:{}
    }
  }
  componentWillMount(){
    reqwest({
      url:'/admin/getOrderList',
      method:'get',
      data:{shopId:'',page:this.state.page,pageSize:this.state.pageSize}
    }).then(req=>{
      console.log(req.data)   
      this.setState({page:this.state.page,
        list:req.data,loading:!req.success,
        pagination:{current:req.current,total:req.totalCount}
      })
    })
  }
  render(){
    const column=[{
      title:'订单号',
      dataIndex:'id',
    },{
      title:'用户ID',
      dataIndex:'userId'
    },{
      title:'服务名称',
      dataIndex:'serviceId'
    },{
      title:'服务地址',
      dataIndex:'address'
    },{
      title:'运送目的地',
      dataIndex:'destination',
    },{
      title:'创建时间',
      dataIndex:'createTime'
    },{
      title:'总价',
      dataIndex:'totalPay'
    },{
      title:'订单状态',
      dataIndex:'orderState'
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
      <h2>订单管理</h2>
      <Table title={()=>'商店订单表'} bordered 
        columns={column}
        loading={this.state.loading}
        rowKey='id'
        pagination={this.state.pagination}
        dataSource={this.state.list}/>
    </div>
    )
  }
}


export default OrderTable;