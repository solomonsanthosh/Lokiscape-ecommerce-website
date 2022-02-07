import React,{useState,useEffect} from 'react';
import '../css/cart.css';
import { getCart } from '../axios/admin';
import { useSelector } from 'react-redux';
import Nav from '../components/Nav';
const CartCard = ({name,price,image}) => {
  return (
    <>
   <div className='cartMain'>
      
      <img src={image}/>
      <div className='cartDetails'>

        <h1>{name}</h1>

      </div>
      <div className='cartPrice'>
        <h1>{price}</h1>
      
      </div>
    </div>
    
    
    </>
    )
  

};
const Cart = () => {
  let user  = useSelector((state) => (state.user));

  const [cart, setCart] = useState('');

  const [cartDetails, setCartDetails] = useState();

  console.log(user);




  useEffect(()=>{
    if(user) {
    setCart(JSON.stringify(user.id))}

    console.log(cart);
    getCart(cart).then((results)=>{

      console.log(results.data[0].products);
      setCartDetails(JSON.parse(results.data[0].products));
      console.log(cartDetails);
    })
  },[user,cart])
  


  return (
  <>
  <Nav/>
  {cartDetails ? cartDetails.map((product)=><CartCard name={product.name} price = {product.price} image={product.image}/>) : null}
  
  </> )
};





export default Cart;
