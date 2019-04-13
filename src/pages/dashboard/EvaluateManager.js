import React from 'React';
import {Table,Divider,message} from 'antd';
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
        current:1,total:20
      }
    }
  }
  componentWillMount(){
    this.getData(this.state.page);
  }

  getData(current){
    reqwest({
      url:'/shop/getEvaluateList',
      method:'get',
      data:{shopId:'',page:current,pageSize:this.state.pageSize}
    }).then(req=>{
      if(req.success){
       
        this.setState({
          page:this.state.page,
          list:req.data,
          loading:!req.success,
          pagination:{current:current,total:req.totalCount}
        })
      }else{
        message.error('错误：'+req.msg)
      }
    })
  }
  handleChange=(pagination)=>{
     this.getData(pagination.current)
  }

  
  handleDelete=(id)=>{
    reqwest({
      url:'/admin/removeEvaluate',
      mothod:'get',
      data:{orderId:id}
    }).then(req=>{
      if(req.success){
        message.success("删除成功");
        this.getData(this.state.pagination.current)
      }
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
    }]

    return (
      <Table title={()=>'用户评价表'}  
        columns={column}
        loading={this.state.loading}
        rowKey='id'
        onChange={this.handleChange}
        pagination={this.state.pagination}
        dataSource={this.state.list}/>
    )
  }
}


export default EvaluateTable;