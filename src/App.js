import { useState, useEffect } from 'react';
import React from 'react';
import Shop from './components/Shop'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import axios from 'axios'
import ConfirmationReservation from './components/ConfirmationReservation';
import HandleReservations from './components/HandleReservations';
import Login from './components/Login'
import Admin from './components/Admin';

function App() {
  const [products, setProducts] = useState();
  const [cartItems, setCartItems] = useState([]);

  
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.idProduct === product.idProduct);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.idProduct === product.idProduct ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.idProduct === product.idProduct);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.idProduct !== product.idProduct));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.idProduct === product.idProduct ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  const fetchProducts = async () => {
    await axios.get('http://localhost:8000/products/all', { withCredentials: true })
    .then((response)=> setProducts(response.data));
  };

  useEffect(() => {
    fetchProducts();
    }, []);

  return (
    <div className="App">

    <Router>
      
      <Routes>

        <Route path="/" element={ <Login />} />

        <Route path="/accueil" element={
        
          <Shop countCartItems={cartItems.length} products={products} onAdd={onAdd} cartItems={cartItems} onRemove={onRemove}/>

        } />

          <Route path="/confirmation" element={ <ConfirmationReservation />} />
        

          <Route path="/liste/reservations" element={ <HandleReservations />} />


      </Routes>
      
      </Router>
  

    </div>
  );
}

export default App;
