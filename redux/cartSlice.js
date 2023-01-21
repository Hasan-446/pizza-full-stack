import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products: [],
        total:0,
    },
    reducers:{
        addProduct:(state,action)=>{
            state.products.push(action.payload);
            state.total += action.payload.price*action.payload.quantity
        }
    }
})