import React from 'react';
import reqwest from 'reqwest';
import {
    List, Avatar, Button, Skeleton,
} from 'antd';
import style from './index.less';

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;
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
      this.setState({
        initLoading: false,
        data: res.results,
        list: res.results,
      });
    });
  }

  getData = (callback) => {
    reqwest({
      url: fakeDataUrl,
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
      const data = this.state.data.concat(res.results);
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
        <Button onClick={this.onLoadMore}>loading more</Button>
      </div>
    ) : null;

    return (
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a href="https://ant.design">{item.name.last}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              /> 
            </Skeleton>
          </List.Item>
        )}
      />
    );
    }
}

export default CommonentList;