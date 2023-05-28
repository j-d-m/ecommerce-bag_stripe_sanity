import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
// Creating global context so we are able just final function to the children components
const Context = createContext();

//remember passing children as a props means whenever we call state context it will be passed to the children components
export const StateContext = ({ children }) => {
  //
  const [showCart, setShowCart] = useState(false);
  //This will hold the data from the localstorage
  const [cartItems, setCartItems] = useState();
  //this will track the total price of the order
  const [totalPrice, setTotalPrice] = useState();
  //this will track the total quantity of the order
  const [totalQuantity, setTotalQuantity] = useState();
  //this will track the quantity of each item the user adds to their cart
  const [itemCount, setItemCount] = useState(1);

  //increasing the number of items added to the cart by checking the previous amount in the cart
  const increaseQuantity = () => {
    setItemCount((previousItemQuantity) => previousItemQuantity + 1);
  };
  const decreaseQuantity = () => {
    setItemCount((previousItemQuantity) => {
      if (previousItemQuantity - 1 < 1) return 1;

      return previousItemQuantity - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantity,
        itemCount,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);

// const notify = () => toast('Here is your toast.');

// const App = () => {
//   return (
//     <div>
//       <button onClick={notify}>Make me a toast</button>
//       <Toaster />
//     </div>
//   );
// };
