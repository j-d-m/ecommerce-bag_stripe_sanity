//**this file will manage the state of the whole application */

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

// Creating global context so we are able just pass final function to the children components - NOTE Wrap the _app file in the stateContext tag
const Context = createContext();

//remember passing children as a props means whenever we call state context it will be passed to the children components
export const StateContext = ({ children }) => {
  //setting the cart default to false so we are seeing the cart until something is added.
  const [showCart, setShowCart] = useState(false);
  //This will hold the data from the localStorage and we will pass the data to this state.
  const [cartItems, setCartItems] = useState([]);
  //this will track the total price of the purchase
  const [totalPrice, setTotalPrice] = useState(0);
  //this will track the total quantity of the purchase
  const [totalQuantity, setTotalQuantity] = useState(0);
  //this will track the quantity of each item the user adds to their cart
  const [itemCount, setItemCount] = useState(1);

  let foundProduct;
  let index;

  //this function will allow us to add to the cart by checking if there are already items in the cart by comparing the item and product ids
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    // here we are asking if the product is in the cart and if it is we are setting the state of the total price amount for the cart
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantity((prevTotalQuantities) => prevTotalQuantities + quantity);
    if (checkProductInCart) {
      // here we are updating the total quantity in the cart
      const upDatedCartItems = cartItems.map((cartProduct) => {
        //this product refers to the product we are trying to add to the cart - this helps us to just update be able to update the price and quantity in the cart and not add another separate same product when clicking the add to cart button
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
        return cartProduct;
      });
      setCartItems(upDatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${itemCount} ${product.name} added to your cart`);
  };
  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
    setTotalPrice(
      (previousTotalPrice) =>
        previousTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantity(
      (previousTotalQuantity) => previousTotalQuantity - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };
  //differentiating between products in the cart by check and comparing the ids and values of each product added to cart.
  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    //spreading the properties of the product and adding a new property then increasing the quantity by 1
    if (value === "increment") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      //resetting the total price to add the previous price of the state and adding it to what ever product price is found according to the toggleCartItemQuantity function.
      setTotalPrice(
        (previousTotalPrice) => previousTotalPrice + foundProduct.price
      );
      setTotalQuantity((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "decrement") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);

        setTotalPrice(
          (previousTotalPrice) => previousTotalPrice - foundProduct.price
        );
        setTotalQuantity((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };
  //increasing the number of items added to the cart by checking the previous amount in the cart
  const increaseQuantity = () => {
    setItemCount((previousItemQuantity) => previousItemQuantity + 1);
  };

  //decreasing the number of items added to the cart by checking the previous amount in the cart
  const decreaseQuantity = () => {
    setItemCount((previousItemQuantity) => {
      if (previousItemQuantity - 1 < 1) return 1;
      return previousItemQuantity - 1;
    });
  };

  //After the return we are passing our state values to the child components within the context provider
  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantity,
        itemCount,
        increaseQuantity,
        decreaseQuantity,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
