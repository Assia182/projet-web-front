import React from 'react'
import Main from './Main';
import Basket from './Basket';
import NavBar from './Navbar';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Admin from './Admin';
import Stack from '@mui/material/Stack';


function Shop({countCartItems, products, onAdd, cartItems, onRemove}) {

  let navigate = useNavigate();

  function disconnect(){
    axios({
        method: "POST",
        mode : 'cors',
        url: process.env.REACT_APP_REACT_APP_Back_URL +"/users/logout",
        withCredentials : true
      }).then(()=>{
        navigate("/");
      })
}

const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    axios.get(process.env.REACT_APP_REACT_APP_Back_URL+'/users/current-user', { withCredentials: true })
    .then(response =>{
      setCurrentUser(response.data)
      console.log(response.data)
    }).catch((e) => console.log(e.request))
  }, []);
  console.log(process.env.REACT_APP_REACT_APP_Back_URL)

  return (
      <div>
        
        <NavBar currentUser={currentUser} disconnect={disconnect}/>
        {currentUser && currentUser.isAdmin === true && 
        <Admin></Admin>}
        <Stack alignItems="center" style={{ width: '100%'}} pt={15} mb={5}>
          <Main products={products} onAdd={onAdd}></Main>
          <Basket
            cartItems={cartItems}
            onAdd={onAdd}
            onRemove={onRemove}
          />
        </Stack>
      </div>
  )
}

export default Shop