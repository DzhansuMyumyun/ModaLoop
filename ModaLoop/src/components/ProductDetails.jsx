import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {setSelectedProduct} from '../redux/slice/productSlice'
import '../css/ProductDetails.css'
import { IoMdArrowBack } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { FaDisplay } from 'react-icons/fa6';
import { addToCart, calculateCart } from '../redux/slice/cartSlice';



function ProductDetails() {
    const {id} = useParams();
    const {products, selectedProduct} = useSelector((store) => store.product)
    const {price, image, title, description} =selectedProduct
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [count, setCount] = useState(0);

    const addCart=() => {
        const payload = {
            id,
            price,
            image,
            title,
            description,
            count
        }
        dispatch(addToCart(payload))
        dispatch(calculateCart());
    }



    const increment = ()=>{
        setCount(count + 1)
    }

    const decrement = ()=>{
        if(count>0){
         setCount(count - 1)
        }
    }

    useEffect(() => {
        getProductById();
    },[])

    const getProductById = () => {
        products && products.map((product)=> {
            if(product.id == id){
                dispatch(setSelectedProduct(product))
            }
        })
    }



  return (
    <div className='product-description-container'>
        <div className='product-desc-image-con'>
            <img src={selectedProduct.image} alt="" />
        </div>
        <div className='product-desc-info'>
            <div className='product-desc-info-con'>
                <div className='productDetails-back-but-con'>
                    <button onClick={() => navigate("/")}> Back to the list</button>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className='product-desc-price-container'>
                    <span className='product-price'>{price}&#8364;</span>
                </div>

                <div className='count-product-container'>
                    <button onClick={increment}><CiCirclePlus  /></button>
                    <p>{count}</p>
                    <button onClick={decrement}><CiCircleMinus /></button>
                </div>

                <div className='cart-button-container'>
                    <button onClick={addCart}>Add to the cart</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails