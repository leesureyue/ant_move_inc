import React from 'react';
import reqwest from 'reqwest';
import {
    List, Avatar, Button, Skeleton,message
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
        page:1,
        pageSize:10,
        data: [],
        list: [],
    }

    getData=(callback)=>{
      reqwest({
        url: "/shop/getEvaluateList",
        type: 'json',
        method: 'get',
        data:{shopId:this.props.shopId,
              page:this.state.page,
              pageSize:this.state.pageSize},
        contentType: 'application/json',
        success: (res) => {
          callback(res);
        },
      })
    }

    componentDidMount() {
      this.getData((res) => {
        this.setState({
          initLoading: false,
          data: res.data,
          list: res.data,
        });
      });
    }
 
 onLoadMore = () => {
   console.log(this.state.page)
    this.setState({
      loading: true,
      page:this.state.page+1,
      list: this.state.data.concat([...new Array(10)]
              .map(() =>
          ({ loading: true, name: {} }))),
    });
    this.getData((res) => {
      const data = this.state.data.concat(res.data); 
      data.length>=0 &&
      this.setState({
        data,
        list: data,
        loading: false,
      }, () => {
        window.dispatchEvent(new Event('resize'));
      }) ;
    });
  }

  render() {
    const { initLoading, loading, list } = this.state;
    const loadMore = !initLoading && !loading  && this.state.data.length!=0? (
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