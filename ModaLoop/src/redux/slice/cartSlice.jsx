import { createSlice } from '@reduxjs/toolkit'


const getCartFromStorage = () =>{
    if(localStorage.getItem("cart")){
        return JSON.parse(localStorage.getItem("cart"));
    }
    return [];
}   


const initialState = {
  cartProducts: getCartFromStorage(),
  drawer:false,
  totalAmount:0
}

const writeFromCartToStorage = (cart) =>{
    localStorage.setItem("cart", JSON.stringify(cart))
}




export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart : (state, action) => {
        const findProduct = state.cartProducts && state.cartProducts.find((product)=> product.id == action.payload.id);
        if(findProduct){
            const extractedProduct = state.cartProducts.filter((product) => product.id !== action.payload.id)

            findProduct.count += action.payload.count;
            state.cartProducts = [...extractedProduct, findProduct];
            writeFromCartToStorage(state.cartProducts)
            console.log("added")

        }else{
            state.cartProducts = [...state.cartProducts, action.payload]
            writeFromCartToStorage(state.cartProducts)
            console.log("new")
        }
    },
    removeFromCart: (state, action) => {
      const productIndex = state.cartProducts.findIndex(
        (product) => product.id === action.payload.id
      );

      if (productIndex !== -1) {
        const product = state.cartProducts[productIndex];
        product.count -= action.payload.count;

        if (product.count <= 0) {
          // Remove the product entirely
          state.cartProducts.splice(productIndex, 1);
        } else {
          // Update the count
          state.cartProducts[productIndex] = product;
        }

        writeFromCartToStorage(state.cartProducts);
      }
    }, 
    setDrawer : (state) => {
      state.drawer = !state.drawer
    },
    calculateCart : (state)=> {
      state.totalAmount = 0;
      state.cartProducts && state.cartProducts.map((product)=>{
        state.totalAmount += product.price* product.count;
      })
    }
  }
})

// Action creators are generated for each case reducer function
export const { addToCart,removeFromCart,setDrawer, calculateCart } = cartSlice.actions

export default cartSlice.reducer