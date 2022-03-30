import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () =>{
    const paperStyle={padding :20,height:'73vh',width:300, margin:"20 auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}

    let navigate = useNavigate();

    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();

    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        
        if (name === 'email'){
            setEmail(value)
        }

        if (name === 'password'){
            setPassword(value)
          }
      };

    

    function onSubmit(){
        axios({
            method: "POST",
            mode : 'cors',
            url: "http://localhost:8000/users/sign-in",
            data: {
              emailUser : email,
              passwordUser : password
            },
            withCredentials : true
          }).then(()=>{
            navigate("/accueil");
          })
    }
    



    return(
        <Grid align='center' justify='center'>
            <Paper  style={paperStyle}>
                <Grid align='center' justify='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Se connecter</h2>
                </Grid>
                <TextField id="email" name="email" label="Adresse Email" placeholder="Entre un email" onChange={handleChange} fullWidth required/>
                <TextField id="password" name="password" label='Mot de passe' placeholder='Entrer un mot de passe' onChange={handleChange} type='password' fullWidth required/>
                <Button type='submit' onClick={onSubmit} color='inherit' variant="contained" style={btnstyle} fullWidth>Se connecter</Button>
                <Typography >
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login