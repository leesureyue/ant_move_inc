import {Button,Card ,Col,Row,message} from 'antd';
import {connect} from 'dva';
import styles from './ShopInfo.less';
import GlobalMenu from '../../component/GlobalMenu';
import GlobalFooter from '../../component/GlobalFooter';

import React from 'react';

class ShopInfo extends React.Component{

  changeShopInfo=()=>{
    message.error('该功能还未实现')
  }
  render(){
    return(
      <div>
        <Card className={styles.normal_shop_info}
          title="基本信息"
          extra={<Button size='small'
           onClick={this.changeShopInfo}
          >
          更新店铺信息</Button>}
        >
        <Row>
          <Col span={8}>
          <p><span>名称：</span> 蚂蚁搬家公司</p>
          <p><span>电话：</span> 18236551812</p>
          </Col>
          <Col span={8}>
          <p><span>名称：</span> 蚂蚁搬家公司</p>
          <p><span>电话：</span> 18236551812</p>
          </Col>
          <Col span={8}>
          <p><span>名称：</span> 蚂蚁搬家公司</p>
          <p><span>电话：</span> 18236551812</p>
          </Col>
        </Row>
        </Card>

        <Card className={styles.normal_shop_info}
          title="基本信息"
        >
        <Row>
          <Col span={8}>
          <p><span>名称：</span> 蚂蚁搬家公司</p>
          <p><span>电话：</span> 18236551812</p>
          </Col>
          <Col span={8}>
          <p><span>名称：</span> 蚂蚁搬家公司</p>
          <p><span>电话：</span> 18236551812</p>
          </Col>
          <Col span={8}>
          <p><span>名称：</span> 蚂蚁搬家公司</p>
          <p><span>电话：</span> 18236551812</p>
          </Col>
        </Row>
        </Card>
      </div>
    )
  }
}

export default ShopInfo;
