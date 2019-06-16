
let initialState = {
  cart_items: {products:[]}
};

const chart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_Chart':
      {
        return {
          ...state,
          cart_items: action.payload
        }
      }
    case 'Remove_Chart':
      {
        const newArray = state.cart_items.products.slice(0);
        const indexToRemove = newArray.findIndex((e) => e.id === action.payload)
        var price = 0
        state.cart_items.products.forEach((product) =>{
            if(product.id!==action.payload)
            {
                price += product.quantity * product.price
            }
        })
        state.cart_items.quantity = state.cart_items.quantity - newArray[indexToRemove].quantity
        state.cart_items.subtotal = state.cart_items.total = price;
        state.cart_items.displaySubTotal = state.cart_items.displayTotal = "US$"+state.cart_items.subtotal;
        if (indexToRemove > -1) {
          newArray.splice(indexToRemove, 1);
        }
        return {
          ...state,
          cart_items: {
            ...state.cart_items,
            products: newArray,
          }
        }
      }
    default:
      return state
  }
}

export default chart;