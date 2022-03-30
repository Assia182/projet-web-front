import React from 'react'
import NavBar from './Navbar';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';


function Admin() {
  const [currentUser, setCurrentUser] = React.useState({});

  let navigate = useNavigate();

  function goToReservations(){
    navigate("/liste/reservations");
  }

  function disconnect(){
    axios({
        method: "POST",
        mode : 'cors',
        url: "http://localhost:8000/users/logout",
        withCredentials : true
      }).then(()=>{
        navigate("/");
      })
}

  React.useEffect(() => {
    axios.get('http://localhost:8000/users/current-user', { withCredentials: true })
    .then(response =>{
      setCurrentUser(response.data)
      console.log(response.data)
    }).catch((e) => console.log(e.request))
  }, []);
  
  return (
    <div>
        <NavBar disconnect={disconnect}/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Button variant="contained" onClick={goToReservations} style={{
                  borderRadius: 35,
                  backgroundColor: "#D6C29A",
                  padding: "18px 36px",
                  fontSize: "18px"
              }}>Gérer les réservations</Button>
        </Stack>
    </div>
  )
}

export default Admin