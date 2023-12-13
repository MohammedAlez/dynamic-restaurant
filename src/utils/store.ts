import { Actions, cartItem } from "@/types/types"
import { create } from "zustand"
import {persist} from 'zustand/middleware'

const INITIAL_STATE = {
    products:[],
    totalPrice:0,
    totalItems:0,
}


export const useCartStore = create(persist<Actions  & cartItem>((set,get)=>({
    products:INITIAL_STATE.products,
    totalPrice:INITIAL_STATE.totalPrice,
    totalItems:INITIAL_STATE.totalItems,
    addToCart(item:cartItem){
        const products = get().products;
        const productIn = products.find((product)=>product.id===item.id)
        if(productIn){
            const updatedProducts = products.map((product)=>
                (product.id===productIn.id) ? {
                    ...product,
                    price:product.price + item.price,
                    quantity:product.quantity + item.quantity,
                } 
                : product
            )
            set((state)=>({
                products:updatedProducts,
                totalPrice:state.totalPrice + item.price,
                totalItems:state.totalItems + item.quantity
            }))  
        }else{
            set((state)=>({
                products:[...state.products, item],
                totalPrice:state.totalPrice + item.price,
                totalItems:state.totalItems + item.quantity
            }))   
        }
    },
    removeFromCart(item:cartItem){
        set((state)=>({
            products:state.products.filter(temp=>temp.id!==item.id),
            totalPrice:state.totalPrice - item.price,
            totalItems:state.totalItems - item.quantity
        }))
    }
}),{name:'cart',skipHydration:true}))