import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox ,Upload} from "antd";
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { addProduct, getProduct, updateProduct } from "../../axios/admin";
import { useParams } from "react-router-dom";
import SelectOp from "../Select";
import "../../css/form.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { putCatagory } from "../../axios/admin";
const Productform =  () => {
    const [catagory, setCatagory] = useState('');
    const [productname, setProductname] = useState("");
    const [newname, setNewname] = useState("");
    const [price, setPrice] = useState();
    const [loading, setLoading] = useState(false);
  const {id}= useParams();
  console.log(id);
  useEffect(async() => {
    if(id) {
      setLoading(true);
     await getProduct(id).then((message) => {
        console.log(message.data[0].name);
        setProductname(message.data[0].name);
        setPrice(message.data[0].price);
        setImage(message.data[0].image);
        setLoading(false);
      })
    }
      
  }, [productname])
  const [image, setImage] = useState([]);
  
  

  const [url, setUrl] = useState("");
  function optionChange(value) {
    setCatagory(value);
  }
  const onFinish = async (values) => {
    console.log(catagory);
    
    const formData = new FormData();
    formData.append('file', image);
    formData.append("upload_preset","default_preset");
    await axios.post('https://api.cloudinary.com/v1_1/dqx0eyiow/image/upload', formData).then(res => {

      console.log(productname, price,res.data.secure_url,'inside submit');
      if(id){
        updateProduct(id,newname,price,res.data.secure_url,catagory).then(async(message) => {
          console.log(message.data.message);
          if(message.data.message == "Product update fail"){
            toast.error("Product update fail");
          }
          else{
            toast.success("Product updated successfully");
          }
        })
      } else {
       addProduct(newname, price,res.data.secure_url,catagory).then(async (message) => {
          console.log(message);
          if(message.data.message == "Product add fail"){
            toast.error("Product add fail");
          }else{
            toast.success("product added successfully");
            
    
    
          }
        })
      }
      
      
      
    
    });
    
    
    
    
  
};
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  

  return (
    <>
      <ToastContainer />
      
     {loading ? <div>Loading</div> : <Form
        className="form"
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Product name"
          name="name"
          rules={[{ required:  true, message: "Please input product name!" }]}
        >
          <Input defaultValue={productname} onChange={   (e)=> {
            // setProductname(e.target.value)
            setNewname(e.target.value);
          }}/>
        </Form.Item>

        <Form.Item
          label="price"
          name="price"
          rules={[{ required: true, message: "Please input product price!" }]}
        >
          <Input defaultValue={price} onChange={   (e)=> {
            setPrice(e.target.value);
          }}/>
        </Form.Item>
        <Form.Item
          label="image"
          name="image"
          
         
        >
          <input  type='file' onChange={(e)=>setImage(e.target.files[0])}/>
          
        </Form.Item>
        <Form.Item>

          <SelectOp className='select' option={optionChange}></SelectOp>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>} 
    </>
  );
};

export default Productform;
