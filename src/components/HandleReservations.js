import React from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import NavBar from './Navbar'
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';



function HandleReservations() {

    let navigate = useNavigate();

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

    const [currentUser, setCurrentUser] = React.useState({});

    const [reservations, setReservations] = React.useState();

    const [currentId, setCurrentId] = React.useState();

    function handleAttente(){

      axios.patch('http://localhost:8000/reservations/' + currentId, {
        reservationStateNameReservationState : 'En attente'
      })
      .then((res) => console.log("res.data"))
    }

    function handleTerminee(){

      axios.patch('http://localhost:8000/reservations/' + currentId, {
        reservationStateNameReservationState: 'Terminée'
      })
      .then((res) => console.log("res.data"))
      
    }

const fetchReservations = async () => {
    await axios.get('http://localhost:8000/reservations/all', { withCredentials: true })
    .then((response)=> setReservations(response.data));
};

React.useEffect(() => {
    axios.get('http://localhost:8000/users/current-user', { withCredentials: true })
    .then(response =>{
      setCurrentUser(response.data)
      console.log(response.data)
    }).catch((e) => console.log(e.request))
  }, []);

  React.useEffect(() => {
    fetchReservations();
    }, []);

  return (
    <div>
        <h1>Liste des réservations</h1>
        <NavBar disconnect={disconnect}/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        {currentUser && currentUser.isAdmin === true && 
        
        <TableContainer  >
          <Table sx={{ border: 1 }} style={{ width: '70%', margin: 'auto' }}>
            <TableHead>
            <TableRow>
                <TableCell>Numéro de réservation</TableCell>
                <TableCell>Email du client</TableCell>
                <TableCell>Date de réservation</TableCell>
                <TableCell>Date de retrait </TableCell>
                <TableCell>Etat de la réservation </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {reservations && reservations.map((reservation) => (
                <TableRow
                key={reservation.idReservation}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {reservation.idReservation}
                </TableCell>
                <TableCell>{reservation.userEmailUser}</TableCell>
                <TableCell>{reservation.dateReservation}</TableCell>
                <TableCell>{reservation.retrieveDate}</TableCell>
                <TableCell><Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Etat actuel
        </InputLabel>
        <NativeSelect
          defaultValue={reservation.reservationStateNameReservationState}
        >
          <option value={"En attente"} onClick={()=>setCurrentId(reservation.idReservation), ()=>handleAttente}>En attente</option>
          <option value={"Terminée"} onClick={()=>setCurrentId(reservation.idReservation), ()=>handleTerminee}>Terminée</option>
        </NativeSelect>
      </FormControl>
    </Box></TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>}
    </div>
  )
}

export default HandleReservations