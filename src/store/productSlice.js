import { configureStore, createSlice } from '@reduxjs/toolkit'
import data from './store.json'

let product = createSlice({//상품 목록
    name : 'product',
    initialState : data.products,
    reducers : {
        setProduct(state, action){
            return action.payload
        }
    }
    
})

export let { setProduct } = product.actions

export default product