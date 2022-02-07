import React,{useState,useEffect,useHistory} from 'react';
import { useParams,useLocation,useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Sidenav from '../components/admin/Sidenav';
import Product from '../components/admin/Product';
import  '../css/showProducts.css';
import { getCart, getProducts } from '../axios/admin';
import { ToastContainer, toast } from 'react-toastify';
import { deleteProduct,productCatagory } from "../axios/admin";
import Nav from '../components/Nav';
import 'react-toastify/dist/ReactToastify.css';
import { message } from 'antd';

const ShowProducts = () => {
  const location = useLocation();
  
  const params = useParams();
  console.log(params);
  const {catagory} = params;
  console.log(catagory);
  const [delet, setDelet] = useState(false);
  const [products, setProducts] = useState([]);
  
  const user1 = useSelector(state => state.user);
  const [user, setUser] = useState(user1);
  useEffect(() => {
    console.log(user);
    
    if(catagory) {
      productCatagory(catagory).then((message) => {
        console.log(message.data);
        setProducts(message.data);
        setDelet(false);
      })
      document.querySelector('.flex').style.backgroundColor = '#2D2D2D';
    } 
    else {
      
      if(location.pathname == `/cart`) {
        getCart().then((message) => {
          console.log(message.data);
          setProducts(message.data);
          setDelet(false);
        })

      }  else {

        getProducts().then((message) => {
          console.log(message.data)
          setProducts(message.data)
          setDelet(false)
           
         })
        }
      }

  }, [delet])


  const toastHandle = (message,mode) => {
    if(mode == 'success'){
      toast.success(message);
    } else {
      toast.error(message);
    }
  }
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
    {catagory ? <Nav/>:null}
  <div className='flex'>
    {!catagory && location.pathname !== '/cart'? <div className='sidenav'>
        <Sidenav className='nav'/>

    </div>: null}
    
    
    <div className="showproducts" >
      
      {products.map((product) => (
        // <div>{product}</div>
        
        <Product cart={product} name={product.name} price={product.price} image={product.image} id={product.id} toast={handleDelete} toastCart={toastHandle} catagory={catagory}/>
        )
      )}
        
        
    </div>
    </div>
    
  </>;
};

export default ShowProducts;
