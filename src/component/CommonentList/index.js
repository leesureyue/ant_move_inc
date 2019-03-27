import React from 'react';
import reqwest from 'reqwest';
import {
    List, Avatar, Button, Skeleton,
} from 'antd';
import style from './index.less';

//留言面板
class CommonentList extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        initLoading: true,
        loading: false,
        data: [],
        list: [],
    }

    componentDidMount() {
    this.getData((res) => {
      console.log(res)
      this.setState({
        initLoading: false,
        data: res.data,
        list: res.data,
      });
    });
  }

  getData = (callback) => {
    reqwest({
      url: "/shop/getEvaluateList",
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: (res) => {
        callback(res);
      },
    });
  }
 onLoadMore = () => {
    this.setState({
      loading: true,
      list: this.state.data.concat([...new Array(count)]
              .map(() =>
          ({ loading: true, name: {} }))),
    });
    this.getData((res) => {
      const data = this.state.data.concat(res.data);
      console.log(data)
      this.setState({
        data,
        list: data,
        loading: false,
      }, () => {
        window.dispatchEvent(new Event('resize'));
      });
    });
  }

  render() {
    const { initLoading, loading, list } = this.state;
    const loadMore = !initLoading && !loading ? (
      <div style={{
        textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
      }}
      >
        <Button onClick={this.onLoadMore}>查看更多</Button>
      </div>
    ) : null;

    return (
      <List
        className="loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<span>{item.userName}</span>}
                description={item.info}
              /> 
            </Skeleton>
          </List.Item>
        )}
      />
    );
    }
}

export default CommonentList;