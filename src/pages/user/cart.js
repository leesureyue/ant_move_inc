import React from 'react';
import styles from './cart.less';
import classNames from 'classnames';
import Link from 'umi/link';
import reqwest from 'reqwest';
import cookie from 'react-cookies';

import 'animate.css';
import {
    Steps, Button, Icon,Layout,Affix,Alert,Form,message,Input
} from 'antd';
import GlobalMenu from '../../component/GlobalMenu';
import GlobalFooter from '../../component/GlobalFooter';

const {Content} =Layout;
const Step = Steps.Step;
 
//提交订单，扫描二维码
const SubmitOrder=({price})=>(
  <div>
     
    <p>总计:{price}元</p>
    <span>手机扫码，在线支付</span>
  </div>
)

const CompleteOrder =()=>(
  <div className={styles.completeOrder}>
    <img src={require('../../images/orderComplete.png')}  width='150px' className='animated bounceIn'/>
    <span className={styles.completeText}>恭喜你，支付成功</span><br/>
    <Link to="/">
    <Button  size='large' type='primary' icon='home' className={styles.completeButton}>
      回到首页
    </Button>
    </Link>
    <Link to='/user/order'>
    <Button  size='large' type='default' icon='shopping'>查看订单</Button>
    </Link>
  </div>
)

//输出界面
class ShoppingCart extends React.Component{
    constructor(props){
        super(props);
        let userId= cookie.load('userId');
        console.log('userId:'+userId);
        this.state={
            current:0,
            order:{},
            userId:userId
        }
    }

    next() {
      if(this.state.current==1){
        this.submitOrder(this.props.location.state.id)
      }
      if(this.state.current==0){
        this.createOrder()
      }
      }
      
    prev() {
      const current = this.state.current - 1;
      this.setState({ current });
    }


    submitOrder=(id)=>{
      let userId= cookie.load('userId');
      reqwest({
        url:'/user/submitOrder',
        method:'get',
        data:{orderId:id}
      }).then(req=>{
         console.log(req)
         const current = this.state.current + 1;
         this.setState({ current }); 
      })
    }
    createOrder=()=>{
      this.props.form.validateFields((err,values)=>{
        console.log(values)
        if(!err){
          reqwest({
            url:'/user/createOrder',
            method:'post',
            data:values
          }).then(req=>{
            this.setState({order:req.data})
            const current = this.state.current + 1;
            this.setState({ current }); 
          })
        }
      })
    }
      
    render(){
      const steps = [
        {key:'1',title: '确认订单'},
        {key:'2',title: '提交订单'},
        {key:'3',title: '完成支付'}]; 
      const {current} =this.state;
        return (
          <Layout>
              <Affix>
              <GlobalMenu/>
              </Affix>
            <Content className={styles.stepContent}>
              <div>
                  <Steps current={current}>
                    {steps.map(item => 
                        <Step key={item.key} title={item.title} />)
                    }
                  </Steps>
                  {current==0 && <Alert message="请完善订单信息" type="warning" showIcon />}
                  <div className={styles.content}>
                    {current==0 && 
                    <Form>
                        <Form.Item label='用户Id'>
                        {this.props.form.getFieldDecorator('userId')
                        (<Input disabled/>)}
                        </Form.Item>
                        <Form.Item label='服务Id'>
                        {this.props.form.getFieldDecorator('serviceId')
                        (<Input  disabled/>)}
                        </Form.Item>
                        <Form.Item label='服务地址'>
                        {this.props.form.getFieldDecorator('address',{
                                rules:[{required:true,message:'请输入搬家起始地址'}]
                              })
                        (<Input placeholder='请输入搬家起始地址'/>)}
                        </Form.Item>
                        <Form.Item label='目的地'>
                        {this.props.form.getFieldDecorator('destination',{
                          rules:[{required:true,message:'请输入搬家目的地'}]
                        })
                        (<Input placeholder='请输入搬家目的地'/>)}
                        </Form.Item>
                        <Form.Item label='目的地'>
                        {this.props.form.getFieldDecorator('totalPay')
                        (<Input disabled/>)}
                        </Form.Item>
                      </Form>
                    }
                    {current==1 && <SubmitOrder 
                        price={this.props.location.state.price}/>}
                    {current==2 && <CompleteOrder/>}
                  </div>

                    <div className={styles.stepsAction}>
                      {
                        current > 0 && current< steps.length-1
                        && (
                        <Button icon='left' style={{marginRight:'8px'}} onClick={() => this.prev()}>
                          上一步
                        </Button>
                        )
                      }
                      {
                        current < steps.length - 1
                        && <Button type="primary" onClick={() => this.next()}>
                        下一步<Icon type='right'/></Button>
                      } 
                  </div>
                </div>
            </Content> 
             <GlobalFooter/>
          </Layout>
        )
    }

    componentDidMount(){
      const service=this.props.location.state;
      console.log(service)
      this.props.form.setFieldsValue({
        'userId':'123',
        'serviceId':service.id,
        'totalPay':service.price
      })
    }
}

export default Form.create()(ShoppingCart);