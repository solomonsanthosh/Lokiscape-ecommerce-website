import React,{useState,useEffect} from 'react';
import { useParams } from "react-router-dom";
import Sidenav from '../components/admin/Sidenav';
import Product from '../components/admin/Product';
import  '../css/showProducts.css';
import { getProducts } from '../axios/admin';
import { ToastContainer, toast } from 'react-toastify';
import { deleteProduct,productCatagory } from "../axios/admin";

import 'react-toastify/dist/ReactToastify.css';

const ShowProducts = () => {
  const params= useParams();
    const {catagory} = params;
  console.log(catagory);
  const [delet, setDelet] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    
    if(catagory) {
      productCatagory(catagory).then((message) => {
        console.log(message.data);
        setProducts(message.data);
        setDelet(false);
      })
    } else {
      getProducts().then((message) => {
        console.log(message.data);
        setProducts(message.data);
        setDelet(false);
         
       })
      }

  }, [delet])
 
  const handleDelete = async (id) => {
    console.log(id);
    await deleteProduct(id).then((message) => {
      console.log(message.data.message);
      if(message.data.message == "Product delete fail"){
        toast.error("Product delete fail");
        setDelet(false);
      }else{
        toast.success("product deleted successfully");
        
        setDelet(true);

      }
    })
  }
  return <>
  <ToastContainer />
  <div className='flex'>
    {!catagory ? <div className='sidenav'>
        <Sidenav className='nav'/>

    </div>: null}
    
    
    <div className="showproducts">
      
      {products.map((product) => (
        // <div>{product}</div>
        
        <Product name={product.name} price={product.price} image={product.image} id={product.id} toast={handleDelete} catagory={catagory}/>
        )
      )}
        
        
    </div>
    </div>
    
  </>;
};

export default ShowProducts;
