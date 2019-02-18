import React from 'react';
import Link from 'umi/link';
import {
    Menu,Icon
} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class GlobalMenu extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <Menu style={{lineHeight: '64px',textAlign:'right'}}
            
            mode="horizontal"
            theme='dark'
          >
            <Menu.Item key="login">
              <Icon type="login" /> 登陆
            </Menu.Item>
            <Menu.Item key="register">
              <Icon type="user" />注册
            </Menu.Item>
            <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />个人中心</span>}>
              <MenuItemGroup title="Item 1">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup title="Item 2">
                <Menu.Item key="setting:3">Option 3</Menu.Item>
                <Menu.Item key="setting:4">Option 4</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <Menu.Item key="contant">
              <a href="https://ant.design" target="_blank" rel="noopener noreferrer"><Icon type="phone" />联系我们</a>
            </Menu.Item>
            <Menu.Item key='backManager'>
              <Link to='/layout'/><Icon type='appstore'/>后台管理
            </Menu.Item>
          </Menu>
        )
    }
}

export default GlobalMenu;