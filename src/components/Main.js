import React from 'react';
import Product from './Product';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import useStyles from './styles';

export default function Main({products, onAdd}) {
  //const { products, onAdd } = props;
 
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    axios.get(process.env.REACT_APP_Back_URL+'/users/current-user', { withCredentials: true })
    .then(response =>{
      setCurrentUser(response.data)
      console.log(response.data)
    }).catch((e) => console.log(e.request))

    console.log("Product : " + products)
  }, []);

  const classes = useStyles();

  
  return (

    <main className={classes.content}>
      <Grid container justify="center" xs={10} spacing={1}>
        {products !== undefined && products.map((product) => (
          <Grid key={product.idProduct} item xs={12} sm={6} md={4} lg={3}>
            <Product key={product.idProduct} product={product} onAdd={onAdd} />
          </Grid>
        ))}
      </Grid>
    </main>

  );
}
