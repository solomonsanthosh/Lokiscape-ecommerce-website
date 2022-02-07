import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { Card, Avatar } from "antd";
import { addCart, getProduct, updateCart } from "../../axios/admin";
import { getCart } from "../../axios/admin";

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import "../../css/showProducts.css";

import "react-toastify/dist/ReactToastify.css";
const { Meta } = Card;

const Product = ({
  name,
  price,
  image,
  id,
  toast,
  catagory,
  cart,
  toastCart,
}) => {
  const [getProduct, setGetProduct] = useState([]);
  const [checker, setChecker] = useState(false);
  let user = useSelector((state) => state.user);
  // const [userID, setUserID] = useState();
  useEffect(() => {}, [getProduct]);
  const navigate = useNavigate();
  const handle = (id) => {
    console.log(id);
    toast(id);
  };

  const OnCart = async (product) => {
  
    var products = [product];
    var count = products.length;
    var json = JSON.stringify(products);
    var userId = user.id;

    await getCart(parseInt(userId)).then(async (results) => {
      if (results.data.length === 0) {
        console.log("empty");
        await addCart(json, userId, count).then((message) => {
          console.log(message.data, "data");
          toastCart(message.data.message, "success");
        });
      } else {
        
       
        var getProduct = JSON.parse(results.data[0].products);
        const newProd = getProduct.some((item) => item.id === product.id)
        if(newProd){
          toastCart("Already in cart", "error");
        } else {
          const newProduct = [...getProduct, product];
          count = newProduct.length;
          console.log(newProduct, "newProduct");
          json = JSON.stringify(newProduct);
          updateCart(json, userId, count).then((message) => {
          console.log(message.data.message);
          toastCart(message.data.message, "success");
          });
        }
        console.log(newProd, "newProd");
        
        
      }
    });
    if (!user) {
      navigate("/register");
    }
  };

  return (
    <>
      <Card
        className="cardd"
        style={{
          width: 300,
          backgroundColor: catagory ? "#2D2D2D" : null,
          border: catagory ? "2px solid #FFB800" : null,
        }}
        cover={
          <img
            alt="example"
            src={
              image
                ? image
                : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            }
          />
        }
        actions={[
          !catagory ? (
            <EditOutlined
              key="edit"
              onClick={() => navigate(`/admin/update/${id}`)}
            />
          ) : (
            <Button
              onClick={() => OnCart(cart)}
              style={{
                margin: 0,
                backgroundColor: catagory ? "#2D2D2D" : null,
                border: catagory ? "2px solid #FFB800" : null,
              }}
              className="btn "
              danger
            >
              Add to Cart
            </Button>
          ),
          !catagory ? (
            <DeleteOutlined key="delete" onClick={() => handle(id)} />
          ) : null,
        ]}
      >
        <Meta
          avatar={<Avatar src={image} />}
          title={name}
          description={`${price} Rupees`}
        />
      </Card>
    </>
  );
};
export default Product;
