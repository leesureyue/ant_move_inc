import React, { Component } from 'react';
import { Card, Button ,Table,Modal,Form,Input,Icon} from 'antd';

class PuzzleCardsPage extends Component {
  constructor(props) {
    super(props);
  }

  state={
    visible:false,
    dataSource:[{
      'id':1,
      'name':'lee',
      'age':18,
      'sex':'female'
    }],
    pagination:{
      current:2,
      total:30,
      
    }
  }
  columns=[{
    title:'name',
    dataIndex:'name',
  },{
    title:'Age',
    dataIndex:'age',
  },{
    title:'Sex',
    dataIndex:'sex'
  },{
    title:'操作',
    render:(record)=>{
       
      return (<Button.Group>
        <Button onClick={()=>{this.handelModify(record)}}>编辑</Button>
        <Button onClick={()=>{this.handleDelete(record.id)}}>删除</Button>
      </Button.Group>)
    }
  }]

  handleDelete=(id)=>{
    console.log("id",id)
  }

  handelModify=(record)=>{
    console.log('record',record);
    this.props.form.setFieldsValue({
      'name':record.name,
      'age':record.age,
      'sex':record.sex
    })
    this.setState({visible:true})
  }

  showModal=()=>{
    this.setState({visible:true})
  }

  handelCancel=()=>{
    this.setState({visible:false})
  }

  handleTableChange=()=>{
    this.setState({pagination:{
      
    }})
  }
  //点击确定按钮的时候
  handelOk=()=>{
    this.props.form.validateFields((err,values)=>{
      if(!err){
        this.setState({visible:false})
      }
    })
  }
  render() {
     const {form:{getFieldDecorator}}=this.props;
    return (
      <div>
          <Modal visible={this.state.visible} 
                onCancel={this.handelCancel}
                title={<Icon type='user'/>}
                onOk={this.handelOk}>
              <Form  style={{maxWidth:'300px'}}>
                <Form.Item>
                  {getFieldDecorator('name',{
                    rules:[{required:true,message:'Please Input a Name'}]
                  })(<Input allowClear placeholder='Please Input a Name'/>)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('age',{
                    rules:[{required:true,message:'please Input a age'}]
                  })(<Input prefix={<Icon type='user'/>} placeholder='Please Input a User'/>)}
                </Form.Item>
              </Form>
          </Modal>
          <Table title={()=>'表头'} bordered 
                columns={this.columns}
                rowKey='id'
                pagination={this.state.pagination}
                dataSource={this.state.dataSource}/>
      </div>
    );
  }
}

export default Form.create({})(PuzzleCardsPage);