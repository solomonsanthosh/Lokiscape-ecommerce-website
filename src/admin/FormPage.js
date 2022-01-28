import React from 'react'
import Productform from '../components/admin/Productform'
import Sidenav from '../components/admin/Sidenav'
import '../css/adminpanel.css'

const FormPage = () => {

    return (
        <>
          
          <Sidenav classname="Sidenav"/> 
          <Productform classname="form"/>

        </>
    )
}

export default FormPage
