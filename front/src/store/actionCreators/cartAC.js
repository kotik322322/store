import axios from "axios";
import {
    CART__ADD__ITEM, 
    CART_REMOVE_ITEM
} from "../actions/cartActions"

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`)

    dispatch({
        type : CART__ADD__ITEM,
        payload : {
            product : data._id,
            name : data.name,
            image : data.image,
            price : data.price,
            countInStock : data.countInStock,
            qty
        }
    })
    localStorage.setItems("cartItems", JSON.stringify(getState().cart.cartItems))
}