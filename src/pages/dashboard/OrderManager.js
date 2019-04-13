import React from 'React';
import {Table,Tag,message} from 'antd';
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
    this.getData(this.state.page)
  }


  handleChangeState=(id)=>{
    reqwest({
      url:'/admin/'
    })
  }

  getData(current){
    reqwest({
      url:'/admin/updateOrderStatus',
      method:'get',
      data:{orderId:''}
    }).then(req=>{
      if(req.success){
        this.setState({page:this.state.page,
          list:req.data,loading:!req.success,
          pagination:{current:req.current,total:req.totalCount}
        })
      }else{
        message.error("错误："+req.msg)
      }
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
      dataIndex:'totalPay',
      sorter: (a, b) => a.totalPay - b.totalPay,
    },{
      title:'订单状态',
      dataIndex:'orderState',
      render: orderState => (
        <span>
          {orderState=='UNCOMMIT' && 
          <Tag color="#f50">未提交</Tag>}
          {orderState=='COMMIT' && 
          <Tag color="#87d068">已提交</Tag>}
          {orderState=='CLOSE' && 
          <Tag color="#f50">关闭</Tag>}
        </span>
      ),
    },{
      title:'操作',
      render:(record)=>{
        return (<span>
          <a onClick={()=>{}}>修改状态</a>
        </span>)
      }
    }]


    return (
    <div>
      <Table title={()=>'商店订单表'} size="middle" 
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