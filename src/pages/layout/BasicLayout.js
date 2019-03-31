import { Component } from 'react';
import { Layout,Icon,Menu } from 'antd';
import Link from 'umi/link';
import { getMenuData } from '../../common/menu';
import GlobalHeader from '../../component/GlobalHeader'
import SiderMenu from '../../component/SiderMenu'
import logo from '../../assets/logo.svg';
const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

class BasicLayout extends Component { 
    state={
        collapsed: false,
    }
    handleMenuCollapse = () => {
      this.setState({
        collapsed: !this.state.collapsed,
      });
    };
  render() {
    return (
      <Layout style={{minHeight: '100vh'}}>
      <SiderMenu
        logo={logo}
        collapsed={this.state.collapsed}
        menuData={getMenuData()}
        location={location}
        onCollapse={this.handleMenuCollapse}
      />
                <Layout>
                <Header style={{ padding: 0 }}>
                  <GlobalHeader
                    logo={logo}
                    collapsed={this.state.collapsed}
                    currentUser={{
                      name: 'Serati Ma',
                      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
                      userid: '00000001',
                      notifyCount: 12,
                    }}
                    onCollapse={this.handleMenuCollapse}
                  />
                </Header>
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