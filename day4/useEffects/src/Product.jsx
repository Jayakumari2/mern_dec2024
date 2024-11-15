import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Product=()=>{
    const [product,setProduct]=useState([]);
    useEffect(()=>{
        axios.get('https://fakestoreapi.com/products')
        .then((response)=>{
            console.log(response.data);
            setProduct(response.data);
        })
        .catch((error)=>{
            console.log(error);
        });
    },[])
    return(
        <div className='products'>
        {product.map((product)=>(
            <div key={product.id} className='product'>
                <h3>{product.title}</h3>
                <p>{product.price}</p>
                <img src={product.image} alt ={product.title} style={{width:"100px"}}/>
            </div>
        ))}
        </div>
    )
}

export default Product