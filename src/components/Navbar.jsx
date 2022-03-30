import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import useStyles from './styles';
import axios from 'axios';


const PrimarySearchAppBar = ({ totalItems , disconnect}) => {
  const classes = useStyles();
  

  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    axios.get('http://localhost:8000/users/current-user', { withCredentials: true })
    .then(response =>{
      setCurrentUser(response.data)
      console.log(response.data)
    }).catch((e) => console.log(e.request))
  }, []);

  

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
           <Typography  variant="h6" className={classes.title} color="inherit">
              ~ Bienvenue {currentUser && currentUser.nameUser} ~
          </Typography>
          
          <div className={classes.grow} />
          <Typography component={Link} to="/accueil" variant="h6" className={classes.title} color="inherit">
            <img src={logo} alt="commerce.js" height="75px" className={classes.image} />
          </Typography> 
            
        </Toolbar>

        <IconButton onClick={disconnect}>
          <LogoutIcon />
        </IconButton>
      </AppBar>
    </>
  );
};

export default PrimarySearchAppBar;
