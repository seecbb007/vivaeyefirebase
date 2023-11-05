export const SET_CURRENT_SHOPPING_CART_LIST = "SET_CURRENT_SHOPPING_CART_LIST";

export const setCurrentShoppingCartList = (data) => {
  return {
    type: "SET_CURRENT_SHOPPING_CART_LIST",
    payload: data,
  };
};

const fetchDataSuccess = (data) => ({
  type: SET_CURRENT_SHOPPING_CART_LIST,
  payload: data,
});
