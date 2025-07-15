import React, { useState } from 'react'
import '../css/Header.css'
import { CiSearch } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { MdOutlineLightMode } from "react-icons/md";
import { MdNightlight } from "react-icons/md";
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer } from '../redux/slice/cartSlice';


function Header() {

  const [darkLightMode, setMode] = useState(false);
  const {cartProducts} = useSelector((store) => store.cart)
  const dispatch = useDispatch();

  const chnageMode = () =>{
    const root = document.getElementById("root");
    setMode(!darkLightMode)
    if(darkLightMode){
      root.style.background ="#333333";
      root.style.color="#fff"
    }else{
      root.style.background ="#fff";
      root.style.color="#333333"
    }
    setMode(!darkLightMode)
  }


  return (
    <div className='header-main-container flex-space-between'>
      <div className='header-logo-container flex-row'>
        <img src="./src/images/logo.png" alt="" />
        <p>ModaLoop</p>
      </div>
      <div className='header-input-container flex-row'>
        <CiSearch className='icon'/> <input type="text" className='search-input' name="search-input" id="search-input" placeholder='Search something' />
        <div className='header-icons-container'>


          {darkLightMode ? <MdOutlineLightMode onClick={chnageMode} className='icon'/> 
          :< MdNightlight onClick={chnageMode} className='icon'/>}
          <Badge badgeContent={cartProducts.length} color="primary">
            <FaCartShopping onClick={() => dispatch(setDrawer())}  className='icon'/>
          </Badge>
        </div>
      </div>

    </div>
  )
}

export default Header