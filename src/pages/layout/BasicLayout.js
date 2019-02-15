import { Component } from 'react';
import { Layout,Icon,Menu } from 'antd';
import Link from 'umi/link';

const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

class BasicLayout extends Component {

    render() {
        return (
            <Layout>
                <Sider width={256} style={{ minHeight: '100vh', color: 'white' }}>
                    <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px'}}/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link to="/layout"></Link>
                            <Icon type="pie-chart"></Icon>
                            <span>前端占位符</span>
                        </Menu.Item>
                        <SubMenu key="sub1" title={<span><Icon type="dashboard"></Icon>商店管理</span>}>
                            <Menu.Item key="2"><Link to="/layout/dashboard/analysis"></Link>服务管理</Menu.Item>
                            <Menu.Item key="3"><Link to="/layout/dashboard/monitor"></Link>定价管理</Menu.Item>
                            <Menu.Item key="4"><Link to="/layout/dashboard/workplace"></Link>评价管理</Menu.Item>
                        </SubMenu>
                        <Menu.Item key='analysis'>
                            <Icon type="pie-chart" /> 数据分析
                        </Menu.Item>
                        <Menu.Item key='storeInfo'>
                            <Icon type="shop" /> 店铺信息
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>Header</Header>
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