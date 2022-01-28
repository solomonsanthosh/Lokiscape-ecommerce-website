
import './App.css';
import React,{useEffect} from 'react';
import {Route, Switch, Routes} from 'react-router-dom';
import FormPage from './admin/FormPage';
import ShowProducts from './admin/ShowProducts';
import Home from './pages/home';
import Register from './pages/Register';
import RegisterComplete from './pages/RegisterComplete';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from "firebase/auth";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const auth = getAuth();
  const unsubscribe = onAuthStateChanged(auth, (user) => {
  if (user) {
  
    const idToken = user.getIdTokenResult();
    console.log(idToken);
    dispatch({
      type: "LOGGED_USER",
      payload: {
        email: user.email,
        token: idToken.token,
      }

    });

    
  } else {
    
  }
});

  }, [])
  return (
    <>
    <Routes>
      <Route path="/register" element={<Register/>} /> 
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
