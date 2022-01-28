import React, { useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';


import { Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";


import '../../css/showProducts.css'

import 'react-toastify/dist/ReactToastify.css';
const { Meta } = Card;




const Product = ({name,price,image,id,toast,catagory}) => {
  const navigate = useNavigate();
  const handle = (id) => {
    console.log(id);
    toast(id);
  }
  
  
  return <>
  
  <Card
  
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src={image ? image : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
      />
      
    }
    actions={[
      !catagory ? <EditOutlined key="edit" onClick={()=>navigate(`/admin/update/${id}`)}/> : null,
      !catagory ? <DeleteOutlined key="delete" onClick={()=>handle(id)}/> : null
      
      
    ]}
  >
    <Meta
      avatar={<Avatar src={image}/>}
      title={name}
      description={`${price} Rupees`}
    />
  </Card>
  </>
};
export default Product;
