const axios = require('axios');

export const addProduct = async (newname, price,url,catagory) => {
    console.log(newname, price,url,'axios');
    return await axios.post(
        'http://localhost:8000/addproduct',{
            name:newname,
            price:price,
            image:url,
            catagory:catagory
        }
    );
}
export const getProducts = async () => {
    return await axios.get(
        'http://localhost:8000/getproducts'
    );
}
export const deleteProduct = async (id) => {
    return await axios.delete(
        'http://localhost:8000/deleteproduct/'+id
    );
}

export const getProduct = async (id) => {
    return await axios.get(
        'http://localhost:8000/getproduct/'+id
    );
}

export const updateProduct = async (id,newname, price,url,catagory) => {
    console.log(newname, price,url,'axios');
    return await axios.put(
        'http://localhost:8000/updateproduct/'+id,{
            name:newname,
            price:price,
            image:url,
            catagory:catagory
        }
    );


}

export const getCatagory = async () => {
    return await axios.get(
        'http://localhost:8000/getcatagory'
    );
}
export const putCatagory = async (productId,catagory) => {
    return await axios.put(
        'http://localhost:8000/putcatagory/',{
            catagory:catagory,
            productId:productId
        }
    );
}
export const productCatagory = async (catagory) => {
    return await axios.get('http://localhost:8000/products/'+catagory);
}

export const addUser = async (email) => {
    return await axios.post(
        'http://localhost:8000/adduser',{
            email:email
        }
    );
}
export const getUser = async (email) => {
    console.log(email,'axios');
    return await axios.get(
        'http://localhost:8000/getuser/'+email
    );
}



export const addCart = async (json,userId,count) => {
    console.log(userId,json,count,'axios');
    return await axios.post(
        'http://localhost:8000/addcart',{
            userId:userId,
            products:json,
            count:count
        }
    )

}


export const getCart = async (userId) => {
    
    return await axios.get(
        'http://localhost:8000/getcart/'+userId
    );
}

export const updateCart = async (json,userId,count) => {
    return await axios.put('http://localhost:8000/updatecart',{
        userId:userId,
        products:json,
        count:count    
    })
}