import { SET_CURRENT_SHOPPING_CART_LIST } from "../actions/shoppingCartAction";
const initialState = { shoppingCartList: [] };
function shoppingCartReducer(state = initialState, action) {
  // console.log("adasdasadadaa", state);
  switch (action.type) {
    case SET_CURRENT_SHOPPING_CART_LIST:
      // const itemInCart = action.payload.map((entry) => entry.item);
      return {
        // shoppingCartList: [...state.shoppingCartList, action.payload],
        //shoppingCartList: [...state.shoppingCartList, action.payload],

        //shoppingCartList: [action.payload],
        ...state,
        shoppingCartList: action.payload,
      };
    default:
      return state;
  }
}

export default shoppingCartReducer;
