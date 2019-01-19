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
                            <Link to="/helloword"></Link>
                            <Icon type="pie-chart"></Icon>
                            <span>helloWord</span>
                        </Menu.Item>
                        <SubMenu key="sub1" title={<span><Icon type="dashboard"></Icon>dashboard</span>}>
                            <Menu.Item key="2"><Link to="/dashboard/analysis"></Link>分析页</Menu.Item>
                            <Menu.Item key="3"><Link to="/dashboard/monitor"></Link>监控页</Menu.Item>
                            <Menu.Item key="4"><Link to="/dashboard/workplace"></Link>工作台</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>Header</Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        {this.props.children}
                        </div>
                    </Content>
                    <Footer  style={{ textAlign: 'center' }}>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}


export default BasicLayout;