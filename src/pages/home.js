import React , {useState,useEffect}from 'react';
import { useNavigate } from 'react-router-dom';
import hero from '../img/hero.png';
import ball from '../img/Ellipse.png';
import Nav from '../components/Nav';
import img1 from '../img/img1.png';
import img2 from '../img/img2.png';
import img3 from '../img/img3.png';
import img4 from '../img/img4.png';
import img5 from '../img/img5.png';
import img6 from '../img/img6.png';

import SelectOp from '../components/Select';
import { getCatagory } from '../axios/admin';
import '../css/home.css';

const Home = () => {
  // const [catagoryimg,setCatagoryimg] = useState([img1,img2,img3,img4,img5,img6]);
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    console.log(id);
    navigate(`/products/${id}`);
  }
  const [catagory,setCatagory]  = useState([]);

    useEffect(()=>{
      getCatagory().then(res=>{ 
        setCatagory(res.data)})
    },[])
    const [current, setCurrent] = useState('mail');
    const handleClick = e => {
        console.log('click ', e);
        setCurrent({ current: e.key });
      };
  return (
  <>
  
  <Nav/>
  <div className="hero">
    <h1><img src={ball} className='heroimg2'></img>
    <img src={ball} className='heroimg3'></img>LOKI<br/>SCAPE</h1>
    <img src={hero} className='heroimg'></img>
  

  </div>
  
  <h1 className='sbc'>Shop by Category</h1>
  
  <div className='flex1'>
    {/* catagory */}
    {catagory.map(item=>(
      <div className="catagory" onClick={()=>handleNavigate(item.id)}>
        <h1>{item.name}</h1>
        {console.log(item.id)}
        {item.name == 'Electronics'? <img src={img1} className='catimg'></img>  : null}
        {item.name == 'Grocery'? <img src={img2} className='catimg'></img>  : null}
        {item.name == 'Clothing' ? <img src={img3} className='catimg'></img>  : null}
        {item.name == 'Jewellery'? <img src={img4} className='catimg'></img>  : null}
        {item.name == 'Footwear'? <img src={img5} className='catimg'></img>  : null}
        {item.name == 'Books'? <img src={img6} className='catimg'></img>  : null}
       
      </div>
    ))}
     </div>
  

  
  </>)
};

export default Home;
