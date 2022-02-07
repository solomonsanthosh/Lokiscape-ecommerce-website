import React ,{useEffect,useState}from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Checkbox } from "antd";
import { ToastContainer, toast } from 'react-toastify';
import Nav from '../components/Nav';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();
    const onFinish = async () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
            const user = userCredential.user;
            const idToken = await user.getIdTokenResult()
            dispatch({
                type: "LOGGED_USER",
                payload: {
                  email: user.email,
                  token: idToken.token,
                }
                
              })
               toast.success("Login Successful")
              navigate('/')
               
              
            
           
            
        })
        .catch(async(error) => {
            console.log(error);
            await toast.error(error.message)
              navigate('/register')
            
        });







    }
  return (

  <><ToastContainer></ToastContainer>
    <Nav/>
    <Form
        className="Register"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input defaultValue={email} onChange={(e)=> setEmail(e.target.value)}/>
        </Form.Item>

        <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        ></Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>



  </>);
};

export default Login;
