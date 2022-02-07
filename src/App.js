
import './App.css';
import React,{useEffect} from 'react';
import {Route, Switch, Routes} from 'react-router-dom';
import FormPage from './admin/FormPage';
import ShowProducts from './admin/ShowProducts';
import Home from './pages/home';
import Register from './pages/Register';
import RegisterComplete from './pages/RegisterComplete';
import Login from './pages/Login';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUser } from "./axios/admin";
import Cart from './pages/Cart';


function App() {
 
  const dispatch = useDispatch();
  useEffect(() => {
    const auth = getAuth();
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log(user.email);
    await getUser(user.email).then(async(results) => {
     console.log(results);
     const idToken = await user.getIdTokenResult();
     console.log(user);
     console.log(idToken);
     
     dispatch({
      type: "LOGGED_USER",
      payload: {
        id: results.data,
        email: user.email,
        token: idToken.token,
      }
      
    })
    }).catch((error) => {
      console.log(error)
    }
    );

    
    

    
  } else {
    
  }
});

  }, [])
  return (
    <>
    <Routes>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/register" element={<Register/>} /> 
      <Route path="/login" element={<Login/>} /> 
      <Route path="/register/password" element={<RegisterComplete/>} /> 
      <Route path="/" element={<Home/>} /> 
      <Route path="/products/:catagory" element={<ShowProducts/>} />
    <Route path="/admin" element={<FormPage/>}/>
    <Route path="/admin/update/:id" element={<FormPage/>}/>
    <Route path="/admin/showproducts" element={<ShowProducts/>}/>
    </Routes>
    </>
  );
}

export default App;
