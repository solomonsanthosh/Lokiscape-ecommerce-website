import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { app } from "../firebase";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";
import Nav from '../components/Nav';
import 'react-toastify/dist/ReactToastify.css';
import "../css/auth.css";

const Register = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //firebase
  const auth = getAuth();
  const actionCodeSettings = {
    
    url: 'http://localhost:3000/register/password',
    // This must be true.
    handleCodeInApp: true,
    
  };
  const onFinish = () => {
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        toast.success("Email sent");
        window.localStorage.setItem("emailForSignIn", email);
        
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
        
      });
  };

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
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        {/* <Form.Item
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
      </Form.Item> */}

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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Register;
