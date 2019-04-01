import React from 'React';
import {Table,Divider} from 'antd';
import reqwest from 'reqwest';

//评论管理表格
class EvaluateTable extends React.Component{
  constructor(props){
    super(props);
    this.state={
      page:1,
      pageSize:10,
      list:[],
      loading:false,
      pagination:{
        current:1,total:10
      }
    }
  }
  componentWillMount(){
    reqwest({
      url:'/shop/getEvaluateList',
      method:'get',
      data:{shopId:'',page:this.state.page,pageSize:this.state.pageSize}
    }).then(req=>{
      console.log(req.data)
      this.setState({page:this.state.page,
        list:req.data,loading:!req.success})
    })
  }
  render(){
    const column=[{
      title:'订单号',
      dataIndex:'orderId',
    },{
      title:'昵称',
      dataIndex:'userName'
    },{
      title:'创建时间',
      dataIndex:'createTime',
    },{
      title:'好评级别',
      dataIndex:'rate'
    },{
      title:'评价内容',
      dataIndex:'info'
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
      <Table title={()=>'用户评价表'} bordered 
        columns={column}
        loading={this.state.loading}
        rowKey='id'
        pagination={this.state.pagination}
        dataSource={this.state.list}/>
    )
  }
}


export default EvaluateTable;