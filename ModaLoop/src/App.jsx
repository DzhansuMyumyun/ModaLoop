import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import PageContainer from './container/PageContainer'
import Header from './components/Header'
import RouterConfig from './config/RouterConfig'
import Loading from './components/Loading'
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux'
import { calculateCart, removeFromCart, setDrawer } from './redux/slice/cartSlice'


function App() {

  const {cartProducts, drawer, totalAmount} = useSelector((store)=>store.cart)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(calculateCart())
  },[cartProducts])



  return (
    <>
    <PageContainer>
      <Header/>
      <RouterConfig/>
      <Loading/>
      <Drawer anchor='right' open={drawer} onClose={()=> dispatch(setDrawer())}>
       
        <div style={{width:"500px"}}>
          {
            cartProducts && cartProducts.map((product)=>{
              return(
                <div  key={product.id} className='drawer-product-container'>
                  <img src={product.image} alt="product image" width={60} height={60} />
                  <div className='drawer-product-info'>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                      <p style={{width:"200px"}}>{product.title}</p>
                      <p style={{color:"red", fontStyle:"italic"}}>{product.price}&#8364;</p>
                      <button onClick={() => dispatch(removeFromCart({ id: product.id, count: 1 }))}className='product-delete-button'>X</button>
                    </div>

                    <p style={{textAlign:"center"}}>Count: {product.count}</p>
                  </div>

                </div>
              )
            })
            
          }
        </div>
          <div>
            <p>Sum:{totalAmount}</p>
          </div>
      </Drawer>

    </PageContainer>
    </>
  )
}

export default App
