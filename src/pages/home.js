import React , {useState,useEffect}from 'react';
import { useNavigate } from 'react-router-dom';
import hero from '../img/hero.png';
import ball from '../img/Ellipse.png';
import Nav from '../components/Nav';
import SelectOp from '../components/Select';
import { getCatagory } from '../axios/admin';
import '../css/home.css';

const Home = () => {
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
  
  <div className='selectContainer'>
  <SelectOp className ='sl'/>
  </div>
  <div className='flex1'>
    {/* catagory */}
    {catagory.map(item=>(
      <div className="catagory" onClick={()=>handleNavigate(item.id)}>
        <h1>{item.name}</h1>
        
      </div>
    ))}
     </div>
  

  
  </>)
};

export default Home;
