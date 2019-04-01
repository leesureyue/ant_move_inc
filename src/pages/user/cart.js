import React from 'react';
import styles from './cart.less';
import classNames from 'classnames';
import Link from 'umi/link';
import 'animate.css';
import {
    Steps, Button, Icon,Layout,Affix,Col,Row
} from 'antd';
import GlobalMenu from '../../component/GlobalMenu';
import GlobalFooter from '../../component/GlobalFooter';

const {Header,Content,Footer} =Layout;
const Step = Steps.Step;

//确认订单
const ConfirmOrder=({order})=>{
  
  return (
    <div>
      <p>订单号：{order.id}</p>
      <p>服务id号：{order.shopId}</p>
      <p>价格：{order.price}</p>
    </div>
  )
}

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
    <Button  size='large' type='default' icon='shopping'>查看订单</Button>
  </div>
)

//输出界面
class ShoppingCart extends React.Component{
    constructor(props){
        super(props);
        this.state={
            current:0,
        }
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
      }
      
    prev() {
      const current = this.state.current - 1;
      this.setState({ current });
    }
      
    render(){
        console.log(this.props.location.state)
        const steps = [{
          key:'1',
          title: '确认订单',
          content: <ConfirmOrder order={this.props.location.state}/>,
        }, {
          key:'2',
          title: '提交订单',
          content: <SubmitOrder 
                        price={this.props.location.state.price}/>,
        }, {
          key:'3',
          title: '完成支付',
          content: <CompleteOrder/>,
        }];

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
                    <div className={styles.content}>{steps[current].content}</div>

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
}

export default ShoppingCart;