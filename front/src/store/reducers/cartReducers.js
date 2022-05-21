import {CART__ADD__ITEM, CART_REMOVE_ITEM} from "../actions/cartActions"

const initialState = {
    cartItems : []
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART__ADD__ITEM : {
            const item = action.payload

            const existItem = state.cartItems.find(x => x.product === item.product)

            if(existItem) {
                return {
                    ...state,
                    cartItems : state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems : [...state.cartItems, item]
                }
            }
        }
            
            break;
    
        default:
            return state;
    }
}