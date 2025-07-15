import React from 'react'
import '../css/Product.css'
import {useNavigate} from 'react-router-dom'

function Product({product}) {
    const {id, price, image, title, description} = product;
    const navigate = useNavigate();


  return (
    <div className='product-main-container'>
        <div className='product-image-container'>
            <img src={image} alt="" />
        </div>

        <h3>{title}</h3>
        <div className='product-price-container'>
            <span className='product-price'>{price}&#8364;</span>
        </div>
        <div className='product-info-container flex-row'>
            <button onClick={() => navigate("/product-details/" + id)}>Description</button>
        </div>
    </div>
  )
}

export default Product