import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import '../css/home.css'
import 'antd/dist/antd.css';
import { getAuth, signOut } from "firebase/auth";
import { useDispatch ,useSelector} from 'react-redux';
import { Menu } from 'antd';

import { getCart } from '../axios/admin';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const Nav = () => {
  const [count, setCount] = useState(0);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
    getCart(user.id).then(res => {
      setCount(JSON.parse(res.data[0].products).length);
    })
  } 
    }, [user])
  const dispatch = useDispatch();
  console.log(user);
  if (user){
    const name = user.email
  }
  const auth = getAuth();
  const signout = () => {
    signOut(auth).then(() => {
      dispatch(
        {
          type: 'LOGOUT',
          payload: null
        }
      )
    }).catch((error) => {
      console.log(error);
    });
  }
    const handleClick = e => {
        setCurrent(e.key);
    };
    const [current, setCurrent] = useState();
    return (
        <>
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className='navBar'>
        <Menu.Item key="user" icon={<MailOutlined />}>
        <Link to={'/'}>{(user !== null) ?  user.email.split('@')[0] : 'user'}</Link>
         
           
           
        </Menu.Item>
        {user ? null: <Menu.Item key="login" icon={<MailOutlined />}>
          <Link to={'/login'}>Login</Link>
          </Menu.Item>}
        {user ? null :<Menu.Item key="register"  icon={<AppstoreOutlined />}>
        <Link to={'/register'}>Register</Link>
        </Menu.Item>}
        {user ?<Menu.Item key="cart"  icon={<AppstoreOutlined />} >
        <Link to={'/cart'}>Cart<span className='count'>{count}</span></Link>
        </Menu.Item>: null}
        {user ?<Menu.Item key="signout"  icon={<AppstoreOutlined />} onClick={signout}>
          Sign out
        </Menu.Item>: null}
        {/* <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Shop">
          
            <Menu.Item key="setting:1">Today Deals</Menu.Item>
            <Menu.Item key="setting:2">Shop by Catagory</Menu.Item>
          
         
        </SubMenu> */}
        
      </Menu>
        </>
    )
}

export default Nav
