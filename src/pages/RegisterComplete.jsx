import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { getAuth, isSignInWithEmailLink, signInWithEmailLink ,updatePassword} from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addUser } from "../axios/admin";



const RegisterComplete = () => {
  const navigate =  useNavigate();
    const [email, setEmail] = useState(window.localStorage.getItem('emailForSignIn'));
    const [password, setPassword] = useState("");
    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForSignIn'));
    }, [])
    const auth = getAuth();
    console.log(window.localStorage.getItem('emailForSignIn'));
    const onFinish = async () => {
        if (isSignInWithEmailLink(auth, window.location.href)) {

            
            
            if (!email) {   

              setEmail(window.prompt('Please provide your email for confirmation'));
            }
            if (password) {
            await signInWithEmailLink(auth, email, window.location.href)
              .then(async(result) => {
                  console.log(result);
                if (result.user.emailVerified) {
                    console.log(result.user.emailVerified);
                    window.localStorage.removeItem('emailForSignIn');
                    let user = auth.currentUser;
                    // await user.updatePassword(user,password);
                    console.log(user);
                    
                    const idToken = await user.getIdTokenResult().then(

                   
                    await addUser(user.email).then(res => {

                        console.log(res);
                    })  
                    )
                    console.log(idToken);
                    
                }
              })
              .catch((error) => {
                console.log(error);
              });
            } else {
                toast.error("Please provide password");
            }   
          }
      };

     return (
  <>
  <ToastContainer></ToastContainer>
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
          <Input defaultValue={email} disabled/>
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
            Register Complete
          </Button>
        </Form.Item>
      </Form>
  
  
  </>);
};

export default RegisterComplete;
