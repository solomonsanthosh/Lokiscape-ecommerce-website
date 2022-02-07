const axios = require('axios');

export const addProduct = async (newname, price,url,catagory) => {
    console.log(newname, price,url,'axios');
    return await axios.post(
        'https://lokiscape-server.herokuapp.com/addproduct',{
            name:newname,
            price:price,
            image:url,
            catagory:catagory
        }
    );
}
export const getProducts = async () => {
    return await axios.get(
        'https://lokiscape-server.herokuapp.com/getproducts'
    );
}
export const deleteProduct = async (id) => {
    return await axios.delete(
        'https://lokiscape-server.herokuapp.com/deleteproduct/'+id
    );
}

export const getProduct = async (id) => {
    return await axios.get(
        'https://lokiscape-server.herokuapp.com/getproduct/'+id
    );
}

export const updateProduct = async (id,newname, price,url,catagory) => {
    console.log(newname, price,url,'axios');
    return await axios.put(
        'https://lokiscape-server.herokuapp.com/updateproduct/'+id,{
            name:newname,
            price:price,
            image:url,
            catagory:catagory
        }
    );


}

export const getCatagory = async () => {
    return await axios.get(
        'https://lokiscape-server.herokuapp.com/getcatagory'
    );
}
export const putCatagory = async (productId,catagory) => {
    return await axios.put(
        'https://lokiscape-server.herokuapp.com/putcatagory/',{
            catagory:catagory,
            productId:productId
        }
    );
}
export const productCatagory = async (catagory) => {
    return await axios.get('https://lokiscape-server.herokuapp.com/products/'+catagory);
}

export const addUser = async (email) => {
    return await axios.post(
        'https://lokiscape-server.herokuapp.com/adduser',{
            email:email
        }
    );
}
export const getUser = async (email) => {
    console.log(email,'axios');
    return await axios.get(
        'https://lokiscape-server.herokuapp.com/getuser/'+email
    );
}



export const addCart = async (json,userId,count) => {
    console.log(userId,json,count,'axios');
    return await axios.post(
        'https://lokiscape-server.herokuapp.com/addcart',{
            userId:userId,
            products:json,
            count:count
        }
    )

}


export const getCart = async (userId) => {
    
    return await axios.get(
        'https://lokiscape-server.herokuapp.com/getcart/'+userId
    );
}

export const updateCart = async (json,userId,count) => {
    return await axios.put('https://lokiscape-server.herokuapp.com/updatecart',{
        userId:userId,
        products:json,
        count:count    
    })
}