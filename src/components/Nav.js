import React, {useState} from 'react'
import '../css/home.css'
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const Nav = () => {
    const handleClick = e => {
        setCurrent(e.key);
    };
    const [current, setCurrent] = useState();
    return (
        <>
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className='navBar'>
        <Menu.Item key="login" icon={<MailOutlined />}>
          Login
        </Menu.Item>
        <Menu.Item key="register"  icon={<AppstoreOutlined />}>
          Register
        </Menu.Item>
        <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Shop">
          
            <Menu.Item key="setting:1">Today Deals</Menu.Item>
            <Menu.Item key="setting:2">Shop by Catagory</Menu.Item>
          
         
        </SubMenu>
        
      </Menu>
        </>
    )
}

export default Nav
