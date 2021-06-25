import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import { commerce } from './lib/Commerce'
import Cart from './components/Cart/Cart';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Checkout from './components/CheckoutForm/Checkout/Checkout';


function App() {



  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');


  const fetchProducts = async () => {

    const { data } = await commerce.products.list();

    setProducts(data);
    // console.log(data)


  }


  const fetchCart = async () => {

    const response = await commerce.cart.retrieve();
    console.log(response)
    setCart(response)
  }

  const addToCartHandler = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity)
    // console.log(cart)
    setCart(cart)

  }
  const updateCartQtyHandler = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity })
    // console.log(cart)
    setCart(cart);

  }
  const removeCartQtyHandler = async (productId) => {
    const { cart } = await commerce.cart.remove(productId)
    // console.log(cart)
    setCart(cart);

  }
  const emptyCartHandler = async () => {
    try {
      const { cart } = await commerce.cart.empty();
      setCart(cart);
    } catch (error) {
      console.error(error)
    }
  }

  // after order refresh cart  capturecheckouthandler>refreshcart

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  }
  // use setOrder to set inonming order to state
  const captureCheckoutHandler = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
      setOrder(incomingOrder)
      refreshCart();
    }
    catch (error) {
      setErrorMessage(error.data.error.message)
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [])

  // console.log(cart)

  return (
    <BrowserRouter>
      <div>

        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path='/'>
            <Products products={products} addToCart={addToCartHandler} />

          </Route>
          <Route exact path='/cart'>
            <Cart cart={cart} updateCartQtyHandler={updateCartQtyHandler} removeCartQtyHandler={removeCartQtyHandler} emptyCartHandler={emptyCartHandler} />

          </Route>
          <Route exact path='/checkout'>
            <Checkout cart={cart} captureCheckoutHandler={captureCheckoutHandler} order={order} error={errorMessage} />

          </Route>
        </Switch>

      </div>

    </BrowserRouter>




  );
}

export default App;
