import { Component } from 'react';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

class BasicLayout extends Component {

    render() {
        return (
            <Layout>
                <Sider style={{background:'#fff',textAlign:'center',padding:0}}>
                    Sider</Sider>
                <Layout>
                    <Content>Content</Content>
                    <Header>Header</Header>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}


export default BasicLayout;