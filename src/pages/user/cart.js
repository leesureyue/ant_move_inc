import React from 'react';
import styles from '../index.less';
import classNames from 'classnames';
import Link from 'umi/link';
import 'animate.css';
import {
    Steps, Button, message,Layout,Affix,Col,Row
} from 'antd';

import GlobalMenu from '../../component/GlobalMenu';
import GlobalFooter from '../../component/GlobalFooter';

const {Header,Content,Footer} =Layout;
const Step = Steps.Step;

//确认订单
const ConfirmOrder=(state)=>(
  <div>
    
  </div>
)

//提交订单，扫描二维码
const SubmitOrder=({url,totalCount})=>(
  <div>
    <img src={url}/>
    <p>总计:{totalCount}</p>
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

const steps = [{
  key:'1',
  title: '确认订单',
  content: <ConfirmOrder/>,
}, {
  key:'2',
  title: '提交订单',
  content: <SubmitOrder 
                url='http://localhost:8081/getQRCodeImage'
                totalCount='300$'/>,
}, {
  key:'3',
  title: '完成支付',
  content: <CompleteOrder/>,
}];

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
        const {current} =this.state;
        return (
          <Layout>
              <Affix>
              <Header className={styles.menuHeader}>
                  <img src={require('../../images/menu-logo.svg')} className={classNames(styles.img,'animated flipInX slower')}/>
                  <GlobalMenu/>
          </Header></Affix>
            <Content className={styles.stepContent}>
              <div>
                  <Steps current={current}>
                    {steps.map(item => <Step key={item.key} title={item.title} />)}
                  </Steps>
                    <div className={styles.content}>{steps[current].content}</div>
                    <div className={styles.stepsAction}>
                      {
                        current > 0
                        && (
                        <Button style={{marginRight:'8px'}} onClick={() => this.prev()}>
                          上一步
                        </Button>
                        )
                      }
                      {
                        current < steps.length - 1
                        && <Button type="primary" onClick={() => this.next()}>下一步</Button>
                      }
                      {
                        current === steps.length - 1
                        && <Button type="primary" onClick={() => message.success('支付成功!')}>完成</Button>
                      }
                  </div>
                </div>
            </Content>

            <Footer  className={styles.indexFooter}>
               <GlobalFooter
                  links={[{title:'SpringBoot',key:'1',href:'http://baidu.com'},{
                    title:'SpringBoot',key:'2',href:'http://baidu.com'
                  }]}
              copyright='@CopyRight · Leesure 河南大学软件学院'/>
            </Footer>

          </Layout>
        )
    }
}

export default ShoppingCart;