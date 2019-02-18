import { Component } from 'react';
import { Layout,Icon,Menu } from 'antd';
import Link from 'umi/link';

const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

class BasicLayout extends Component {


    state={
        collapsed: false,
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    
    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                    >
                    <div style={{ height: '32px', margin: '16px'}}>
                        <img src={require('../../assets/logo.svg')} height='32px'/>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link to="/layout"></Link>
                            <Icon type="pie-chart"/>
                            <span>前端占位符</span>
                        </Menu.Item>
                        <SubMenu key="sub1" title={<div><Icon type="dashboard"/><span>商店管理</span></div>}>
                            <Menu.Item key="2"><Link to="/layout/dashboard/analysis"></Link>
                                <span>服务管理</span></Menu.Item>
                            <Menu.Item key="3"><Link to="/layout/dashboard/monitor"></Link><span>定价管理</span></Menu.Item>
                            <Menu.Item key="4"><Link to="/layout/dashboard/workplace"></Link><span>评价管理</span></Menu.Item>
                        </SubMenu>
                        <Menu.Item key='analysis'>
                            <Icon type="pie-chart" /><span>数据分析</span>
                        </Menu.Item>
                        <Menu.Item key='storeInfo'>
                            <Icon type="shop" /> <span>店铺信息</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>
                    Header</Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        {this.props.children}
                        </div>
                    </Content>
                    <Footer  style={{ textAlign: 'center' }}>@CopyRight Leesure</Footer>
                </Layout>
            </Layout>
        )
    }
}


export default BasicLayout;