import { configureStore, createSlice } from '@reduxjs/toolkit'
import data from './store.json'
import product from './productSlice.js'
import cartList from './cartListSlice'

let dragProduct = createSlice({//검색창 텍스트
    name : 'dragProduct',
    initialState : '',
    reducers : {
        setDragProduct(state, action){
            return action.payload
        }
    }
    
})
export let { setDragProduct } = dragProduct.actions

export default configureStore({
    reducer: {
        product : product.reducer,
        dragProduct : dragProduct.reducer,
        cartList : cartList.reducer
    }
}) 