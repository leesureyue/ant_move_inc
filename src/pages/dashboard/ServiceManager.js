import React from 'react';
import {Table,Button,Divider,Form,Input,Modal,message} from 'antd';
import reqwest from 'reqwest';


class ServiceList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      page:1,
      pageSize:10,
      list:[],
      loading:true,
      visible:false,
      pagination:{}
    }
  }
  componentWillMount(){
    this.getData(1)
  }


  getData(current){
    reqwest({
      url:'/shop/getServiceList',
      method:'get',
      data:{shopId:'',
      page:this.state.page,
      pageSize:this.state.pageSize}
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

  showModal=( )=>{
    this.setState({visible:true})
  }
  closeModal=()=>{
    this.setState({visible:false})
  }

  handleModify=(record)=>{
    console.log(record);
    this.props.form.setFieldsValue({
      'title':record.title,
      'desc':record.desc,
      'price':record.price
    })
    this.setState({visible:true})
  }

  handleAdd=(record)=>{
    console.log(record);
    this.props.form.validateFields((err, values) => {
      if (!err) {
          reqwest({
            url:'/admin/releaseService',
            method:'post',
            data:values,
          }).then(res=>{
            if(res.success){
              this.setState({visible:false})
              message.success('发布成功')
              this.getData(res.current)
              this.props.form.resetFields();
            }else{
              message.err('错误'+res.msg)
            }
          })
      }
    });
  }
  handleDelete=(id)=>{
    reqwest({
      url:'/admin/offlineService',
      mothod:'get',
      data:{serviceId:id}
    }).then(req=>{
      if(req.success){
        message.success("服务下线成功");
        this.getData(req.current)
      }
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
      title:'状态',
      dataIndex:'state',
    },{
      title:'操作',
      render:(record)=>{
        return (<span>
          <a onClick={()=>{this.handleModify(record)}}>更新</a>
          <Divider type="vertical" />
          <a onClick={()=>{this.handleDelete(record.id)}}>下线</a>
        </span>)
      }
    }]

    return (
      <div>
        <Modal
          visible={this.state.visible}
          onCancel={this.closeModal}
          onOk={this.handleAdd}
          > 
          <Form>
            <Form.Item label='标题'>
              {this.props.form.getFieldDecorator('title',{
                rules:[{required:true,message:'请输入服务名称'}]
              })(<Input 
                allowClear
                placeholder='服务名称'/>)}
            </Form.Item>
  
            <Form.Item label='描述'>
              {this.props.form.getFieldDecorator('desc',{
                rules:[{required:true,message:'请输入服务描述'}]
              })(<Input.TextArea placeholder='服务描述...'/>)}
            </Form.Item>
            <Form.Item label='价格'>
              {this.props.form.getFieldDecorator('price',{
                rules:[{required:true,message:'请输入价格'}]
              })(<Input allowClear placeholder='服务价格'/>)}
              </Form.Item>
          </Form>
        </Modal>
        <Button 
        size='default' 
        type='primary'
        onClick={this.showModal}>发布新服务</Button>
        <Table  
          columns={column}
          loading={this.state.loading}
          rowKey='id'
          pagination={this.state.pagination}
          dataSource={this.state.list}/>
      </div>
    )
  }
}

export default Form.create()(ServiceList);